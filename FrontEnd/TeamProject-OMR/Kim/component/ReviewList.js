import { useCallback, useRef, useState, useEffect, useMemo } from "react";
import {
    View, Text, ScrollView, TouchableOpacity, Animated, Easing,
    ActivityIndicator, TextInput
} from "react-native";
import { Picker } from '@react-native-picker/picker';
import { useFocusEffect } from "@react-navigation/native";
import { GenreFilter } from "./GenreFilter";
import { PlatformFilter } from "./PlatformFilter";
import ReviewComponent from "./ReviewComponent";
import styles from './ReviewListStyle';
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchReviews } from "../../All/api/ReviewApi"; // ★ 이 부분만 경로 맞춰주세요!

const ReviewList = ({ navigation, route }) => {
    // 상태 선언
    const [sort, setSort] = useState('latest');
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedGenres, setSelectedGenres] = useState(new Set());
    const [selectedPlatforms, setSelectedPlatforms] = useState(new Set());
    const [show, setShow] = useState(true);
    const [searchText, setSearchText] = useState('');

    // 작품명 자동입력 (검색어 세팅)
    useEffect(() => {
        if (route?.params?.initialKeyword) {
            setSearchText(route.params.initialKeyword);
        }
    }, [route?.params?.initialKeyword]);

    // 필터 애니메이션
    const Anim = useRef(new Animated.Value(1)).current;
    const isAnimatingRef = useRef(false);

    const AnimHeight = Anim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 170]
    });

    // 필터 show/hide
    const shown = () => {
        Animated.timing(Anim, {
            toValue: 1,
            duration: 300,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
        }).start();
    };
    const unShown = () => {
        Animated.timing(Anim, {
            toValue: 0,
            duration: 300,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
        }).start();
    };

    // 장르/플랫폼 필터 토글
    const toggleGenre = (genre) => {
        const newSelected = new Set(selectedGenres);
        newSelected.has(genre) ? newSelected.delete(genre) : newSelected.add(genre);
        setSelectedGenres(newSelected);
    };
    const togglePlatform = (platform) => {
        const newSelected = new Set(selectedPlatforms);
        newSelected.has(platform) ? newSelected.delete(platform) : newSelected.add(platform);
        setSelectedPlatforms(newSelected);
    };

    // 1) 검색 + 2) 정렬을 useMemo로 최적화
    const filteredReviews = useMemo(() => {
        let searched = reviews;
        if (searchText.trim()) {
            const searchLower = searchText.toLowerCase();
            searched = reviews.filter(review =>
                (review.title?.toLowerCase().includes(searchLower)) ||
                (review.content?.toLowerCase().includes(searchLower)) ||
                (review.selectMovie?.title?.toLowerCase().includes(searchLower)) ||
                (review.userData?.nickname?.toLowerCase().includes(searchLower))      // ★ 이 부분!
            );
        }
        if (searched.length <= 1) return searched;
        if (sort === 'latest') {
            return [...searched].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (sort === 'popular') {
            return [...searched].sort((a, b) => (b.liked || 0) - (a.liked || 0));
        } else if (sort === 'rating') {
            return [...searched].sort((a, b) => (b.rating || 0) - (a.rating || 0));
        }
        return searched;
    }, [reviews, searchText, sort]);

    // 리뷰 데이터 fetch (페이지 접근시 or focus시마다)
    useFocusEffect(
        useCallback(() => {
            setLoading(true);
            (async () => {
                try {
                    const data = await fetchReviews(); // 🔥 API 함수 사용
                    setReviews(data);
                } catch (error) {
                    console.log('리뷰 불러오기 실패:', error);
                } finally {
                    setLoading(false);
                }
            })();
        }, [navigation])
    );

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <View style={styles.container}>
                {/* 검색창 */}
                <View style={styles.searchContainer}>
                    <View style={styles.searchInputContainer}>
                        <Text style={styles.searchIcon}>🔍</Text>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="작품명, 제목, 내용, 작성자 검색"
                            placeholderTextColor="#999"
                            value={searchText}
                            onChangeText={setSearchText}
                            returnKeyType="search"
                        />
                        {searchText.length > 0 && (
                            <TouchableOpacity
                                style={styles.clearButton}
                                onPress={() => setSearchText('')}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.clearIcon}>✕</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                {/* 필터 (장르/플랫폼) */}
                <Animated.View style={[styles.filterContainer, { height: AnimHeight, opacity: Anim }]}>
                    <GenreFilter selectedGenres={selectedGenres} onToggle={toggleGenre} />
                    <PlatformFilter selectedPlatforms={selectedPlatforms} onToggle={togglePlatform} />
                </Animated.View>

                {/* 총개수 및 정렬 */}
                <View style={styles.infoContainer}>
                    <Text style={styles.totalCountText}>
                        {searchText.trim() ? `검색결과 ${filteredReviews.length}개` : `전체 ${reviews.length}개`}
                    </Text>
                    {/* 필터 토글 버튼 */}
                    <View style={styles.toggleContainer}>
                        <TouchableOpacity
                            style={styles.toggleButton}
                            onPress={() => {
                                if (show) {
                                    setShow(false);
                                    unShown();
                                } else {
                                    setShow(true);
                                    shown();
                                }
                            }}
                            activeOpacity={0.7}
                        >
                            <View style={[styles.iconContainer, show && styles.iconRotated]}>
                                <Text style={styles.toggleIcon}>⏬</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {/* 정렬 피커 */}
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={sort}
                            onValueChange={(item) => setSort(item)}
                            style={styles.picker}
                            dropdownIconColor="#666"
                        >
                            <Picker.Item label="최신순" value="latest" />
                            <Picker.Item label="평점순" value="rating" />
                        </Picker>
                    </View>
                </View>

                {/* 리뷰 카드 리스트 */}
                {loading ? (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 }}>
                        <ActivityIndicator size="large" color="#666" />
                        <Text style={{ marginTop: 12 }}>로딩 중...</Text>
                    </View>
                ) : (
                    <ScrollView
                        style={styles.scrollView}
                        contentContainerStyle={styles.dataContainer}
                        showsVerticalScrollIndicator={false}
                        scrollEventThrottle={100}
                        onScroll={(event) => {
                            const offsetY = event.nativeEvent.contentOffset.y;
                            if (isAnimatingRef.current) return;
                            if (offsetY > 120 && show) {
                                isAnimatingRef.current = true;
                                setShow(false);
                                unShown();
                                setTimeout(() => isAnimatingRef.current = false, 300);
                            } else if (offsetY <= 30 && !show) {
                                isAnimatingRef.current = true;
                                setShow(true);
                                shown();
                                setTimeout(() => isAnimatingRef.current = false, 300);
                            }
                        }}
                    >
                        {filteredReviews.length === 0 ? (
                            <View style={{ alignItems: 'center', padding: 40 }}>
                                <Text style={{ color: '#888', fontSize: 16 }}>
                                    {searchText.trim() ? '검색 결과가 없습니다.' : '등록된 리뷰가 없습니다.'}
                                </Text>
                            </View>
                        ) : (
                            filteredReviews.map((item) => (
                                <View key={item.reviewId} style={styles.reviewItemContainer}>
                                    <ReviewComponent
                                        review={item}
                                        navigation={navigation}
                                        onPress={() => navigation.navigate('ReviewDetail', { review: item })}
                                    />
                                </View>
                            ))
                        )}
                    </ScrollView>
                )}

                {/* 플로팅 리뷰쓰기 버튼 */}
                <TouchableOpacity
                    style={styles.floatingButton}
                    onPress={() => navigation.navigate('ReviewWrite')}
                    activeOpacity={0.8}
                >
                    <Text style={styles.floatingButtonIcon}>✏️</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default ReviewList;
