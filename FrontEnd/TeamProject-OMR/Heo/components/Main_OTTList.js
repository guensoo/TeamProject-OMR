import { useNavigation } from "@react-navigation/native";
import { FlatList, View, Image, Text, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import { getMovieDetail, getTVDetail } from "../../All/api/tmdb";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const PosterCard = ({ image, title, isActive, onToggle, onReviewPress, onDetailPress, provider }) => (
    <TouchableOpacity style={styles.card} onPress={onToggle} activeOpacity={0.9}>
        {image ? (
            <Image
                source={{ uri: image }}
                style={styles.poster}
                resizeMode="cover"
            />
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
        <Text style={styles.providerText}>
            {provider}
        </Text>
    </TouchableOpacity>
);

const Main_OTTList = ({ data, activeCard, onToggleCard }) => {
    const uniqueData = data.filter((item, index, arr) =>
        arr.findIndex(i => i.id === item.id) === index
    );

    const navigation = useNavigation();

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
            data={uniqueData}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 12 }}
            keyExtractor={(item, index) =>
                `${item.type}_${item.provider || 'unknown'}_${item.id}_${index}`
            }
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
                    provider={item.provider}
                />
            )}
        />
    );
};

const styles = StyleSheet.create({
    card: {
        alignItems: 'center',
        marginRight: 12,
        width: SCREEN_WIDTH * 0.33,
    },
    poster: {
        width: SCREEN_WIDTH * 0.33,
        height: SCREEN_WIDTH * 0.33 * 1.5,
        borderRadius: 12,
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
        top: '28%',
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        height: '80%',
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
        fontWeight: 'bold',
        textAlign: 'center',
        width: SCREEN_WIDTH * 0.33,
    },
    providerText: {
        fontSize: 14,
        color: '#aaa',
        textTransform: 'capitalize',
    },
})

export default Main_OTTList;