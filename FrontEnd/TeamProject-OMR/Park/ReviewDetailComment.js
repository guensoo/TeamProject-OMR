import { View, Text, TouchableOpacity } from "react-native";
import styles from './ReviewDetailStyle';

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

export default Comment;