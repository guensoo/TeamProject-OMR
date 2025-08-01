import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import MovieCard from './card/MovieCard';
import { useNavigation } from '@react-navigation/native';
import { getMovieDetail } from '../../All/api/tmdb';

export default function MovieSection({
    title, onPressAll, data, activeCard, onToggle, renderRankBadge, sectionKey
}) {
    const navigation = useNavigation();

    // TMDB id가 없는 경우 대비 (예: KOFIC 데이터만 있을 때)
    const handleDetailPress = async (item) => {
        // 1. TMDB id가 없다면 안내
        if (!item.tmdbId && !item.id) {
            alert('TMDB 영화 ID가 없어 상세 정보를 볼 수 없습니다.');
            return;
        }
        // 2. TMDB id로 상세 조회
        try {
            // tmdbId 우선, 없으면 id 사용
            const movieId = item.tmdbId || item.id;
            const detail = await getMovieDetail(movieId);
            if (detail) {
                navigation.navigate("InfoDetail", { movie: detail });
            } else {
                alert('상세 정보를 불러올 수 없습니다.');
            }
        } catch (e) {
            alert('상세 정보를 불러오는 중 오류가 발생했습니다.');
        }
    };

    return (
        <View style={styles.sectionContainer}>
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                <TouchableOpacity onPress={onPressAll}>
                    <Text style={styles.allBtn}>전체보기</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={data}
                keyExtractor={(item, idx) =>
                    // tmdbId가 우선, 없으면 KOFIC id, 마지막으로 index
                    (item.tmdbId ? 'tmdb-' + item.tmdbId : (item.id ? 'local-' + item.id : 'idx-' + idx))
                }
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <View style={{ marginRight: 10, position: 'relative' }}>
                        {renderRankBadge && renderRankBadge(index + 1)}
                        <MovieCard
                            rank={index + 1}
                            image={item.poster_path}
                            title={item.title}
                            isActive={
                                activeCard &&
                                activeCard.section === sectionKey &&
                                activeCard.id === item.id
                            }
                            onReviewPress={() => {
                                navigation.navigate("ReviewList", {
                                    initialKeyword: item.title || item.name
                                });
                            }}
                            onDetailPress={() => handleDetailPress(item)}
                            onToggle={() => onToggle(sectionKey, item.id)}
                        />
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    sectionContainer: { marginBottom: 32, paddingLeft: 10 },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
        marginRight: 20
    },
    title: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
    allBtn: { fontSize: 14, color: '#ffd700', fontWeight: 'bold' },
});
