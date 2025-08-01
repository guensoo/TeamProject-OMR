import { useEffect, useState } from 'react';
import {
    View,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';
import { getBoxOfficeWithPostersAndTrailer } from '../All/api/kofic';
import { getMovieDetail } from '../All/api/tmdb'; // 상세 fetch 추가!
import MovieListCard from './components/card/MovieListCard';
import { SafeAreaView } from 'react-native-safe-area-context';

const DEFAULT_SORT_BY = {
    all: 'rank',
    korean: 'rank',
    global: 'rank',
    commercial: 'rank',
    indie: 'rank'
};

const CATEGORY_LABELS = {
    all: '박스오피스 순위',
    korean: '한국 영화 인기순',
    global: '외국 영화 인기순',
    commercial: '상업 영화 인기순',
    indie: '독립 영화 인기순',
};

export default function MovieListScreen({ route, navigation }) {
    const { categoryKey } = route?.params || {};
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState(DEFAULT_SORT_BY[categoryKey] || 'rank');
    const [activeCard, setActiveCard] = useState(null);
    const [fetchingDetail, setFetchingDetail] = useState(false);

    const CATEGORY_PARAMS = {
        all: {},
        korean: { repNationCd: 'K' },
        global: { repNationCd: 'F' },
        commercial: { multiMovieYn: 'N' },
        indie: { multiMovieYn: 'Y' }
    };
    const selectedParams = CATEGORY_PARAMS[categoryKey] || {};

    useEffect(() => {
        const today = new Date();
        today.setDate(today.getDate() - 1);
        const y = today.getFullYear();
        const m = String(today.getMonth() + 1).padStart(2, '0');
        const d = String(today.getDate()).padStart(2, '0');
        const targetDt = `${y}${m}${d}`;

        const fetchData = async () => {
            setLoading(true);
            setActiveCard(null);
            const res = await getBoxOfficeWithPostersAndTrailer(targetDt, selectedParams);
            setData(res.slice(0, 10));
            setLoading(false);
            setSortBy(DEFAULT_SORT_BY[categoryKey] || 'rank');
        };
        fetchData();
    }, [categoryKey]);

    function renderRankBadge(rank) {
        if (sortBy !== 'rank') return null;
        if (rank > 3) return null;
        let badgeStyle = {
            position: 'absolute', top: 0, left: 0, zIndex: 10, borderRadius: 16,
            width: 32, height: 32, justifyContent: 'center', alignItems: 'center',
            backgroundColor: '#444', borderWidth: 2, borderColor: '#fff'
        };
        let badgeEmoji = null;
        if (rank === 1) badgeEmoji = "👑";
        else if (rank === 2) badgeEmoji = "🥈";
        else if (rank === 3) badgeEmoji = "🥉";
        return (
            <View style={badgeStyle}>
                <Text style={{ fontSize: 20 }}>{badgeEmoji}</Text>
            </View>
        );
    }

    const handleToggleCard = (id) => {
        setActiveCard((prev) => (prev === id ? null : id));
    };

    // ✅ 상세보기 버튼에서 항상 TMDB fetch 후 이동!
    const handleDetailPress = async (item) => {
        const tmdbId = item.tmdbId;
        if (!tmdbId) {
            alert('TMDB ID가 없어 상세정보를 볼 수 없습니다.');
            return;
        }
        try {
            setFetchingDetail(true);
            const detail = await getMovieDetail(tmdbId);
            setFetchingDetail(false);
            if (detail) {
                navigation.navigate("InfoDetail", { movie: detail });
            } else {
                alert('상세 정보를 불러올 수 없습니다.');
            }
        } catch (err) {
            setFetchingDetail(false);
            alert('상세 정보 조회 중 오류가 발생했습니다.');
        }
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.sortContainer}>
                <TouchableOpacity onPress={() => setSortBy('rank')}>
                    <Text style={[styles.sortButton, sortBy === 'rank' && styles.active]}>
                        {CATEGORY_LABELS[categoryKey] || '박스오피스 순위'}
                    </Text>
                </TouchableOpacity>
                {/* 필요하면 최신순 등 다른 정렬 버튼도 추가 */}
            </View>

            {loading || fetchingDetail ? (
                <ActivityIndicator size="large" />
            ) : (
                <FlatList
                    data={data}
                    numColumns={2}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) => (
                        <View style={{ position: 'relative', flex: 1 }}>
                            {renderRankBadge(index + 1)}
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => handleToggleCard(item.id)}
                                style={{ flex: 1 }}
                            >
                                <MovieListCard
                                    rank={index + 1}
                                    image={item.poster_path}
                                    title={item.title}
                                    isActive={activeCard === item.id}
                                    onToggle={() => handleToggleCard(item.id)}
                                    onReviewPress={() => {
                                        navigation.navigate("ReviewDetail", { reviewId: item.id });
                                    }}
                                    onDetailPress={() => handleDetailPress(item)}
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#1a1a2e', padding: 10 },
    sortContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 10 },
    sortButton: { color: '#aaa', fontSize: 16, marginHorizontal: 10 },
    active: { color: '#fff', fontWeight: 'bold' },
});
