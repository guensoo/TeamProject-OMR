import { FlatList, View, Image, Text, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import ProviderInfo from "../utils/ProviderInfo";
import { Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const Trailer = ({ data, onPlay }) => {
    return (
        <FlatList
            data={data}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            keyExtractor={(item) => `${item.provider}_${item.id}`}
            renderItem={({ item }) => {
                const providerData = ProviderInfo[item.provider];
                return (
                    <View style={styles.itemContainer}>
                        <Image
                            source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                            style={styles.poster}
                            resizeMode="cover"
                        />
                        <TouchableOpacity
                            style={styles.playButton}
                            onPress={() => onPlay(item.trailerKey)}
                        >
                            <Ionicons name="play-circle" size={64} color="white" />
                        </TouchableOpacity>
                        <Text style={[styles.providerText, { color: providerData?.color || '#aaa' }]}>
                            {item.provider}
                        </Text>
                    </View>
                );
            }}
        />
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        marginVertical: 10,
        alignItems: 'center',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT * 0.85,
    },
    poster: {
        // width: SCREEN_WIDTH * 0.8,
        // height: SCREEN_WIDTH * 1.2,
        width: SCREEN_WIDTH,
        height: '100%',
        // borderRadius: 12,
    },
    playButton: {
        position: 'absolute',
        top: '40%',
        alignSelf: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        width: SCREEN_WIDTH,
    },
    providerText: {
        fontSize: 14,
        textTransform: 'capitalize',
    },
})

export default Trailer;