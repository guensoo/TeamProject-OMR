import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

const ReviewComponent = ({ review, onPress }) => {
    const {
        reviewId,
        title,
        content,
        rating,
        createdAt,
        userData,
        selectMovie,
        liked,
        views,
        commentCount,
    } = review;

    // 대표 이미지 추출 (img src 파싱)
    let thumbnail = null;
    const imgMatch = content && content.match(/<img[^>]+src="([^">]+)"/);
    if (imgMatch && imgMatch[1]) thumbnail = imgMatch[1];

    return (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.85}
            onPress={onPress}
        >
            {thumbnail && <Image source={{ uri: thumbnail }} style={styles.thumbnail} />}
            
            {/* 🔥 제목 텍스트에 말줄임표 적용 */}
            <Text 
                style={styles.title}
                numberOfLines={1}
                ellipsizeMode="tail"
            >
                {title}
            </Text>
            
            {/* 🔥 영화 제목에도 말줄임표 적용 */}
            <Text 
                style={styles.movieTitle}
                numberOfLines={1}
                ellipsizeMode="tail"
            >
                {selectMovie?.title ? `[${selectMovie.title}]` : ""}
            </Text>
            
            <View style={styles.row}>
                <Text style={styles.author}>{userData?.nickname || "익명"}</Text>
                <Text style={styles.date}>{createdAt?.slice(0, 10)}</Text>
            </View>
            
            <Text style={styles.contentPreview} numberOfLines={2}>
                {content?.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ")}
            </Text>
            
            <View style={styles.row}>
                <Text style={styles.rating}>⭐ {rating}</Text>
                <Text style={styles.counts}>👍 {liked}</Text>
                <Text style={styles.counts}>💬 {commentCount}</Text>
                <Text style={styles.counts}>👁 {views}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 14,
        marginVertical: 8,
        padding: 18,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 4,
    },
    thumbnail: {
        width: '100%',
        height: 140,
        borderRadius: 10,
        marginBottom: 8,
        resizeMode: 'cover'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    movieTitle: {
        fontSize: 14,
        color: '#888',
        marginBottom: 4
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 2,
    },
    author: {
        fontSize: 13,
        color: '#4287f5',
    },
    date: {
        fontSize: 13,
        color: '#aaa',
    },
    contentPreview: {
        fontSize: 15,
        color: '#333',
        marginTop: 8,
        marginBottom: 4,
    },
    rating: {
        fontSize: 15,
        color: '#ffa500',
        marginRight: 8
    },
    counts: {
        fontSize: 13,
        color: '#888',
        marginRight: 10
    }
});

export default ReviewComponent;