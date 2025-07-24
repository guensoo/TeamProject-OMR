import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Image, TouchableOpacity } from "react-native";
import review_sample from '../assets/review_sample.jpg'

// 댓글 컴포넌트 분리
const Comment = ({ user, text, date, likes }) => (
    <View style={styles.commentBox}>
        <View style={styles.commentHeader}>
            <Text style={styles.commentUser}>{user}</Text>
            <Text style={styles.commentDate}>{date}</Text>
        </View>
        <Text style={styles.commentText}>{text}</Text>
        <View style={styles.commentFooter}>
            <TouchableOpacity>
                <Text style={styles.replyBtn}>답글</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.reportBtn}>신고</Text>
            </TouchableOpacity>
            <View style={styles.commentLike}>
                <Text style={styles.likeIcon}>♡</Text>
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
    };

    useEffect(() => {
        setTimeout(() => {
            setReview(sample);
            setLoading(false);
        }, 300);
    }, [reviewId]);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#555" />
            </View>
        );
    }

    if (!review) {
        return (
            <View style={styles.center}>
                <Text>리뷰를 찾을 수 없습니다.</Text>
            </View>
        );
    }

    const contentArray = Array.isArray(review.content) ? review.content : [review.content || ""];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* 상단: 제목/작성자/평점 */}
            <View style={styles.headerRow}>
                <Text style={styles.title}>{review.title}</Text>
                <View style={styles.infoBox}>
                    <Text style={styles.author}>{review.author}</Text>
                    <View style={styles.ratingBox}>
                        <Text style={styles.ratingLabel}>별점</Text>
                        <Text style={styles.ratingStar}>★</Text>
                        <Text style={styles.ratingScore}> {review.rating.toFixed(2)}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.divider} />

            {/* 본문 */}
            <View style={styles.contentArea}>
                {contentArray.slice(0, 4).map((line, idx) => (
                    <Text key={idx} style={styles.contentText}>{line}</Text>
                ))}

                <Image
                    source={review.imageUrl}
                    style={styles.reviewImage}
                    resizeMode="contain"
                />

                {contentArray.slice(4).map((line, idx) => (
                    <Text key={idx + 10} style={styles.contentText}>{line}</Text>
                ))}
            </View>

            {/* 공감/댓글 버튼 & 영상안내 (밑줄 아래) */}
            <View style={styles.actionRowWrap}>
                <View style={styles.actionRow}>
                    <TouchableOpacity style={styles.actionBtn}>
                        <Text style={styles.actionIcon}>♡</Text>
                        <Text style={styles.actionText}>공감</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionBtn}>
                        <Text style={styles.actionIcon}>💬</Text>
                        <Text style={styles.actionText}>댓글 {sampleComments.length}</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.videoBannerTextSmall}>
                    이 영상이 궁금하다면? | <Text style={styles.underline}>상세보기</Text>
                </Text>
            </View>

            {/* 댓글 리스트 */}
            <View style={styles.commentSection}>
                {sampleComments.map(comment => (
                    <Comment key={comment.id} {...comment} />
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 32,
        backgroundColor: "#fff",
        alignItems: "center",
    },
    headerRow: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        letterSpacing: 2,
    },
    infoBox: {
        backgroundColor: "#F6F6F6",
        borderRadius: 10,
        paddingHorizontal: 18,
        paddingVertical: 10,
        alignItems: "center",
        flexDirection: "column",
        elevation: 1,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    author: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: "500",
    },
    ratingBox: {
        flexDirection: "row",
        alignItems: "center",
    },
    ratingLabel: {
        fontSize: 15,
        color: "#333",
        marginRight: 4,
    },
    ratingStar: {
        fontSize: 17,
        color: "#FF4848",
        fontWeight: "bold",
    },
    ratingScore: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    divider: {
        width: "100%",
        height: 2,
        backgroundColor: "#111",
        marginVertical: 18,
    },
    contentArea: {
        width: "100%",
        alignItems: "center",
    },
    contentText: {
        fontSize: 17,
        color: "#222",
        lineHeight: 27,
        marginVertical: 2,
        textAlign: "center",
    },
    reviewImage: {
        width: "90%",
        height: 180,
        marginVertical: 24,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#ddd",
        backgroundColor: "#f7f7f7",
    },
    actionRowWrap: {
        width: "100%",
        alignItems: "flex-start",
        marginBottom: 10,
    },
    actionRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 2,
    },
    actionBtn: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 14,
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 8,
        backgroundColor: "#f7f7f7",
    },
    actionIcon: {
        fontSize: 18,
        marginRight: 3,
        color: "#d33",
    },
    actionText: {
        fontSize: 15,
        fontWeight: "500",
        color: "#333",
    },
    videoBannerTextSmall: {
        fontSize: 13,
        color: "#888",
        marginLeft: 4,
        marginTop: 1,
    },
    underline: {
        textDecorationLine: "underline",
        color: "#345",
    },
    commentSection: {
        width: "100%",
        marginTop: 6,
    },
    commentBox: {
        borderTopWidth: 1,
        borderTopColor: "#eee",
        paddingVertical: 12,
        paddingHorizontal: 8,
    },
    commentHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 3,
    },
    commentUser: {
        fontWeight: "bold",
        fontSize: 16,
        marginRight: 8,
    },
    commentDate: {
        color: "#888",
        fontSize: 13,
    },
    commentText: {
        fontSize: 15,
        marginBottom: 7,
    },
    commentFooter: {
        flexDirection: "row",
        alignItems: "center",
    },
    replyBtn: {
        fontSize: 13,
        color: "#555",
        marginRight: 10,
    },
    reportBtn: {
        fontSize: 13,
        color: "#999",
        marginRight: 12,
    },
    commentLike: {
        flexDirection: "row",
        alignItems: "center",
    },
    likeIcon: {
        color: "#d33",
        fontSize: 16,
        marginRight: 3,
    },
    likeCount: {
        fontSize: 13,
        color: "#666",
    },
    center: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default ReviewDetail;
