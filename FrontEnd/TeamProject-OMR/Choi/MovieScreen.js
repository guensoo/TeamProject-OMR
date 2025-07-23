import { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    Dimensions,
    Animated,
    StatusBar
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getBoxOfficeWithPosters } from '../All/api/kofic';
import MovieCard from './components/MovieCard';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 60) / 2;

export default function MovieScreen() {
    const [loading, setLoading] = useState(true);
    const [boxOfficeData, setBoxOfficeData] = useState([]);
    const [activeCard, setActiveCard] = useState(null); // ✅ 현재 활성화된 카드 id

    const handleToggleCard = (id) => {
        setActiveCard((prev) => (prev === id ? null : id));
        // ✅ 같은 카드를 다시 누르면 닫힘, 다른 카드 누르면 교체
    };
    const fadeAnim = useState(new Animated.Value(0))[0];
    const slideAnim = useState(new Animated.Value(50))[0];
    const scaleAnim = useState(new Animated.Value(0.8))[0];

    useEffect(() => {
        const today = new Date();
        today.setDate(today.getDate() - 1);
        const y = today.getFullYear();
        const m = String(today.getMonth() + 1).padStart(2, '0');
        const d = String(today.getDate()).padStart(2, '0');
        const targetDt = `${y}${m}${d}`;

        const fetchData = async () => {
            const data = await getBoxOfficeWithPosters(targetDt);
            setBoxOfficeData(data.slice(0, 10));
            setLoading(false);

            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    tension: 50,
                    friction: 8,
                    useNativeDriver: true,
                })
            ]).start();
        };
        fetchData();
    }, []);
    const renderRankBadge = (rank) => {
        if (rank > 3) return null; // 4~10등은 아무것도 표시 안함
        // 기본 스타일 + 텍스트
        let badgeStyle = [styles.rankBadge, styles.rankBadgeDefault];
        let badgeContent = <Text style={styles.rankBadgeText}>#{rank}</Text>;

        if (rank === 1) {
            badgeStyle = [styles.rankBadge, styles.rankBadgeGold];
            badgeContent = <Text style={styles.badgeEmoji}>👑</Text>;
        } else if (rank === 2) {
            badgeStyle = [styles.rankBadge, styles.rankBadgeSilver];
            badgeContent = <Text style={styles.badgeEmoji}>🥈</Text>;
        } else if (rank === 3) {
            badgeStyle = [styles.rankBadge, styles.rankBadgeBronze];
            badgeContent = <Text style={styles.badgeEmoji}>🥉</Text>;
        }

        return <View style={badgeStyle}>{badgeContent}</View>;
    };

    if (loading) {
        return (
            <LinearGradient
                colors={['#1a1a2e', '#16213e', '#0f3460']}
                style={styles.loadingContainer}
            >
                <View style={styles.loadingContent}>
                    <Text style={styles.loadingEmoji}>🎬</Text>
                    <ActivityIndicator size="large" color="#ffd700" style={styles.loader} />
                    <Text style={styles.loadingText}>박스오피스 정보 가져오는 중...</Text>
                </View>
            </LinearGradient>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
            <Animated.View style={[styles.listWrapper, { opacity: fadeAnim }]}>
                <FlatList
                    data={boxOfficeData}
                    numColumns={2}
                    contentContainerStyle={styles.listContainer}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) => (
                        <Animated.View
                            style={[
                                styles.cardWrapper,
                                {
                                    width: CARD_WIDTH,
                                    transform: [{
                                        translateY: slideAnim.interpolate({
                                            inputRange: [0, 50],
                                            outputRange: [0, 50 + (index * 10)],
                                        })
                                    }]
                                }
                            ]}
                        >
                            <View style={styles.cardContainer}>
                                {renderRankBadge(index + 1)}
                                <MovieCard
                                    rank={index + 1}
                                    image={item.poster_path}
                                    title={item.title}
                                    isActive={activeCard === item.id} // ✅ 현재 활성 카드 여부 전달
                                    onToggle={() => handleToggleCard(item.id)} // ✅ 카드 클릭 시 상태 업데이트
                                    onReviewPress={() => console.log('리뷰보기', item.title)}
                                    onDetailPress={() => console.log('상세정보', item.title)}
                                />
                            </View>
                        </Animated.View>
                    )}
                />
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#1a1a2e' },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    loadingContent: { alignItems: 'center' },
    loadingEmoji: { fontSize: 60, marginBottom: 20 },
    loader: { marginBottom: 20 },
    loadingText: { color: '#ffd700', fontSize: 18, fontWeight: 'bold' },
    listWrapper: { flex: 1, paddingHorizontal: 15 },
    listContainer: { paddingBottom: 100 },
    cardWrapper: { margin: 8, alignItems: 'center' },
    cardContainer: {
        position: 'relative',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 20,
        padding: 15,
        borderWidth: 1,
        borderColor: 'rgba(255, 215, 0, 0.2)',
    },
    rankBadge: {
        position: 'absolute',
        top: -8,
        left: -8, // ✅ 왼쪽으로 이동
        zIndex: 10,
        borderRadius: 18,
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
    },
    badgeEmoji: {
        fontSize: 20, // ✅ 왕관/메달은 더 크게
    },
    rankBadgeGold: { backgroundColor: '#ffd700', borderColor: '#ffed4e' },
    rankBadgeSilver: { backgroundColor: '#c0c0c0', borderColor: '#e8e8e8' },
    rankBadgeBronze: { backgroundColor: '#cd7f32', borderColor: '#deb887' },
    rankBadgeDefault: { backgroundColor: 'rgba(255, 255, 255, 0.2)', borderColor: '#fff' },
    rankBadgeText: { fontWeight: 'bold', fontSize: 12, color: '#fff' },
    rankBadgeTextGold: { color: '#8b4513' },
    rankBadgeTextSilver: { color: '#2f4f4f' },
    rankBadgeTextBronze: { color: '#fff' },
    rankBadgeTextDefault: { color: '#fff' },
});
