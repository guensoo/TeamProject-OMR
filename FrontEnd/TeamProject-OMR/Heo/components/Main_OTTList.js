import { FlatList, View, Image, Text, TouchableOpacity, Dimensions, StyleSheet } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const Main_OTTList = ({ data }) => {
    const uniqueData = data.filter((item, index, arr) =>
        arr.findIndex(i => i.id === item.id) === index
    );
    return (
        <FlatList
            // data={data.filter(item => item.provider === provider)}
            data={uniqueData}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) =>
                `${item.type}_${item.provider || 'unknown'}_${item.id}_${index}`
            }
            renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                    <Image
                        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                        style={styles.poster}
                        resizeMode="cover"
                    />
                    <Text
                        style={styles.title}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                    >
                        {item.title}
                    </Text>
                    <Text style={styles.providerText}>
                        {item.provider}
                    </Text>
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        marginVertical: 10,
        alignItems: 'center',
        marginLeft: 12,
        marginRight: 8,
        width: SCREEN_WIDTH * 0.33,
    },
    poster: {
        width: SCREEN_WIDTH * 0.33,
        height: SCREEN_WIDTH * 0.33 * 1.5,
        borderRadius: 12,
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
        width: SCREEN_WIDTH * 0.33,
    },
    providerText: {
        fontSize: 14,
        color: '#aaa',
        textTransform: 'capitalize',
    },
})

export default Main_OTTList;