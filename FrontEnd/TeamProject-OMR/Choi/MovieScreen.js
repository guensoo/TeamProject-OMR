import { useEffect, useState } from 'react';
import { Animated, Text, View, ScrollView, StatusBar, StyleSheet, ActivityIndicator } from 'react-native';
import { getBoxOfficeWithPostersAndTrailer } from '../All/api/kofic';
import { useNavigation } from '@react-navigation/native';
import MovieSection from './components/MovieSection';

const CATEGORY_OPTIONS = [
    { key: 'all', label: '전체 인기순', color: '#e50914', icon: '🎬', params: {} },
    { key: 'korean', label: '한국 영화 인기순', color: '#ff7b00', icon: '🇰🇷', params: { repNationCd: 'K' } },
    { key: 'global', label: '외국 영화 인기순', color: '#1f4788', icon: '🌍', params: { repNationCd: 'F' } },
    { key: 'commercial', label: '상업 영화 인기순', color: '#ffd700', icon: '💰', params: { multiMovieYn: 'N' } },
    { key: 'indie', label: '독립 영화 인기순', color: '#9c27b0', icon: '🎭', params: { multiMovieYn: 'Y' } },
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
                getBoxOfficeWithPostersAndTrailer(date, cat.params).then(data => ({
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


    const handleToggle = (section, id) => {
        setActiveCard(prev =>
            prev && prev.section === section && prev.id === id
                ? null
                : { section, id }
        );
    };

    const handlePressAll = (catKey, catLabel) => {
        navigation.navigate('MovieListScreen', {
            category: catKey,
            title: catLabel
        });
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#ffd700" />
                <Text style={styles.loadingText}>영화 랭킹 불러오는 중...</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#1a1a2e', paddingTop: 20 }}>
            <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
            <ScrollView>
                {CATEGORY_OPTIONS.map((category) => (
                    
                    <MovieSection
                        key={category.key}
                        sectionKey={category.key}
                        title={category.label}
                        data={movieRows[category.key] || []}
                        activeCard={activeCard}  // 카테고리별로!
                        onToggle={handleToggle} // 카테고리 정보 함께!
                        onPressAll={() => handlePressAll(category.key, category.label)}
                        navigation={navigation}
                    // ...기타 props
                    />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f0f23'
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0f0f23' // ✅ 다크 배경 통일
    },
    loadingText: {
        color: '#ffd700',          // ✅ 흰색 ❌, OTT와 맞춰 노란색 유지
        fontSize: 16,
        marginTop: 10,
        fontWeight: '600'          // ✅ 약간 강조
    },
    scrollContainer: {
        flex: 1
    },
    scrollContent: {
        paddingHorizontal: 15
    },
    sectionWrapper: {
        // marginBottom: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.03)', // ✅ 살짝 투명한 흰색 배경
        borderRadius: 20,
        paddingLeft: 15,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        borderLeftWidth: 4,
        borderRadius: 8,
    },
    sectionIcon: {
        fontSize: 24,
        marginRight: 12,
        color: '#fff' // ✅ 흰색 고정 (배경색 대비)
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#ffffff' // ✅ 흰색 타이틀
    },
});

