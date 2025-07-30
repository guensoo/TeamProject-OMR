import { View, Text } from "react-native";
import styles from './ReviewDetailStyle';

const ReviewHeader = ({ title, author, rating, viewCount, likeCount, commentCount }) => (
    <View style={styles.headerSection}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.authorSection}>
            <View style={styles.authorAvatar}>
                <Text style={styles.authorAvatarText}>{author.charAt(0)}</Text>
            </View>
            <View style={styles.authorInfo}>
                <Text style={styles.author}>{author}</Text>
                <View style={styles.ratingContainer}>
                    <View style={styles.stars}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Text
                                key={star}
                                style={[
                                    styles.star,
                                    star <= Math.floor(rating / 2) ? styles.starFilled : styles.starEmpty
                                ]}
                            >
                                ★
                            </Text>
                        ))}
                    </View>
                    <Text style={styles.ratingScore}>{rating.toFixed(1)}</Text>
                </View>
            </View>
        </View>
        <View style={styles.statsRow}>
            <Text style={styles.statText}>조회 {viewCount.toLocaleString()}</Text>
            <Text style={styles.statDot}>•</Text>
            <Text style={styles.statText}>좋아요 {likeCount}</Text>
            <Text style={styles.statDot}>•</Text>
            <Text style={styles.statText}>댓글 {commentCount}</Text>
        </View>
    </View>
);

export default ReviewHeader;
