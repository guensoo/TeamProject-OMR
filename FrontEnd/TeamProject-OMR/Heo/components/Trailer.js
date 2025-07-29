import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const SCREEN_RATIO = SCREEN_HEIGHT / SCREEN_WIDTH;

const Trailer = ({ data, onPlay }) => {
    if (!data || data.length === 0) return null;

    const getFullPosterUrl = (item) => {
        if (item.posterPath) {
            // 이미 전체 URL인 경우
            return item.posterPath;
        } else if (item.poster_path) {
            // TMDB 경로 조각일 경우
            return `https://image.tmdb.org/t/p/w500${item.poster_path}`;
        }
        return null; // 없으면 null 처리
    };

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity 
                style={styles.card} 
                onPress={() => onPlay(item.trailerKey) }
                activeOpacity={1}   // 터치 시 반짝임 제거
                >
                <Image source={{ uri: getFullPosterUrl(item) }} style={styles.poster} />
                <View style={styles.playIconContainer}>
                    <Text style={styles.playIcon}>▶</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View>
            {/* <Text style={styles.header}>🔥 지금 뜨는 예고편</Text> */}
            <FlatList
                data={data}
                keyExtractor={(item, index) => item.id?.toString() || index.toString()}
                renderItem={renderItem}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled                 // 스와이프할 때 1페이지씩
                decelerationRate="fast"      // 스와이프 감속 빠르게
            />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        fontSize: 22,
        fontWeight: "bold",
        marginLeft: 16,
        marginBottom: 10,
    },
    card: {
        width: SCREEN_WIDTH,
    },
    poster: {
        width: "100%",
        // height: SCREEN_WIDTH * 2.2,
        height: SCREEN_HEIGHT * 0.9,
    },
    infoContainer: {
        marginTop: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
    },
    playIconContainer: {
        position: "absolute",
        top: "45%",
        left: "45%",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    playIcon: {
        color: "#fff",
        fontSize: 28,
    },
});

export default Trailer;
