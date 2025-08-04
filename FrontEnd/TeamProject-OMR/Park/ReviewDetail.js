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
import { updateReview, deleteReview, getComments, postComment } from '../All/api/ReviewApi';

const ReviewDetail = ({ route, navigation }) => {
    const { user } = useContext(UserContext);
    const [token, setToken] = useState(null);
    const review = route.params?.review;
    const currentUserId = user?.userId ?? null;
    const [liked, setLiked] = useState(false); // 공감(좋아요) 여부

    // 댓글 관련 state
    const [comments, setComments] = useState([]);
    const [loadingComments, setLoadingComments] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [submittingComment, setSubmittingComment] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    // 토큰 가져오기 (필요 없다면 제거 가능)
    useEffect(() => {
        const fetchToken = async () => {
            const savedToken = await AsyncStorage.getItem('authToken');
            setToken(savedToken);
        };
        fetchToken();
    }, []);

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

    // content 매핑 (html, string, array 등 커버)
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

    // 공감(좋아요) 버튼 (임시 토글만, 실제 서버 기능 붙일 때 확장)
    const handleLike = () => {
        setLiked(!liked);
    };

    // 예외 처리 (리뷰 없을 때)
    if (!review) {
        return (
            <SafeAreaView style={styles.errorContainer}>
                <Text style={styles.errorText}>리뷰를 찾을 수 없습니다.</Text>
            </SafeAreaView>
        );
    }

    console.log("comments:", comments);

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={styles.keyboardView}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                {/* 메뉴 백드롭 */}
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
                    {/* 헤더 */}
                    <View style={styles.headerContainer}>
                        <View style={styles.headerContent}>
                            <ReviewHeader
                                title={review.title}
                                author={review.userData?.nickname || review.author || "익명"}
                                rating={review.rating}
                                viewCount={review.views || review.viewCount || 0}
                                likeCount={0}   // 좋아요 필드 없는 경우 0으로 고정
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

                    {/* 본문 */}
                    <View style={styles.contentSection}>
                        {contentArray.map((line, idx) => (
                            !!line && <Text key={idx} style={styles.contentText}>
                                {/* HTML 태그 제거 */}
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

                    {/* 액션 버튼 */}
                    <View style={styles.actionSection}>
                        <TouchableOpacity
                            style={[styles.actionButton, liked && styles.actionButtonLiked]}
                            onPress={handleLike}
                        >
                            <Text style={[styles.actionIcon, liked && styles.actionIconLiked]}>
                                {liked ? '❤️' : '🤍'}
                            </Text>
                            <Text style={[styles.actionText, liked && styles.actionTextLiked]}>
                                공감 {liked ? 1 : 0}
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

                    {/* 관련 영상 배너 */}
                    <View style={styles.videoBanner}>
                        <Text style={styles.videoBannerText}>
                            🎬 이 영화가 궁금하다면?
                            <TouchableOpacity onPress={() => navigation.navigate('InfoDetail', { review })}>
                                <Text style={styles.videoBannerLink}> 상세보기</Text>
                            </TouchableOpacity>
                        </Text>
                    </View>

                    {/* 댓글 섹션 */}
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

                {/* 댓글 입력 인풋 */}
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
