import { useState, useEffect, useContext } from "react";
import {
    View, Text, ScrollView, ActivityIndicator, Image,
    TouchableOpacity, SafeAreaView, TextInput,
    KeyboardAvoidingView, Platform, Alert
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './ReviewDetailStyle';
import ReviewHeader from './ReviewHeader';
import ReviewDetailComment from "./ReviewDetailComment";
import { UserContext } from '../All/context/UserContext';
import {
    updateReview,
    deleteReview,
    getComments,
    postComment,
    postReviewLike,
    deleteReviewLike,
    getReviewLikeStatus
} from '../All/api/ReviewApi';
import { getMovieDetail, getTVDetail } from "../All/api/tmdb";

const ReviewDetail = ({ route, navigation }) => {
    const { user } = useContext(UserContext);
    const [token, setToken] = useState(null);
    const review = route.params?.review;
    const currentUserId = user?.userId ?? null;

    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(review.liked || 0);

    // 댓글 관련 state
    const [comments, setComments] = useState([]);
    const [loadingComments, setLoadingComments] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [submittingComment, setSubmittingComment] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    // 컴포넌트가 마운트될 때 좋아요 상태 조회
    useEffect(() => {
        if (user && review?.reviewId) {
            getReviewLikeStatus(review.reviewId, user.userId)
                .then(setLiked)
                .catch(e => {
                    console.error('좋아요 상태 조회 중 에러:', e);
                    setLiked(false);
                });
        }
    }, [user, review?.reviewId]);

    // 댓글 목록 불러오기
    const fetchComments = async () => {
        if (!review?.reviewId) return;
        setLoadingComments(true);
        try {
            const data = await getComments(review.reviewId);
            setComments(data); // 서버 반환 구조에 따라 조정
        } catch (error) {
            Alert.alert("오류", "댓글을 불러오지 못했습니다.");
        } finally {
            setLoadingComments(false);
        }
    };

    // 리뷰 id 변경시 댓글 새로고침
    useEffect(() => {
        fetchComments();
    }, [review?.reviewId]);

    // 내가 쓴 글인지 판별
    const reviewUserId = review.userId ?? review.userData?.userId ?? review.user?.userId ?? null;
    const isMine = currentUserId && reviewUserId && currentUserId === reviewUserId;

    // content 매핑
    const contentArray = Array.isArray(review.content) ? review.content : [review.content || ""];

    // 썸네일 이미지 추출
    let imageUrl = review.imageUrl;
    if (!imageUrl && review.content) {
        const imgMatch = review.content.match(/<img[^>]+src="([^">]+)"/);
        if (imgMatch && imgMatch[1]) imageUrl = imgMatch[1];
    }

    // 댓글 등록 함수 (POST)
    const handleSubmitComment = async () => {
        if (!user?.userId) {
            Alert.alert("로그인 필요", "로그인한 사용자만 댓글 작성이 가능합니다.");
            return;
        }
        if (!commentText.trim() || !review?.reviewId) return;
        setSubmittingComment(true);
        try {
            await postComment(review.reviewId, commentText.trim(), user.nickname);
            setCommentText('');
            fetchComments();
        } catch (error) {
            Alert.alert("댓글 등록 실패", "다시 시도해주세요.");
        } finally {
            setSubmittingComment(false);
        }
    };

    // 리뷰 수정 함수
    const handleEditReview = () => {
        setShowMenu(false);
        navigation.navigate('ReviewEdit', {
            review: review,
            mode: 'edit'
        });
    };

    // 리뷰 삭제 함수
    const handleDeleteReview = () => {
        setShowMenu(false);
        Alert.alert(
            "리뷰 삭제",
            "정말로 이 리뷰를 삭제하시겠습니까?\n삭제된 리뷰는 복구할 수 없습니다.",
            [
                { text: "취소", style: "cancel" },
                {
                    text: "삭제",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await deleteReview(review.reviewId);
                            navigation.goBack();
                            Alert.alert("삭제 완료", "리뷰가 삭제되었습니다.");
                        } catch (error) {
                            Alert.alert("삭제 실패", "리뷰 삭제 중 오류가 발생했습니다. 다시 시도해주세요.");
                        }
                    }
                }
            ]
        );
    };

    // 좋아요 토글 함수
    const handleLike = async () => {
        if (!user) {
            Alert.alert('로그인 필요', '좋아요는 로그인 후에 가능합니다.');
            return;
        }

        try {
            if (liked) {
                await deleteReviewLike(review.reviewId, user.userId);
                setLiked(false);
                setLikeCount((count) => Math.max(count - 1, 0));
            } else {
                await postReviewLike(review.reviewId, user.userId);
                setLiked(true);
                setLikeCount((count) => count + 1);
            }
        } catch (error) {
            Alert.alert('오류', '좋아요 처리 중 오류가 발생했습니다.');
            console.error(error);
        }
    };

    // **여기가 핵심! robust하게 type/tmdbId 판별**
    const getRobustOttInfo = () => {
        if (review.selectMovie && review.selectMovie.id) {
            const tmdbId = review.selectMovie.id;
            let type = review.selectMovie.media_type || review.media_type;
            if (!type) {
                if (typeof review.selectMovie.first_air_date === 'string' || review.selectMovie.original_name) {
                    type = 'tv';
                } else {
                    type = 'movie';
                }
            }
            return { tmdbId, type, selectMovie: review.selectMovie };
        }
        if (review.movieId) return { tmdbId: review.movieId, type: 'movie' };
        if (review.tvId) return { tmdbId: review.tvId, type: 'tv' };
        if (review.id && review.media_type) return { tmdbId: review.id, type: review.media_type };
        return { tmdbId: null, type: null };
    };

    const getPosterUrl = () => {
        let posterPath = null;
        if (review.selectMovie?.poster_path) posterPath = review.selectMovie.poster_path;
        else if (review.poster_path) posterPath = review.poster_path;
        else if (review.movieData?.poster_path) posterPath = review.movieData.poster_path;
        else if (review.tvData?.poster_path) posterPath = review.tvData.poster_path;
        if (!posterPath) return null;
        if (posterPath.startsWith('http')) return posterPath;
        return `https://image.tmdb.org/t/p/w500${posterPath}`;
    };

    if (!review) {
        return (
            <SafeAreaView style={styles.errorContainer}>
                <Text style={styles.errorText}>리뷰를 찾을 수 없습니다.</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={styles.keyboardView}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                {showMenu && (
                    <TouchableOpacity
                        style={styles.menuBackdrop}
                        activeOpacity={1}
                        onPress={() => setShowMenu(false)}
                    />
                )}

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.container}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.headerContainer}>
                        <View style={styles.headerContent}>
                            <ReviewHeader
                                title={review.title}
                                author={review.userData?.nickname || review.author || "익명"}
                                rating={review.rating}
                                viewCount={review.views || review.viewCount || 0}
                                likeCount={likeCount}
                                commentCount={review.commentCount || comments.length || 0}
                            />
                        </View>
                        {isMine && (
                            <TouchableOpacity
                                style={styles.moreButton}
                                onPress={() => setShowMenu(!showMenu)}
                            >
                                <Text style={styles.moreIcon}>⋮</Text>
                            </TouchableOpacity>
                        )}
                        {showMenu && (
                            <View style={styles.dropdownMenu}>
                                <TouchableOpacity style={styles.menuItem} onPress={handleEditReview}>
                                    <Text style={styles.menuIcon}>✏️</Text>
                                    <Text style={styles.menuItemText}>수정</Text>
                                </TouchableOpacity>
                                <View style={styles.menuDivider} />
                                <TouchableOpacity style={styles.menuItem} onPress={handleDeleteReview}>
                                    <Text style={styles.menuIcon}>🗑️</Text>
                                    <Text style={[styles.menuItemText, styles.deleteMenuText]}>삭제</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>

                    <View style={styles.contentSection}>
                        {contentArray.map((line, idx) => (
                            !!line && <Text key={idx} style={styles.contentText}>
                                {typeof line === "string"
                                    ? line.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ')
                                    : ""}
                            </Text>
                        ))}
                        {imageUrl && (
                            <View style={styles.imageContainer}>
                                <Image
                                    source={typeof imageUrl === "string" ? { uri: imageUrl } : imageUrl}
                                    style={styles.reviewImage}
                                    resizeMode="cover"
                                />
                            </View>
                        )}
                    </View>

                    <View style={styles.actionSection}>
                        <TouchableOpacity
                            style={[styles.actionButton, liked && styles.actionButtonLiked]}
                            onPress={handleLike}
                        >
                            <Text style={[styles.actionIcon, liked && styles.actionIconLiked]}>
                                {liked ? '❤️' : '🤍'}
                            </Text>
                            <Text style={[styles.actionText, liked && styles.actionTextLiked]}>
                                공감 {likeCount}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton}>
                            <Text style={styles.actionIcon}>💬</Text>
                            <Text style={styles.actionText}>댓글 {comments.length}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton}>
                            <Text style={styles.actionIcon}>📤</Text>
                            <Text style={styles.actionText}>공유</Text>
                        </TouchableOpacity>
                    </View>

                    {getPosterUrl() && (
                        <View style={styles.posterSection}>
                            <Image
                                source={{ uri: getPosterUrl() }}
                                style={styles.posterImage}
                                resizeMode="cover"
                            />
                        </View>
                    )}

                    <View style={styles.videoBanner}>
                        <Text style={styles.videoBannerText}>
                            🎬 이 영화가 궁금하다면?
                            <TouchableOpacity
                                onPress={async () => {
                                    try {
                                        const { tmdbId, type, selectMovie } = getRobustOttInfo();
                                        if (!tmdbId) {
                                            Alert.alert('작품 정보 없음', '이 리뷰에 연결된 작품을 찾을 수 없습니다.');
                                            return;
                                        }
                                        let detail = null;
                                        if (type === "movie") {
                                            detail = await getMovieDetail(tmdbId);
                                        } else if (type === "tv") {
                                            detail = await getTVDetail(tmdbId);
                                        } else {
                                            detail = await getMovieDetail(tmdbId);
                                        }
                                        if (detail) {
                                            navigation.navigate('InfoDetail', { ott: detail });
                                        } else {
                                            Alert.alert('상세 정보를 불러올 수 없습니다.');
                                        }
                                    } catch (e) {
                                        Alert.alert('상세 정보를 불러오는 중 오류가 발생했습니다.');
                                    }
                                }}
                            >
                                <Text style={styles.videoBannerLink}> 상세보기</Text>
                            </TouchableOpacity>
                        </Text>
                    </View>

                    <View style={styles.commentSection}>
                        <Text style={styles.commentSectionTitle}>
                            댓글 {comments.length}개
                        </Text>
                        {loadingComments ? (
                            <ActivityIndicator />
                        ) : (
                            comments.length === 0 ? (
                                <Text style={styles.emptyCommentText}>아직 댓글이 없습니다.</Text>
                            ) : (
                                comments.map(comment => (
                                    <ReviewDetailComment key={comment.id} {...comment} />
                                ))
                            )
                        )}
                    </View>
                </ScrollView>

                {user?.userId ? (
                    <View style={styles.commentInputSection}>
                        <View style={styles.commentInputContainer}>
                            <View style={styles.currentUserAvatar}>
                                <Text style={styles.currentUserAvatarText}>나</Text>
                            </View>
                            <TextInput
                                style={styles.commentInput}
                                placeholder="댓글을 입력하세요..."
                                placeholderTextColor="#999"
                                value={commentText}
                                onChangeText={setCommentText}
                                multiline
                                maxLength={500}
                            />
                            <TouchableOpacity
                                style={[
                                    styles.sendButton,
                                    commentText.trim() && !submittingComment ? styles.sendButtonActive : styles.sendButtonInactive
                                ]}
                                onPress={handleSubmitComment}
                                disabled={!commentText.trim() || submittingComment}
                            >
                                <Text style={[
                                    styles.sendButtonText,
                                    commentText.trim() && !submittingComment ? styles.sendButtonTextActive : styles.sendButtonTextInactive
                                ]}>
                                    {submittingComment ? '등록 중...' : '전송'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <View style={styles.commentInputSection}>
                        <Text style={{ color: '#888', textAlign: 'center', padding: 18, fontSize: 16 }}>
                            댓글 작성은 로그인 후 이용할 수 있습니다.
                        </Text>
                    </View>
                )}
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default ReviewDetail;
