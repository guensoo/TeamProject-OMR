import { useEffect, useState } from 'react';
import { Text, View, ScrollView, StatusBar, StyleSheet, ActivityIndicator } from 'react-native';
import { getBoxOfficeWithPosters } from '../All/api/kofic';
import { useNavigation } from '@react-navigation/native';
import MovieSection from './components/MovieSection';

const CATEGORY_OPTIONS = [
    { key: 'all', label: '전체 인기순', params: {} },
    { key: 'korean', label: '한국 영화 인기순', params: { repNationCd: 'K' } },
    { key: 'global', label: '외국 영화 인기순', params: { repNationCd: 'F' } },
    { key: 'commercial', label: '상업 영화 인기순', params: { multiMovieYn: 'N' } },
    { key: 'indie', label: '독립 영화 인기순', params: { multiMovieYn: 'Y' } },
];

export default function MovieScreen() {
    const [movieRows, setMovieRows] = useState({});
    const [activeCard, setActiveCard] = useState(null);
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const today = new Date();
        today.setDate(today.getDate() - 1);
        const y = today.getFullYear();
        const m = String(today.getMonth() + 1).padStart(2, '0');
        const d = String(today.getDate()).padStart(2, '0');
        const date = `${y}${m}${d}`;

        setLoading(true);

        // 카테고리별 API를 한 번에 병렬 요청!
        Promise.all(
            CATEGORY_OPTIONS.map(cat =>
                getBoxOfficeWithPosters(date, cat.params).then(data => ({
                    key: cat.key,
                    data: data.slice(0, 10)
                }))
            )
        ).then(results => {
            const rows = {};
            results.forEach(r => { rows[r.key] = r.data; });
            setMovieRows(rows);
            setLoading(false);
        });
    }, []);


    const handleToggle = (id) => setActiveCard((prev) => (prev === id ? null : id));

    // 뱃지는 전체 인기순만 (필요시 아래처럼 구분)
    const renderRankBadge = (catKey) => (rank) => {
        if (catKey !== 'all') return null;
        if (rank > 3) return null;
        // ... 뱃지 스타일/코드는 기존과 동일
        // (생략)
    };

    if (loading) {
        // 💡 전체 데이터 불러오는 동안 스피너만
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#ffd700" />
                <Text style={{ color: '#fff', marginTop: 15, fontSize: 16 }}>영화 랭킹 불러오는 중...</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#1a1a2e', paddingTop: 20 }}>
            <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
            <ScrollView>
                {CATEGORY_OPTIONS.map((cat) => (
                    <MovieSection
                        key={cat.key}
                        title={cat.label}
                        data={movieRows[cat.key] || []}
                        onPressAll={() =>
                            navigation.navigate('MovieListScreen', { categoryKey: cat.key })
                        }
                        activeCard={activeCard}
                        onToggle={handleToggle}
                        renderRankBadge={renderRankBadge(cat.key)}
                    />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        backgroundColor: '#1a1a2e',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
