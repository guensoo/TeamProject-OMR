import { View, Text, TouchableOpacity } from "react-native";
import styles from './ReviewDetailStyle';

const ReviewDetailComment = ({ writer, text, date, likes }) => {
    const safeUser = writer || '익명';
    return (
        <View style={styles.commentBox}>
            <View style={styles.commentHeader}>
                <View style={styles.userAvatar}>
                    <Text style={styles.avatarText}>
                        {typeof safeUser === 'string' && safeUser.length > 0
                            ? safeUser.charAt(0)
                            : '익'}
                    </Text>
                </View>
                <View style={styles.commentInfo}>
                    <Text style={styles.commentUser}>{safeUser}</Text>
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
                    <Text style={styles.likeCount}>{typeof likes === 'number' ? likes : 0}</Text>
                </View>
            </View>
        </View>
    );
};

export default ReviewDetailComment;
