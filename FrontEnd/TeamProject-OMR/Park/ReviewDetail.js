import { useEffect, useState } from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
    ScrollView, 
    ActivityIndicator, 
    Image, 
    TouchableOpacity,
    SafeAreaView,
    Dimensions,
    TextInput,
    KeyboardAvoidingView,
    Platform
} from "react-native";
import review_sample from '../assets/review_sample.jpg';

const { width } = Dimensions.get('window');

// 댓글 컴포넌트 - 개선된 디자인
const Comment = ({ user, text, date, likes }) => (
    <View style={styles.commentBox}>
        <View style={styles.commentHeader}>
            <View style={styles.userAvatar}>
                <Text style={styles.avatarText}>{user.charAt(0)}</Text>
            </View>
            <View style={styles.commentInfo}>
                <Text style={styles.commentUser}>{user}</Text>
                <Text style={styles.commentDate}>{date}</Text>
            </View>
        </View>
        <Text style={styles.commentText}>{text}</Text>
        <View style={styles.commentFooter}>
            <TouchableOpacity style={styles.commentActionBtn}>
                <Text style={styles.replyBtn}>답글</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.commentActionBtn}>
                <Text style={styles.reportBtn}>신고</Text>
            </TouchableOpacity>
            <View style={styles.commentLike}>
                <TouchableOpacity>
                    <Text style={styles.likeIcon}>♡</Text>
                </TouchableOpacity>
                <Text style={styles.likeCount}>{likes}</Text>
            </View>
        </View>
    </View>
);

// 샘플 댓글
const sampleComments = [
    {
        id: 1,
        user: "Indominus Rex",
        text: "12세 관람가 ㅋㅋㅋ",
        date: "2015.6.16. 11:43",
        likes: 0,
    },
    {
        id: 2,
        user: "필사이닝",
        text: "아이들이랑 같이 보러가면 딱 좋을만한 영화군요. ㅎㅎ",
        date: "2015.6.16. 16:03",
        likes: 0,
    },
];

