import { memo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import OTTCard from './card/OTTCard';
import { getMovieDetail, getTVDetail } from '../../All/api/tmdb'; // ← 실제 경로로!

function OTTSection({ title, data, activeCardKey, onToggle, providerKey }) {
    const navigation = useNavigation();

    // 상세 fetch → navigation
    const handleDetailPress = async (item) => {
        try {
            let detail = null;

            console.log("item::", item)

            const type = item.media_type || item.type;
            const id = item.tmdbId || item.id;

            if (type === 'movie') {
                detail = await getMovieDetail(id);
                navigation.navigate("InfoDetail", { movie: detail });
            } else if (type === 'tv') {
                detail = await getTVDetail(id);
                navigation.navigate("InfoDetail", { ott: detail });
            }
        } catch (e) {
            alert('상세 정보를 불러오는 중 오류가 발생했습니다.');
        }
    };

    return (
        <View style={styles.section}>
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate('OTTListScreen', { providerKey })
                    }
                >
                    <Text style={styles.seeAll}>전체보기</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                horizontal
                data={data}
                keyExtractor={(item) => providerKey + '-' + item.id}
                extraData={activeCardKey}
                renderItem={({ item, index }) => {
                    const cardKey = providerKey + '-' + item.id;
                    return (
                        <OTTCard
                            rank={index + 1}
                            image={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                            title={item.title || item.name}
                            isActive={activeCardKey === cardKey}
                            onToggle={() => onToggle(providerKey, item.id)}
                            onReviewPress={() => {
                                navigation.navigate("ReviewList", {
                                    initialKeyword: item.title || item.name
                                });
                            }}
                            onDetailPress={() => handleDetailPress(item)}
                        />
                    );
                }}
            />
        </View>
    );
}


export default memo(OTTSection);

const styles = StyleSheet.create({
    section: {
        marginBottom: 20
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    seeAll: {
        color: '#007BFF',
        fontSize: 14
    },
});
