import { View, Text, TouchableOpacity } from "react-native";
import styles from './ReviewDetailStyle';

const ReviewDetailComment = ({
    writer, text, date, likes, id, user, onDelete
}) => {
    const isMyComment = user?.nickname === writer;
    const isAdmin = user?.role?.toLowerCase() === 'admin';
    const canDelete = isMyComment || isAdmin;

    return (
        <View style={styles.commentBox}>
            <View style={styles.commentHeader}>
                <View style={styles.userAvatar}>
                    <Text style={styles.avatarText}>{writer?.charAt(0)}</Text>
                </View>
                <View style={styles.commentInfo}>
                    <Text style={styles.commentUser}>{writer}</Text>
                    <Text style={styles.commentDate}>{date}</Text>
                </View>
                {canDelete && (
                    <TouchableOpacity
                        style={styles.commentDeleteBtn}
                        onPress={() => onDelete(id, writer)}
                    >
                        <Text style={{ color: '#ff3333', fontWeight: 'bold' }}>삭제</Text>
                    </TouchableOpacity>
                )}
            </View>
            <Text style={styles.commentText}>{text}</Text>
        </View>
    );
};

export default ReviewDetailComment;