const ReviewDetail = ({ route }) => {
    const { reviewId } = route.params;
    const [review, setReview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [liked, setLiked] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState(sampleComments);

    const sample = {
        id: reviewId,
        title: "케이팝 데몬 헌터스",
        author: "작성자",
        rating: 6.4,
        content: [
            "음...일단 요즘 상영하는 영화중에 볼만한게 '쥬라기월드' 같아서 저녁에 보러 갔습니다.",
            "전에 선물받은 왕십리 CGV 골드클라스 표가 있어서 보러갔죠 ㅎㅎ",
            "다리 받침대도 있고 폭신한 쇼파라서 편하긴 합니다. 음료수도 주고 ㅋㅋ",
            "근데 제 돈주고 골드클라스 이용하지는 않을 듯 합니다.",
            "",
            "어쨌든 쥬라기월드 영화 감상평을 써볼게요.",
            "일단 저는 30대 후반으로써 조금 유지하게 봤습니다. ㅠ.ㅠ",
            "물론 공룡 보는 재미는 분명 있습니다.",
            "다만, 오락영화라는 것은 알지만 긴박한 순간에 좀 황당한 시츄에이션을 볼때마다..."
        ],
        imageUrl: review_sample,
        viewCount: 1245,
        likeCount: 32,
        commentCount: comments.length,
    };

    useEffect(() => {
        setTimeout(() => {
            setReview(sample);
            setLoading(false);
        }, 300);
    }, [reviewId]);

    const handleLike = () => {
        setLiked(!liked);
    };

    const handleSubmitComment = () => {
        if (commentText.trim()) {
            const newComment = {
                id: comments.length + 1,
                user: "현재 사용자", // 실제로는 로그인된 사용자 정보를 사용
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

    if (loading) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#FF6B6B" />
                <Text style={styles.loadingText}>리뷰를 불러오는 중...</Text>
            </SafeAreaView>
        );
    }

    if (!review) {
        return (
            <SafeAreaView style={styles.errorContainer}>
                <Text style={styles.errorText}>리뷰를 찾을 수 없습니다.</Text>
            </SafeAreaView>
        );
    }

    const contentArray = Array.isArray(review.content) ? review.content : [review.content || ""];

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
                {/* 헤더 섹션 */}
                <View style={styles.headerSection}>
                    <Text style={styles.title}>{review.title}</Text>
                    
                    <View style={styles.authorSection}>
                        <View style={styles.authorAvatar}>
                            <Text style={styles.authorAvatarText}>{review.author.charAt(0)}</Text>
                        </View>
                        <View style={styles.authorInfo}>
                            <Text style={styles.author}>{review.author}</Text>
                            <View style={styles.ratingContainer}>
                                <View style={styles.stars}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Text 
                                            key={star} 
                                            style={[
                                                styles.star, 
                                                star <= Math.floor(review.rating / 2) ? styles.starFilled : styles.starEmpty
                                            ]}
                                        >
                                            ★
                                        </Text>
                                    ))}
                                </View>
                                <Text style={styles.ratingScore}>{review.rating.toFixed(1)}</Text>
                            </View>
                        </View>
                    </View>
                    
                    <View style={styles.statsRow}>
                        <Text style={styles.statText}>조회 {review.viewCount.toLocaleString()}</Text>
                        <Text style={styles.statDot}>•</Text>
                        <Text style={styles.statText}>좋아요 {review.likeCount}</Text>
                        <Text style={styles.statDot}>•</Text>
                        <Text style={styles.statText}>댓글 {review.commentCount}</Text>
                    </View>
                </View>

                {/* 본문 섹션 */}
                <View style={styles.contentSection}>
                    {contentArray.slice(0, 4).map((line, idx) => (
                        line && <Text key={idx} style={styles.contentText}>{line}</Text>
                    ))}

                    <View style={styles.imageContainer}>
                        <Image
                            source={review.imageUrl}
                            style={styles.reviewImage}
                            resizeMode="cover"
                        />
                    </View>

                    {contentArray.slice(4).map((line, idx) => (
                        line && <Text key={idx + 10} style={styles.contentText}>{line}</Text>
                    ))}
                </View>

                {/* 액션 버튼 섹션 */}
                <View style={styles.actionSection}>
                    <TouchableOpacity 
                        style={[styles.actionButton, liked && styles.actionButtonLiked]} 
                        onPress={handleLike}
                    >
                        <Text style={[styles.actionIcon, liked && styles.actionIconLiked]}>
                            {liked ? '❤️' : '🤍'}
                        </Text>
                        <Text style={[styles.actionText, liked && styles.actionTextLiked]}>
                            공감 {liked ? review.likeCount + 1 : review.likeCount}
                        </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.actionButton}>
                        <Text style={styles.actionIcon}>💬</Text>
                        <Text style={styles.actionText}>댓글 {review.commentCount}</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.actionButton}>
                        <Text style={styles.actionIcon}>📤</Text>
                        <Text style={styles.actionText}>공유</Text>
                    </TouchableOpacity>
                </View>

                {/* 관련 영상 배너 */}
                <TouchableOpacity style={styles.videoBanner}>
                    <Text style={styles.videoBannerText}>
                        🎬 이 영화가 궁금하다면? 
                        <Text style={styles.videoBannerLink}> 상세보기</Text>
                    </Text>
                </TouchableOpacity>

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

                {/* 댓글 작성 인풋 - 하단 고정 */}
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

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    keyboardView: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    container: {
        paddingBottom: 100, // 댓글 입력창 공간 확보
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: "#666",
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
    },
    errorText: {
        fontSize: 18,
        color: "#666",
    },
    
    // 헤더 섹션
    headerSection: {
        padding: 20,
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 1,
        borderBottomColor: "#F0F0F0",
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        color: "#1A1A1A",
        marginBottom: 16,
        lineHeight: 32,
    },
    authorSection: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    authorAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#FF6B6B",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    authorAvatarText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "600",
    },
    authorInfo: {
        flex: 1,
    },
    author: {
        fontSize: 16,
        fontWeight: "600",
        color: "#1A1A1A",
        marginBottom: 4,
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    stars: {
        flexDirection: "row",
        marginRight: 8,
    },
    star: {
        fontSize: 16,
        marginRight: 2,
    },
    starFilled: {
        color: "#FFD700",
    },
    starEmpty: {
        color: "#E0E0E0",
    },
    ratingScore: {
        fontSize: 16,
        fontWeight: "600",
        color: "#FF6B6B",
    },
    statsRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    statText: {
        fontSize: 14,
        color: "#666",
    },
    statDot: {
        fontSize: 14,
        color: "#CCC",
        marginHorizontal: 8,
    },

    // 본문 섹션
    contentSection: {
        padding: 20,
    },
    contentText: {
        fontSize: 16,
        lineHeight: 24,
        color: "#333",
        marginBottom: 12,
        textAlign: "left",
    },
    imageContainer: {
        marginVertical: 20,
        borderRadius: 12,
        overflow: "hidden",
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    reviewImage: {
        width: "100%",
        height: 200,
        backgroundColor: "#F5F5F5",
    },

    // 액션 버튼 섹션
    actionSection: {
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: "#FAFAFA",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#F0F0F0",
    },
    actionButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: "#FFFFFF",
        marginRight: 12,
        elevation: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    actionButtonLiked: {
        backgroundColor: "#FFE8E8",
    },
    actionIcon: {
        fontSize: 16,
        marginRight: 6,
    },
    actionIconLiked: {
        color: "#FF6B6B",
    },
    actionText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#333",
    },
    actionTextLiked: {
        color: "#FF6B6B",
    },

    // 영상 배너
    videoBanner: {
        margin: 20,
        padding: 16,
        backgroundColor: "#F8F9FA",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E9ECEF",
    },
    videoBannerText: {
        fontSize: 14,
        color: "#495057",
        textAlign: "center",
    },
    videoBannerLink: {
        color: "#007BFF",
        fontWeight: "600",
        textDecorationLine: "underline",
    },

    // 댓글 섹션
    commentSection: {
        paddingHorizontal: 20,
    },
    commentSectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#1A1A1A",
        marginBottom: 16,
    },
    commentBox: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#F0F0F0",
    },
    commentHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    userAvatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#4ECDC4",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    avatarText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "600",
    },
    commentInfo: {
        flex: 1,
    },
    commentUser: {
        fontSize: 14,
        fontWeight: "600",
        color: "#1A1A1A",
        marginBottom: 2,
    },
    commentDate: {
        fontSize: 12,
        color: "#999",
    },
    commentText: {
        fontSize: 14,
        lineHeight: 20,
        color: "#333",
        marginBottom: 12,
    },
    commentFooter: {
        flexDirection: "row",
        alignItems: "center",
    },
    commentActionBtn: {
        marginRight: 16,
    },
    replyBtn: {
        fontSize: 12,
        color: "#666",
        fontWeight: "500",
    },
    reportBtn: {
        fontSize: 12,
        color: "#999",
        fontWeight: "500",
    },
    commentLike: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: "auto",
    },
    likeIcon: {
        fontSize: 14,
        color: "#FF6B6B",
        marginRight: 4,
    },
    likeCount: {
        fontSize: 12,
        color: "#666",
    },

    // 댓글 작성 인풋 섹션
    commentInputSection: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#FFFFFF",
        borderTopWidth: 1,
        borderTopColor: "#E9ECEF",
        paddingHorizontal: 16,
        paddingVertical: 12,
        elevation: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    commentInputContainer: {
        flexDirection: "row",
        alignItems: "flex-end",
        backgroundColor: "#F8F9FA",
        borderRadius: 24,
        paddingHorizontal: 4,
        paddingVertical: 4,
        minHeight: 48,
    },
    currentUserAvatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#6C5CE7",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8,
        marginLeft: 4,
    },
    currentUserAvatarText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "600",
    },
    commentInput: {
        flex: 1,
        fontSize: 16,
        color: "#333",
        paddingVertical: 8,
        paddingHorizontal: 12,
        maxHeight: 100,
        textAlignVertical: "center",
    },
    sendButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginLeft: 8,
        marginRight: 4,
        justifyContent: "center",
        alignItems: "center",
        minWidth: 60,
    },
    sendButtonActive: {
        backgroundColor: "#FF6B6B",
    },
    sendButtonInactive: {
        backgroundColor: "#E9ECEF",
    },
    sendButtonText: {
        fontSize: 14,
        fontWeight: "600",
    },
    sendButtonTextActive: {
        color: "#FFFFFF",
    },
    sendButtonTextInactive: {
        color: "#ADB5BD",
    },
});

export default ReviewDetail;