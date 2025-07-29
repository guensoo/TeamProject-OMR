import { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    Animated,
    StyleSheet,
    StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import OTTSection from './components/OTTSection';
import { getAllOTTPopular } from '../All/api/tmdb';

export default function OTTScreen() {
    const [loading, setLoading] = useState(true);
    const [ottData, setOttData] = useState({});
    const [activeCard, setActiveCard] = useState(null);

    const fadeAnim = useState(new Animated.Value(0))[0];
    const slideAnim = useState(new Animated.Value(30))[0];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllOTTPopular();
                setOttData(data || {});
            } catch (err) {
                console.error('OTT API Error:', err.message);
                setOttData({});
            } finally {
                setLoading(false);
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

    // ✅ useCallback으로 메모이제이션
    const handleToggle = useCallback((itemId) => {
        setActiveCard((prev) => (prev === itemId ? null : itemId));
    }, []);

    if (loading) {
        return (
            <LinearGradient
                colors={['#0f0f23', '#1a1a2e', '#16213e']}
                style={styles.loadingContainer}
            >
                <ActivityIndicator size="large" color="#ff6b6b" />
                <Text style={styles.loadingText}>OTT 콘텐츠 로딩중...</Text>
            </LinearGradient>
        );
    }

    const ottServices = [
        { key: 'netflix', title: '넷플릭스 인기 순', color: '#e50914', icon: '🎬' },
        { key: 'disney', title: '디즈니+ 인기 순', color: '#113ccf', icon: '✨' },
        { key: 'wavve', title: '웨이브 인기 순', color: '#1f4788', icon: '🌊' },
        { key: 'watcha', title: '왓챠 인기 순', color: '#ff0558', icon: '👁️' },
        { key: 'prime', title: 'Prime Video 인기 순', color: '#00a8e1', icon: '📺' },
    ];

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#0f0f23" />

            <Animated.ScrollView
                style={[styles.scrollContainer, { opacity: fadeAnim }]}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {ottServices.map((service) => (
                    <Animated.View key={service.key} style={styles.sectionWrapper}>
                        <View
                            style={[styles.sectionHeader, { borderLeftColor: service.color }]}
                        >
                            <Text style={styles.sectionIcon}>{service.icon}</Text>
                            <Text style={styles.sectionTitle}>{service.title}</Text>
                        </View>
                        <OTTSection
                            title=""
                            data={ottData[service.key] || []}
                            activeCard={activeCard}
                            onToggle={handleToggle}
							providerKey={service.key}
                        />
                    </Animated.View>
                ))}
            </Animated.ScrollView>
        </View>
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
