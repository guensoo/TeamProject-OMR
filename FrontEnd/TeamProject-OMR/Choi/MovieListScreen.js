import { useEffect, useState } from 'react';
import {
    View,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';
import { getBoxOfficeWithPosters } from '../All/api/kofic';
import MovieListCard from './components/card/MovieListCard'; // MovieCard or 커스텀 컴포넌트

export default function MovieListScreen({ route }) {
    // (필터) 카테고리값 route로 받아도 되고 내부 상태로 해도 됨
    const { categoryKey } = route?.params || {}; // 예: 'all', 'korean', 'global', 'commercial', 'indie'
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('rank'); // 박스오피스는 보통 랭크순
    const [activeCard, setActiveCard] = useState(null);

    // 카테고리별 params 매핑 (카테고리별로 route로 받아도 되고 상단 버튼도 OK)
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
            setActiveCard(null); // 정렬/카테고리 바뀌면 펼침 초기화
            const res = await getBoxOfficeWithPosters(targetDt, selectedParams);
            setData(res.slice(0, 10));
            setLoading(false);
        };
        fetchData();
    }, [categoryKey, sortBy]);

    // 1~3등만 뱃지
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

    return (
        <View style={styles.container}>
            <View style={styles.sortContainer}>
                <TouchableOpacity onPress={() => setSortBy('rank')}>
                    <Text style={[styles.sortButton, sortBy === 'rank' && styles.active]}>
                        박스오피스 순위
                    </Text>
                </TouchableOpacity>
                {/* 필요하면 최신순 등 다른 정렬 버튼도 추가 */}
            </View>

            {loading ? (
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
                                    onReviewPress={() => console.log('리뷰', item.title)}
                                    onDetailPress={() => console.log('상세', item.title)}
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#1a1a2e', padding: 10 },
    sortContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 10 },
    sortButton: { color: '#aaa', fontSize: 16, marginHorizontal: 10 },
    active: { color: '#fff', fontWeight: 'bold' },
});
