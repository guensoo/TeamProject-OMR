import React, { useState, useCallback } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, StyleSheet, Dimensions } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const LoadingView = () => (
    <View style={styles.centeredContainer}>
        <ActivityIndicator size="small" color="#666" />
    </View>
);

const EmptyView = () => (
    <View style={styles.centeredContainer}>
        <Text style={styles.emptyText}>리뷰가 없습니다.</Text>
    </View>
);

const PopularReviewList = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            setLoading(true);
            (async () => {
                try {
                    const response = await fetch('http://10.0.2.2:8888/api/review', {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                    });
                    if (!response.ok) throw new Error('네트워크 오류 또는 서버 오류');
                    const data = await response.json();

                    // 인기순 정렬 (popularity 필드 기준)
                    const sortedData = data.sort((a, b) => b.popularity - a.popularity);

                    setReviews(sortedData);
                } catch (error) {
                    console.log('리뷰 불러오기 실패:', error);
                } finally {
                    setLoading(false);
                }
            })();
        }, [navigation])
    );

    if (loading) return <LoadingView />;
    if (reviews.length === 0) return <EmptyView />;

    // console.log("reviews", reviews)
    

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
            {reviews.map((review) => {
                const posterPath = review?.selectMovie?.poster_path;
                const posterUrl = posterPath
                    ? `https://image.tmdb.org/t/p/w500${posterPath}`
                    : null;

                return (
                    <TouchableOpacity
                        key={review.reviewId}
                        style={styles.posterContainer}
                        onPress={() => navigation.navigate('ReviewDetail', { review })}
                    >
                        {posterUrl ? (
                            <Image source={{ uri: posterUrl }} style={styles.posterImage} />
                        ) : (
                            <View style={styles.noImage}>
                                <Text>이미지 없음</Text>
                            </View>
                        )}
                        <Text style={styles.title} numberOfLines={1}>{review.selectMovie.title}</Text>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        marginVertical: 10,
    },
    posterContainer: {
        marginLeft: 12,
        marginRight: 8,
        width: SCREEN_WIDTH * 0.33,
    },
    posterImage: {
        width: SCREEN_WIDTH * 0.33,
        height: SCREEN_WIDTH * 0.33 * 1.5,
        borderRadius: 8,
    },
    noImage: {
        width: 120,
        height: 180,
        borderRadius: 8,
        backgroundColor: "#ccc",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        marginTop: 6,
        fontSize: 14,
        fontWeight: "600",
    },
    centeredContainer: {
        height: 200,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyText: {
        fontSize: 16,
        color: "#999",
    },
});

export default PopularReviewList;
