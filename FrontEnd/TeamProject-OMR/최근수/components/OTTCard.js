import { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function OTTCard({ rank, image, title, onReviewPress, onDetailPress }) {
    const [showButtons, setShowButtons] = useState(false); // ✅ 클릭 시 토글 상태

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => setShowButtons(!showButtons)} // ✅ 카드 클릭 시 버튼 보이기/숨기기
            activeOpacity={0.9}
        >
            <Image source={{ uri: image }} style={styles.image} />
            <Text style={styles.rank}>{rank}</Text>
            <Text style={styles.title}>{title}</Text>

            {showButtons && (
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

const styles = StyleSheet.create({
    card: { width: 120, marginRight: 10, position: 'relative' },
    image: { width: 120, height: 180, borderRadius: 8 },
    rank: {
        position: 'absolute',
        top: 5,
        left: 5,
        color: '#fff',
        fontWeight: 'bold',
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 5,
        borderRadius: 3,
    },
    title: { marginTop: 5, textAlign: 'center', fontSize: 12, color: '#fff' },

    // ✅ 버튼 스타일
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
