import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { getOTTPopularMovie, OTT_PROVIDERS } from '../All/api/tmdb';
import OTTListCard from './components/card/OTTListCard';

const initialLayout = { width: Dimensions.get('window').width };

function OTTTabContent({ providerKey, sortBy }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [isEnd, setIsEnd] = useState(false);
    const [activeCard, setActiveCard] = useState(null);

    useEffect(() => {
        fetchData(1, sortBy);
        setActiveCard(null);
    }, [sortBy, providerKey]);

    const fetchData = async (pageNum, sortOption) => {
        try {
            setLoading(true);
            const providerId = OTT_PROVIDERS[providerKey];
            const res = await getOTTPopularMovie(providerId, pageNum, sortOption);

            if (!res || res.length === 0) {
                setIsEnd(true);
                return;
            }
            if (pageNum === 1) {
                setData(res);
            } else {
                setData((prev) => [...prev, ...res]);
            }
        } finally {
            setLoading(false);
        }
    };

    // 👑 1~3등만 뱃지로 표시
    function renderRankBadge(rank) {
        if (sortBy !== 'popularity.desc') return null;
        if (rank > 3) return null;
        let badgeStyle = {
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 10,
            borderRadius: 16,
            width: 32,
            height: 32,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#444',
            borderWidth: 2,
            borderColor: '#fff'
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

    // 카드 토글 핸들러 (한번 더 누르면 닫힘)
    const handleToggleCard = (id) => {
        setActiveCard((prev) => (prev === id ? null : id));
    };

    return (
        <View style={styles.tabContainer}>
            {loading && page === 1 ? (
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
                                <OTTListCard
                                    rank={index + 1}
                                    image={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                    title={item.title || item.name}
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

export default function OTTListScreen({ route }) {
    const { providerKey } = route.params;
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'popular', title: '인기순' },
        { key: 'recent', title: '최신순' }
    ]);

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'popular':
                return <OTTTabContent providerKey={providerKey} sortBy="popularity.desc" />;
            case 'recent':
                return <OTTTabContent providerKey={providerKey} sortBy="release_date.desc" />;
            default:
                return null;
        }
    };

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
            renderTabBar={props =>
                <TabBar
                    {...props}
                    style={{ backgroundColor: '#181830' }}
                    indicatorStyle={{ backgroundColor: '#fff' }}
                    labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                    inactiveColor="#aaa"
                    activeColor="#fff"
                />
            }
            style={{ backgroundColor: '#0f0f23' }}
        />
    );
}

const styles = StyleSheet.create({
    tabContainer: { flex: 1, backgroundColor: '#0f0f23', padding: 10 },
    detailBox: {
        backgroundColor: '#232336',
        borderRadius: 12,
        margin: 8,
        padding: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#393969'
    },
    detailText: {
        color: '#fff',
        fontSize: 14
    }
});
