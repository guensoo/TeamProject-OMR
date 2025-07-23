import { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function MovieCard({ rank, image, title, onReviewPress, onDetailPress, isActive, onToggle }) {
    return (
        <TouchableOpacity
            style={styles.card}
            onPress={onToggle}
            activeOpacity={0.9}
        >
            {/* ✅ 이미지 URL 보정: http가 없으면 TMDB 기본 URL 붙이기 */}
            <Image
                source={{
                    uri: image?.startsWith('http')
                        ? image
                        : `https://image.tmdb.org/t/p/w500${image}`
                }}
                style={styles.image}
            />

            {/* ✅ 클릭 시 어두운 오버레이 */}
            {isActive && <View style={styles.overlay} />}

            {/* ✅ 제목 (줄바꿈 방지) */}
            <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                {title}
            </Text>

            {/* ✅ 버튼 */}
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

const styles = StyleSheet.create({
    card: {
        width: 120,
        marginRight: 10,
        position: 'relative',
        borderRadius: 8,
        overflow: 'hidden', // ✅ 오버레이와 버튼이 카드 경계 안에만 보이도록
    },
    image: {
        width: 120,
        height: 180,
        borderRadius: 8,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        zIndex: 1, // ✅ 버튼보다 낮게
    },
    rank: {
        position: 'absolute',
        top: 5,
        left: 5,
        color: '#fff',
        fontWeight: 'bold',
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 5,
        borderRadius: 3,
        zIndex: 2,
    },
    title: {
        marginTop: 5,
        textAlign: 'center',
        fontSize: 12,
        color: '#fff',
    },
    buttonContainer: {
        position: 'absolute',
        top: '35%',
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 2, // ✅ 오버레이 위에 표시
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
