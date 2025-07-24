import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useAnimatedValue, Animated, Easing } from "react-native";
import { Picker } from '@react-native-picker/picker';
import Header from '../Heo/components/Header'
import { ReviewComponent } from "./component/ReviewComponent";
import { useEffect, useRef, useState } from "react";

const ReviewList = ({ navigation }) => {
    // 정렬상태값
    const [sort, setSort] = useState('latest');
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
            duration : 150,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver : false,
        }).start();
    }

    const unShown = () => {
        Animated.timing(Anim,{
            toValue:0,
            duration:150,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver:false,
        }).start();
    }

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
            <Header />
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
                        <Text style={styles.toggleText}>
                            {show ? '필터 숨기기' : '필터 보기'}
                        </Text>
                        <View style={[styles.iconContainer, show && styles.iconRotated]}>
                            <Text style={styles.toggleIcon}>⏬</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* 총개수 및 정렬 필터 */}
                <View style={styles.infoContainer}>
                    <Text style={styles.totalCountText}>전체 24개</Text>
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
                    onScroll={(event)=>{
                        const offsetY = event.nativeEvent.contentOffset.y;
                        if(offsetY > 50 && show){
                            setShow(false);
                            unShown();
                        }else if(offsetY <= 50 && !show){
                            setShow(true);
                            shown();
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
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
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
        paddingVertical: 8,
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