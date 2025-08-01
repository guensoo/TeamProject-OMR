import { memo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import OTTCard from './card/OTTCard';
import { getMovieDetail, getTVDetail } from '../../All/api/tmdb'; // ← 실제 경로로!

function OTTSection({ title, data, activeCard, onToggle, providerKey }) {
    const navigation = useNavigation();

    // 상세 fetch → navigation
    const handleDetailPress = async (item) => {
        try {
            let detail = null;
            if (item.media_type === 'movie' || item.title) {
                detail = await getMovieDetail(item.id);
            } else {
                detail = await getTVDetail(item.id);
            }
            if (detail) {
                navigation.navigate("InfoDetail", { ott: detail });
            } else {
                alert('상세 정보를 불러올 수 없습니다.');
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
                keyExtractor={(item) => item.id.toString()}
                extraData={activeCard}
                renderItem={({ item, index }) => (
                    <OTTCard
                        rank={index + 1}
                        image={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                        title={item.title || item.name}
                        isActive={activeCard === item.id}
                        onToggle={() => onToggle(item.id)}
                        onReviewPress={() => {
                            navigation.navigate("ReviewList", {
                                initialKeyword: item.title || item.name // ★ 이 부분이 핵심!
                            });
                        }}
                        onDetailPress={() => handleDetailPress(item)}
                    />
                )}
            />
        </View>
    );
}

export default memo(OTTSection);

const styles = StyleSheet.create({
    section: { marginBottom: 20 },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: { fontSize: 18, fontWeight: 'bold' },
    seeAll: { color: '#007BFF', fontSize: 14 },
});
