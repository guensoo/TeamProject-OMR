import { useState } from "react";
import {
    View, Text, ScrollView, ActivityIndicator, Image,
    TouchableOpacity, SafeAreaView, TextInput,
    KeyboardAvoidingView, Platform
} from "react-native";
import styles from './ReviewDetailStyle';
import ReviewHeader from './ReviewHeader';
import Comment from "./ReviewDetailComment";

// 샘플 댓글 (이 부분은 남겨도 OK)
const sampleComments = [
    {
        id: 1,
        user: "Indominus Rex",
        text: "12세 관람가 ㅋㅋㅋ",
        date: "2015.6.16. 11:43",
        likes: 0,
    },
];

const ReviewDetail = ({ route, navigation }) => {
    // 리뷰 전체 객체를 route로 받음
    const review = route.params?.review;

    // 별도 API 호출 없으므로 loading state 필요 X
    const [liked, setLiked] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState(sampleComments);

    if (!review) {
        return (
            <SafeAreaView style={styles.errorContainer}>
                <Text style={styles.errorText}>리뷰를 찾을 수 없습니다.</Text>
            </SafeAreaView>
        );
    }

    // content 매핑 (html, string, array 등 커버)
    const contentArray = Array.isArray(review.content) ? review.content : [review.content || ""];

    // 썸네일 이미지 추출 (content에 <img ... src=...> 태그가 있으면 뽑기)
    let imageUrl = review.imageUrl;
    if (!imageUrl && review.content) {
        const imgMatch = review.content.match(/<img[^>]+src="([^">]+)"/);
        if (imgMatch && imgMatch[1]) imageUrl = imgMatch[1];
    }

    const handleLike = () => setLiked(!liked);

    const handleSubmitComment = () => {
        if (commentText.trim()) {
            const newComment = {
                id: comments.length + 1,
                user: "현재 사용자",
                text: commentText.trim(),
                date: new Date().toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                }).replace(/\./g, '.').replace(/\s/, '. '),
                likes: 0,
            };
            setComments([newComment, ...comments]);
            setCommentText('');
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={styles.keyboardView}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.container}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* 헤더 */}
                    <ReviewHeader
                        title={review.title}
                        author={review.userData?.nickname || review.author || "익명"}
                        rating={review.rating}
                        viewCount={review.views || review.viewCount || 0}
                        likeCount={review.liked || review.likeCount || 0}
                        commentCount={review.commentCount || comments.length || 0}
                    />

                    {/* 본문 */}
                    <View style={styles.contentSection}>
                        {contentArray.slice(0, 4).map((line, idx) => (
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
                        {contentArray.slice(4).map((line, idx) => (
                            !!line && <Text key={idx + 10} style={styles.contentText}>
                                {typeof line === "string"
                                    ? line.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ')
                                    : ""}
                            </Text>
                        ))}
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
                                공감 {liked ? (review.liked || review.likeCount || 0) + 1 : (review.liked || review.likeCount || 0)}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton}>
                            <Text style={styles.actionIcon}>💬</Text>
                            <Text style={styles.actionText}>댓글 {review.commentCount || comments.length || 0}</Text>
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
                            <TouchableOpacity
                                onPress={() => navigation.navigate('InfoDetail', { review })}
                            >
                                <Text style={styles.videoBannerLink}> 상세보기</Text>
                            </TouchableOpacity>
                        </Text>
                    </View>

                    {/* 댓글 섹션 */}
                    <View style={styles.commentSection}>
                        <Text style={styles.commentSectionTitle}>
                            댓글 {comments.length}개
                        </Text>
                        {comments.map(comment => (
                            <Comment key={comment.id} {...comment} />
                        ))}
                    </View>
                </ScrollView>

                {/* 댓글 입력 인풋 */}
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
                                commentText.trim() ? styles.sendButtonActive : styles.sendButtonInactive
                            ]}
                            onPress={handleSubmitComment}
                            disabled={!commentText.trim()}
                        >
                            <Text style={[
                                styles.sendButtonText,
                                commentText.trim() ? styles.sendButtonTextActive : styles.sendButtonTextInactive
                            ]}>
                                전송
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default ReviewDetail;
