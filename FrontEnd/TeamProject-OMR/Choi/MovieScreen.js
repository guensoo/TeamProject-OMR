import { useEffect, useState, useCallback } from 'react';
import { 
    Animated, 
    Text, 
    View, 
    StatusBar, 
    StyleSheet, 
    ActivityIndicator 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getBoxOfficeWithPostersAndTrailer } from '../All/api/kofic';
import { useNavigation } from '@react-navigation/native';
import MovieSection from './components/MovieSection';
import { SafeAreaView } from 'react-native-safe-area-context';

const CATEGORY_OPTIONS = [
    { key: 'all', label: '전체 인기순', color: '#e50914', icon: '🎬', params: {} },
    { key: 'korean', label: '한국 영화 인기순', color: '#ff7b00', icon: '🇰🇷', params: { repNationCd: 'K' } },
    { key: 'global', label: '외국 영화 인기순', color: '#1f4788', icon: '🌍', params: { repNationCd: 'F' } },
    { key: 'commercial', label: '상업 영화 인기순', color: '#ffd700', icon: '💰', params: { multiMovieYn: 'N' } },
    { key: 'indie', label: '독립 영화 인기순', color: '#9c27b0', icon: '🎭', params: { multiMovieYn: 'Y' } },
];

export default function MovieScreen() {
    const [loading, setLoading] = useState(true);
    const [movieRows, setMovieRows] = useState({});
    const [activeCard, setActiveCard] = useState(null);
    const navigation = useNavigation();

    // 애니메이션 값들 추가
    const fadeAnim = useState(new Animated.Value(0))[0];
    const slideAnim = useState(new Animated.Value(30))[0];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const today = new Date();
                today.setDate(today.getDate() - 1);
                const y = today.getFullYear();
                const m = String(today.getMonth() + 1).padStart(2, '0');
                const d = String(today.getDate()).padStart(2, '0');
                const date = `${y}${m}${d}`;

                // 카테고리별 API를 한 번에 병렬 요청
                const results = await Promise.all(
                    CATEGORY_OPTIONS.map(cat =>
                        getBoxOfficeWithPostersAndTrailer(date, cat.params).then(data => ({
                            key: cat.key,
                            data: data.slice(0, 10)
                        }))
                    )
                );

                const rows = {};
                results.forEach(r => { rows[r.key] = r.data; });
                setMovieRows(rows);
            } catch (err) {
                console.error('Movie API Error:', err.message);
                setMovieRows({});
            } finally {
                setLoading(false);
                // 애니메이션 시작
                Animated.parallel([
                    Animated.timing(fadeAnim, {
                        toValue: 1,
                        duration: 800,
                        useNativeDriver: true,
                    }),
                    Animated.timing(slideAnim, {
                        toValue: 0,
                        duration: 800,
                        useNativeDriver: true,
                    }),
                ]).start();
            }
        };

        fetchData();
    }, []);

    // useCallback으로 메모이제이션
    const handleToggle = useCallback((section, id) => {
        setActiveCard(prev =>
            prev && prev.section === section && prev.id === id
                ? null
                : { section, id }
        );
    }, []);

    const handlePressAll = useCallback((catKey, catLabel) => {
        navigation.navigate('MovieListScreen', {
            category: catKey,
            title: catLabel
        });
    }, [navigation]);

    if (loading) {
        return (
            <LinearGradient
                colors={['#0f0f23', '#1a1a2e', '#16213e']}
                style={styles.loadingContainer}
            >
                <ActivityIndicator size="large" color="#ffd700" />
                <Text style={styles.loadingText}>영화 랭킹 불러오는 중...</Text>
            </LinearGradient>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#0f0f23' }} edges={['top', 'left', 'right']}>
            <View style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor="#0f0f23" />

                <Animated.ScrollView
                    style={[styles.scrollContainer, { opacity: fadeAnim }]}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {CATEGORY_OPTIONS.map((category) => (
                        <Animated.View key={category.key} style={styles.sectionWrapper}>
                            <View
                                style={[styles.sectionHeader, { borderLeftColor: category.color }]}
                            >
                                <Text style={styles.sectionIcon}>{category.icon}</Text>
                                <Text style={styles.sectionTitle}>{category.label}</Text>
                            </View>
                            <MovieSection
                                sectionKey={category.key}
                                title=""
                                data={movieRows[category.key] || []}
                                activeCard={activeCard}
                                onToggle={handleToggle}
                                onPressAll={() => handlePressAll(category.key, category.label)}
                                navigation={navigation}
                            />
                        </Animated.View>
                    ))}
                </Animated.ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0f0f23' },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    loadingText: { color: '#fff', fontSize: 16, marginTop: 10 },
    scrollContainer: { flex: 1 },
    scrollContent: { paddingHorizontal: 15 },
    sectionWrapper: {
        marginBottom: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderRadius: 20,
        padding: 15,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        borderLeftWidth: 4,
        borderRadius: 8,
    },
    sectionIcon: { fontSize: 24, marginRight: 12 },
    sectionTitle: { fontSize: 20, fontWeight: '700', color: '#ffffff' },
});