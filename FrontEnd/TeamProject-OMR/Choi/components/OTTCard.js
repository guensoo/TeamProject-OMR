import { memo } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

function OTTCardComponent({ rank, image, title, isActive, onToggle, onReviewPress, onDetailPress }) {
    return (
        <TouchableOpacity style={styles.card} onPress={onToggle} activeOpacity={0.9}>
            <Image source={{ uri: image }} style={styles.image} />

            {isActive && <View style={styles.overlay} />}

            <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                {title}
            </Text>

            {isActive && (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.reviewButton} onPress={onReviewPress}>
                        <Text style={styles.reviewText}>리뷰보기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.detailButton} onPress={onDetailPress}>
                        <Text style={styles.detailText}>상세정보</Text>
                    </TouchableOpacity>
                </View>
            )}
        </TouchableOpacity>
    );
}

// ✅ isActive, title, image 등이 바뀔 때만 리렌더링
export default memo(OTTCardComponent);

const styles = StyleSheet.create({
    card: { width: 120, marginRight: 10, position: 'relative' },
    image: { width: 120, height: 180, borderRadius: 8 },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        borderRadius: 8,
    },
    title: { marginTop: 5, textAlign: 'center', fontSize: 12, color: '#fff' },
    buttonContainer: {
        position: 'absolute',
        top: '35%',
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    reviewButton: {
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        marginBottom: 5,
        width: 80,
        alignItems: 'center',
    },
    reviewText: { color: '#000', fontSize: 12, fontWeight: 'bold' },
    detailButton: {
        backgroundColor: '#e50914',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        width: 80,
        alignItems: 'center',
    },
    detailText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
});
