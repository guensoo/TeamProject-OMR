import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Easing } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { ReviewComponent } from "./component/ReviewComponent";
import { useEffect, useRef, useState } from "react";

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
        Animated.timing(Anim,{
            toValue :1,
            duration : 300,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver : false,
        }).start();
    }

    const unShown = () => {
        Animated.timing(Anim,{
            toValue:0,
            duration:300,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver:false,
        }).start();
    }

    const isAnimatingRef = useRef(false);

    const AnimHeight = Anim.interpolate({
        inputRange :[0,1],
        outputRange:[0,170]
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
                        onPress={()=>{navigation.goBack()}}
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
                            onPress={()=>{navigation.navigate('Support')}}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.actionIcon}>🛠</Text>
                            <Text style={styles.actionText}>고객센터</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={[styles.actionButton, styles.writeButton]}
                            onPress={()=>{navigation.navigate('ReviewWrite')}}
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
                <Animated.View style={[styles.filterContainer,{height:AnimHeight, opacity:Anim}]}>
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
                    onScroll={(event)=>{
                        const offsetY = event.nativeEvent.contentOffset.y;
                        
                        if(isAnimatingRef.current) return;

                        if(offsetY > 120 && show){
                            isAnimatingRef.current = true;
                            setShow(false);
                            unShown();
                            setTimeout(() => isAnimatingRef.current = false, 300);
                        }else if(offsetY <= 30 && !show){
                            isAnimatingRef.current = true;
                            setShow(true);
                            shown();
                            setTimeout(() => isAnimatingRef.current = false, 300);
                        }
                    }}
                >
                    <ReviewComponent />
                    <ReviewComponent />
                    <ReviewComponent />
                    <ReviewComponent />
                    <ReviewComponent />
                    <ReviewComponent />
                </ScrollView>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    // 향상된 헤더 스타일
    header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        zIndex: 1000,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        minHeight: 60,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F8F9FA',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E9ECEF',
    },
    backIcon: {
        fontSize: 20,
        color: '#495057',
        fontWeight: 'bold',
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#212529',
        letterSpacing: -0.5,
    },
    titleUnderline: {
        width: 30,
        height: 3,
        backgroundColor: '#007AFF',
        borderRadius: 2,
        marginTop: 4,
    },
    actionButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#F8F9FA',
        borderWidth: 1,
        borderColor: '#DEE2E6',
        minWidth: 80,
        justifyContent: 'center',
    },
    writeButton: {
        backgroundColor: '#007AFF',
        borderColor: '#007AFF',
    },
    actionIcon: {
        fontSize: 14,
        marginRight: 4,
    },
    actionText: {
        fontSize: 12,
        color: '#6C757D',
        fontWeight: '600',
    },
    writeIcon: {
        fontSize: 14,
        marginRight: 4,
    },
    writeText: {
        fontSize: 12,
        color: '#FFFFFF',
        fontWeight: '600',
    },
    headerGradient: {
        height: 1,
        backgroundColor: '#E9ECEF',
    },
    // 기존 스타일들 유지
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    filterContainer: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingVertical: 5,
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    filterSection: {
        marginBottom: 16,
    },
    filterLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: '#2C3E50',
        marginBottom: 12,
    },
    filterScrollContent: {
        paddingRight: 16,
    },
    filterButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E1E8ED',
        backgroundColor: '#FFFFFF',
        marginRight: 8,
        minWidth: 60,
        alignItems: 'center',
    },
    filterButtonActive: {
        backgroundColor: '#3498DB',
        borderColor: '#3498DB',
    },
    filterButtonText: {
        fontSize: 14,
        color: '#657786',
        fontWeight: '500',
    },
    filterButtonTextActive: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
    toggleContainer: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        marginBottom: 8,
    },
    toggleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#F8F9FA',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#E1E8ED',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    toggleText: {
        fontSize: 14,
        color: '#2C3E50',
        fontWeight: '500',
        marginRight: 8,
    },
    iconContainer: {
        transform: [{ rotate: '0deg' }],
    },
    iconRotated: {
        transform: [{ rotate: '180deg' }],
    },
    toggleIcon: {
        fontSize: 16,
        color: '#3498DB',
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#FFFFFF',
        marginBottom: 8,
    },
    totalCountText: {
        fontSize: 16,
        color: '#2C3E50',
        fontWeight: '600',
    },
    pickerContainer: {
        backgroundColor: '#F8F9FA',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E1E8ED',
        overflow: 'hidden',
        minWidth: 130,  
    },
    picker: {
        height: 50,
        color: '#2C3E50',
    },
    scrollView: {
        flex: 1,
    },
    dataContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 20,
    }
})

export default ReviewList;