import React, { useState, useEffect } from 'react';
import {
    View,
    TextInput,
    FlatList,
    Text,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    StyleSheet,
    StatusBar
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getAllPopularGlobal } from '../All/api/tmdb';

function getYear(date) {
    if (!date) return '';
    return date.slice(0, 4);
}

export default function SearchList() {
    const navigation = useNavigation();
    const route = useRoute();
    const onSelect = route.params?.onSelect;

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [popular, setPopular] = useState([]);
    const [filter, setFilter] = useState('all'); // 전체/영화/드라마

    // ✅ 인기 리스트 로딩 - filter가 바뀔 때마다!
    useEffect(() => {
        const fetchPopular = async () => {
            setLoading(true);
            try {
                const allPopular = await getAllPopularGlobal(20, filter);
                setPopular(allPopular);
            } catch {
                setPopular([]);
            }
            setLoading(false);
        };
        fetchPopular();
    }, [filter]);

    // ✅ 검색 - filter 반영 (검색 쿼리/필터 바뀔 때마다)
    useEffect(() => {
        if (query.trim().length < 2) {
            setResults([]);
            return;
        }
        const timeout = setTimeout(() => {
            doSearch(query.trim());
        }, 400);
        return () => clearTimeout(timeout);
    }, [query, filter]);

    const doSearch = async (keyword) => {
        setLoading(true);
        try {
            const API_KEY = '46ae6607955da617463546b9cd029255';
            const BASE_URL = 'https://api.themoviedb.org/3';

            let movies = [];
            let tvs = [];
            if (filter === 'all' || filter === 'movie') {
                const resMovie = await fetch(
                    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=ko-KR&query=${encodeURIComponent(keyword)}&include_adult=false`
                );
                movies = (await resMovie.json()).results || [];
            }
            if (filter === 'all' || filter === 'tv') {
                const resTv = await fetch(
                    `${BASE_URL}/search/tv?api_key=${API_KEY}&language=ko-KR&query=${encodeURIComponent(keyword)}&include_adult=false`
                );
                tvs = (await resTv.json()).results || [];
            }
            let combined = [...movies, ...tvs].sort((a, b) =>
                ((b.popularity || 0) - (a.popularity || 0))
            );
            setResults(combined.slice(0, 10));
        } catch (e) {
            setResults([]);
        }
        setLoading(false);
    };

    // ✅ 검색 시에도 이미 filter별로 doSearch 결과만 반환되기 때문에 여기선 별도 filter X
    const data = query.trim().length < 2 ? popular : results;

    const renderItem = ({ item, index }) => (
        <TouchableOpacity
            style={[styles.itemCard, { marginTop: index === 0 ? 0 : 8 }]}
            activeOpacity={0.95}
            onPress={() => {
                if (onSelect) onSelect(item);
                navigation.goBack();
            }}
        >
            <View style={styles.posterContainer}>
                {item.poster_path ? (
                    <Image
                        source={{ uri: `https://image.tmdb.org/t/p/w185${item.poster_path}` }}
                        style={styles.poster}
                    />
                ) : (
                    <View style={styles.emptyPoster}>
                        <Text style={styles.emptyPosterText}>No Image</Text>
                    </View>
                )}
            </View>

            <View style={styles.contentContainer}>
                <View style={styles.titleRow}>
                    <Text style={styles.title} numberOfLines={2}>
                        {item.title || item.name}
                    </Text>
                    <View style={styles.typeTag}>
                        <Text style={styles.typeText}>
                            {item.title ? '영화' : '드라마'}
                        </Text>
                    </View>
                </View>

                <View style={styles.metaRow}>
                    <Text style={styles.year}>
                        {getYear(item.release_date || item.first_air_date)}
                    </Text>
                    {item.vote_average > 0 && (
                        <View style={styles.ratingContainer}>
                            <Text style={styles.ratingIcon}>⭐</Text>
                            <Text style={styles.rating}>
                                {item.vote_average.toFixed(1)}
                            </Text>
                        </View>
                    )}
                </View>

                {(item.original_title || item.original_name) &&
                    (item.original_title !== item.title && item.original_name !== item.name) && (
                        <Text style={styles.originalTitle} numberOfLines={1}>
                            {item.original_title || item.original_name}
                        </Text>
                    )}
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#0F0F23" translucent={false} />

            {/* 헤더 */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backIcon}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>작품 선택</Text>
                <View style={styles.headerSpacer} />
            </View>

            {/* 검색창 */}
            <View style={styles.searchContainer}>
                <View style={styles.searchInputContainer}>
                    <Text style={styles.searchIcon}>🔍</Text>
                    <TextInput
                        style={styles.searchInput}
                        value={query}
                        onChangeText={setQuery}
                        placeholder="영화나 드라마를 검색해보세요"
                        placeholderTextColor="#8B8B8B"
                        clearButtonMode="while-editing"
                    />
                </View>
            </View>

            {/* 카테고리 필터 */}
            <View style={styles.filterBar}>
                <TouchableOpacity onPress={() => setFilter('all')}>
                    <Text style={[
                        styles.filterBtn,
                        filter === 'all' && styles.filterActive
                    ]}>전체</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFilter('movie')}>
                    <Text style={[
                        styles.filterBtn,
                        filter === 'movie' && styles.filterActive
                    ]}>영화</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFilter('tv')}>
                    <Text style={[
                        styles.filterBtn,
                        filter === 'tv' && styles.filterActive
                    ]}>드라마</Text>
                </TouchableOpacity>
            </View>

            {/* 섹션 타이틀 */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>
                    {query.trim().length < 2 ? '🔥 인기 작품' : `"${query}" 검색 결과`}
                </Text>
                {!loading && data.length > 0 && (
                    <Text style={styles.sectionCount}>
                        {data.length}개
                    </Text>
                )}
            </View>

            {/* 로딩 */}
            {loading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#FF6B6B" />
                    <Text style={styles.loadingText}>검색 중...</Text>
                </View>
            )}

            {/* 리스트 */}
            <FlatList
                data={data}
                keyExtractor={item => String(item.id) + (item.title ? '_movie' : '_tv')}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={!loading && (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyIcon}>
                            {query.trim().length > 1 ? '🔍' : '🎬'}
                        </Text>
                        <Text style={styles.emptyTitle}>
                            {query.trim().length > 1
                                ? '검색 결과가 없습니다'
                                : '인기 작품을 확인해보세요'}
                        </Text>
                        <Text style={styles.emptySubtitle}>
                            {query.trim().length > 1
                                ? '다른 키워드로 검색해보세요'
                                : '리뷰할 작품을 선택해주세요'}
                        </Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F0F23',
        paddingTop: StatusBar.currentHeight || 0,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#1A1A35',
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#1A1A35',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backIcon: {
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: '600',
    },
    headerTitle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
        textAlign: 'center',
    },
    headerSpacer: {
        width: 40,
    },
    searchContainer: {
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1A1A35',
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderWidth: 1,
        borderColor: '#2A2A45',
    },
    searchIcon: {
        fontSize: 16,
        marginRight: 12,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#FFFFFF',
        paddingVertical: 12,
    },
    filterBar: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    filterBtn: {
        fontSize: 15,
        color: '#aaa',
        marginHorizontal: 12,
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 12,
        backgroundColor: 'transparent',
        fontWeight: 'bold'
    },
    filterActive: {
        color: '#FF6B6B',
        backgroundColor: '#1A1A35',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    sectionCount: {
        fontSize: 14,
        color: '#8B8B8B',
        backgroundColor: '#1A1A35',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    loadingContainer: {
        alignItems: 'center',
        paddingVertical: 40,
    },
    loadingText: {
        color: '#8B8B8B',
        fontSize: 14,
        marginTop: 12,
    },
    listContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    itemCard: {
        flexDirection: 'row',
        backgroundColor: '#1A1A35',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#2A2A45',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    posterContainer: {
        marginRight: 16,
    },
    poster: {
        width: 60,
        height: 90,
        borderRadius: 12,
        backgroundColor: '#2A2A45',
    },
    emptyPoster: {
        width: 60,
        height: 90,
        borderRadius: 12,
        backgroundColor: '#2A2A45',
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyPosterText: {
        color: '#666',
        fontSize: 10,
        textAlign: 'center',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
        flex: 1,
        marginRight: 8,
        lineHeight: 22,
    },
    typeTag: {
        backgroundColor: '#FF6B6B',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
    },
    typeText: {
        fontSize: 11,
        color: '#FFFFFF',
        fontWeight: '600',
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    year: {
        fontSize: 14,
        color: '#8B8B8B',
        marginRight: 12,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingIcon: {
        fontSize: 12,
        marginRight: 4,
    },
    rating: {
        fontSize: 13,
        color: '#FFD700',
        fontWeight: '600',
    },
    originalTitle: {
        fontSize: 13,
        color: '#666',
        fontStyle: 'italic',
        marginTop: 2,
    },
    emptyContainer: {
        alignItems: 'center',
        paddingVertical: 60,
    },
    emptyIcon: {
        fontSize: 48,
        marginBottom: 16,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: 8,
    },
    emptySubtitle: {
        fontSize: 14,
        color: '#8B8B8B',
        textAlign: 'center',
    },
});
