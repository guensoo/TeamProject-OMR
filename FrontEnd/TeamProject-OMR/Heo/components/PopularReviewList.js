import { useState, useCallback } from "react";
import { View, Text, Image, TouchableOpacity, ActivityIndicator, StyleSheet, Dimensions, FlatList } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getMovieDetail, getTVDetail } from "../../All/api/tmdb";
import { fetchReviews } from "../../All/api/ReviewApi";

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

const PosterCard = ({ image, title, isActive, onToggle, onReviewPress, onDetailPress }) => (
    <TouchableOpacity style={styles.card} onPress={onToggle} activeOpacity={0.9}>
        {image ? (
            <Image source={{ uri: image }} style={styles.image} />
        ) : (
            <View style={styles.noImage}><Text>이미지 없음</Text></View>
        )}

        {isActive && <View style={styles.overlay} />}

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
        <Text
            style={styles.title}
            numberOfLines={1}
            ellipsizeMode="tail"
        >
            {title}
        </Text>
    </TouchableOpacity>
);

const PopularReviewList = ({ activeCard, onToggleCard }) => {
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            setLoading(true);
            (async () => {
                try {
                    const data = await fetchReviews();

                    const countMap = new Map();

                    // 먼저 title별로 개수 세기
                    for (const review of data) {
                        // console.log("review:", review)
                        const title = review.selectMovie.title;
                        // console.log("title:", title)
                        const count = countMap.get(title) || { count: 0, review };
                        countMap.set(title, { count: count.count + 1, review }); // review는 마지막 걸 대표로 씀
                    }

                    // Map → 배열로 변환
                    const countedList = Array.from(countMap.entries())
                        .map(([title, { count, review }]) => ({
                            id: review.selectMovie.id,
                            title,
                            media_type: review.selectMovie.media_type,
                            poster_path: review.selectMovie.poster_path,
                            count
                        }))
                        .sort((a, b) => b.count - a.count); // 많이 나온 순 정렬

                    setData(countedList.slice(0, 10));
                } catch (error) {
                    console.log('리뷰 불러오기 실패:', error);
                } finally {
                    setLoading(false);
                }
            })();
        }, [])
    );

    if (loading) return <LoadingView />;
    if (data.length === 0) return <EmptyView />;

    // 상세 fetch → navigation
    const handleDetailPress = async (item) => {
        try {
            let detail = null;
            if (item.title) {
                if (item.type === 'movie') {
                    detail = await getMovieDetail(item.tmdbId || item.id);
                    navigation.navigate("InfoDetail", { movie: detail });
                } else {
                    if (item.media_type === 'tv') {
                        detail = await getTVDetail(item.id);
                        navigation.navigate("InfoDetail", { ott: detail });
                    } else {
                        detail = await getMovieDetail(item.id);
                        navigation.navigate("InfoDetail", { movie: detail });
                    }
                }
            } else {
                alert('상세 정보를 불러올 수 없습니다.');
            }
        } catch (e) {
            alert('상세 정보를 불러오는 중 오류가 발생했습니다.');
        }
    };

    const onToggle = (id) => {
        onToggleCard(id);
    };

    return (
        <FlatList
            horizontal
            data={data}
            // keyExtractor={(item) => item.id.toString()}
            keyExtractor={(item, index) =>
                `${item.type}_${item.provider || 'unknown'}_${item.id}_${index}`
            }
            contentContainerStyle={{ paddingHorizontal: 12 }}
            showsHorizontalScrollIndicator={false}
            extraData={activeCard}
            renderItem={({ item }) => (
                <PosterCard
                    image={
                        item.poster_path
                            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                            : null
                    }
                    title={item.title}
                    isActive={activeCard === item.id}
                    onToggle={() => onToggle(item.id)}
                    onReviewPress={() => {
                        navigation.navigate("ReviewList", {
                            initialKeyword: item.title || item.name
                        });
                    }}
                    onDetailPress={() => handleDetailPress(item)}
                />
            )}
        />
    );
};

const styles = StyleSheet.create({
    centeredContainer: {
        marginLeft: 18,
        marginTop: 10,
    },
    card: {
        alignItems: 'center',
        marginRight: 12,
        width: SCREEN_WIDTH * 0.33,
    },
    image: {
        width: SCREEN_WIDTH * 0.33,
        height: SCREEN_WIDTH * 0.33 * 1.5,
        borderRadius: 8,
    },
    noImage: {
        width: SCREEN_WIDTH * 0.33,
        height: SCREEN_WIDTH * 0.33 * 1.5,
        borderRadius: 8,
        backgroundColor: "#ccc",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonContainer: {
        position: 'absolute',
        top: '35%',
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        height: '90%',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        borderRadius: 8,
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
    reviewText: {
        color: '#000',
        fontSize: 12,
        fontWeight: 'bold'
    },
    detailButton: {
        backgroundColor: '#e50914',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        width: 80,
        alignItems: 'center',
    },
    detailText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold'
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default PopularReviewList;
