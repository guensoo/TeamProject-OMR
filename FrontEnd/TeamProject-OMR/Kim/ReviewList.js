import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Easing } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { ReviewComponent } from "./component/ReviewComponent";
import { useEffect, useRef, useState } from "react";

import styles from './ReviewListStyle';

const ReviewList = ({ navigation }) => {
    // 정렬상태값
    const [sort, setSort] = useState('latest');
    // 불러온 리뷰리스트
    const [review, setRview] = useState([]);

    // 필터 상태값
    const [selectedGenres, setSelectedGenres] = useState(new Set());
    const [selectedPlatforms, setSelectedPlatforms] = useState(new Set());
    const [show, setShow] = useState(true);

    // 데이터 fetch로 가져오기
    useEffect(() => {
        // 여기에 데이터 fetching 로직
    }, [])

    // 필터 애니메이션
    const Anim = useRef(new Animated.Value(1)).current;

    const shown = () => {
        Animated.timing(Anim, {
            toValue: 1,
            duration: 300,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
        }).start();
    }

    const unShown = () => {
        Animated.timing(Anim, {
            toValue: 0,
            duration: 300,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
        }).start();
    }

    const isAnimatingRef = useRef(false);

    const AnimHeight = Anim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 170]
    })

    // 장르 필터 토글
    const toggleGenre = (genre) => {
        const newSelected = new Set(selectedGenres);
        if (newSelected.has(genre)) {
            newSelected.delete(genre);
        } else {
            newSelected.add(genre);
        }
        setSelectedGenres(newSelected);
    }

    // 플랫폼 필터 토글
    const togglePlatform = (platform) => {
        const newSelected = new Set(selectedPlatforms);
        if (newSelected.has(platform)) {
            newSelected.delete(platform);
        } else {
            newSelected.add(platform);
        }
        setSelectedPlatforms(newSelected);
    }

    return (
        <>
            {/* 향상된 헤더 */}
            <View style={styles.header}>
                <View style={styles.headerContainer}>
                    {/* 왼쪽: 뒤로가기 */}
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => { navigation.goBack() }}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.backIcon}>◀</Text>
                    </TouchableOpacity>

                    {/* 중간: 제목 */}
                    <View style={styles.titleContainer}>
                        <Text style={styles.headerTitle}>리뷰</Text>
                        <View style={styles.titleUnderline} />
                    </View>

                    {/* 오른쪽: 액션 버튼들 */}
                    <View style={styles.actionButtons}>
                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={() => { navigation.navigate('Support') }}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.actionIcon}>🛠</Text>
                            <Text style={styles.actionText}>고객센터</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.actionButton, styles.writeButton]}
                            onPress={() => { navigation.navigate('ReviewWrite') }}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.writeIcon}>✏️</Text>
                            <Text style={styles.writeText}>리뷰쓰기</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* 헤더 하단 그라데이션 */}
                <View style={styles.headerGradient} />
            </View>

            <View style={styles.container}>
                {/* 리뷰필터 */}
                <Animated.View style={[styles.filterContainer, { height: AnimHeight, opacity: Anim }]}>
                    {/* 장르필터 */}
                    <View style={styles.filterSection}>
                        <Text style={styles.filterLabel}>장르</Text>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.filterScrollContent}
                        >
                            {['액션', '멜로', '공포', '코미디', 'SF', '스릴러'].map((genre) => (
                                <TouchableOpacity
                                    key={genre}
                                    style={[
                                        styles.filterButton,
                                        selectedGenres.has(genre) && styles.filterButtonActive
                                    ]}
                                    onPress={() => toggleGenre(genre)}
                                >
                                    <Text style={[
                                        styles.filterButtonText,
                                        selectedGenres.has(genre) && styles.filterButtonTextActive
                                    ]}>
                                        {genre}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    {/* 플랫폼 필터 */}
                    <View style={styles.filterSection}>
                        <Text style={styles.filterLabel}>플랫폼</Text>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.filterScrollContent}
                        >
                            {['Netflix', 'Disney+', 'Coupang Play', 'Wavve', 'Tving'].map((platform) => (
                                <TouchableOpacity
                                    key={platform}
                                    style={[
                                        styles.filterButton,
                                        selectedPlatforms.has(platform) && styles.filterButtonActive
                                    ]}
                                    onPress={() => togglePlatform(platform)}
                                >
                                    <Text style={[
                                        styles.filterButtonText,
                                        selectedPlatforms.has(platform) && styles.filterButtonTextActive
                                    ]}>
                                        {platform}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </Animated.View>



                {/* 총개수 및 정렬 필터 */}
                <View style={styles.infoContainer}>
                    <Text style={styles.totalCountText}>전체 24개</Text>

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
                            {/* <Text style={styles.toggleText}>
                                {show ? '필터 숨기기' : '필터 보기'}
                            </Text> */}
                            <View style={[styles.iconContainer, show && styles.iconRotated]}>
                                <Text style={styles.toggleIcon}>⏬</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={sort}
                            onValueChange={(item) => setSort(item)}
                            style={styles.picker}
                            dropdownIconColor="#666"
                        >
                            <Picker.Item label="최신순" value="latest" />
                            <Picker.Item label="인기순" value='popular' />
                            <Picker.Item label="평점순" value='rating' />
                        </Picker>
                    </View>
                </View>

                {/* 리뷰 카드 리스트 */}
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
                    <ReviewComponent />
                </ScrollView>
            </View>
        </>
    )
}

export default ReviewList;