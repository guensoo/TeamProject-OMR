import { Text, StyleSheet, ScrollView, StatusBar, Dimensions, TouchableOpacity, View, Platform, ActivityIndicator, Animated } from "react-native"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { SafeAreaView } from "react-native-safe-area-context"
import { useEffect, useState, useRef } from "react"
import { getAllOTTPopular, getAllOTTPopularWithTrailer } from "../../All/api/tmdb"
import { getBoxOfficeWithPostersAndTrailer } from "../../All/api/kofic"
import Trailer from "../components/Trailer"
import Main_OTTList from "../components/Main_OTTList"
import TrailerModal from "../components/TrailerModal"
import OTTSelector from "../utils/OTTSelector"
import ProviderInfo from "../utils/ProviderInfo"
import { useNavigation } from "@react-navigation/native"

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const firstProvider = Object.keys(ProviderInfo)[0]; //인기작 Netflix 버튼

// 세련된 로딩 스피너 컴포넌트
const LoadingSpinner = () => {
    const spinValue = useRef(new Animated.Value(0)).current;
    const scaleValue = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {
        // 회전 애니메이션
        const spinAnimation = Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            })
        );

        // 크기 변화 애니메이션
        const scaleAnimation = Animated.loop(
            Animated.sequence([
                Animated.timing(scaleValue, {
                    toValue: 1.2,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleValue, {
                    toValue: 0.8,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ])
        );

        spinAnimation.start();
        scaleAnimation.start();

        return () => {
            spinAnimation.stop();
            scaleAnimation.stop();
        };
    }, []);

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.loadingContainer}>
            <View style={styles.loadingBackground}>
                <Animated.View
                    style={[
                        styles.spinnerContainer,
                        {
                            transform: [
                                { rotate: spin },
                                { scale: scaleValue }
                            ],
                        },
                    ]}
                >
                    {/* 외부 링 */}
                    <View style={styles.outerRing} />
                    {/* 내부 링 */}
                    <View style={styles.innerRing} />
                    {/* 중앙 점 */}
                    <View style={styles.centerDot} />
                </Animated.View>
                <Text style={styles.loadingText}>예고편을 불러오는 중...</Text>
                <View style={styles.loadingDots}>
                    <ActivityIndicator size="small" color="#007bff" />
                </View>
            </View>
        </View>
    );
};

const Home = () => {
    const navigation = useNavigation();

    const [selectedTrailerData, setSelectedTrailerData] = useState([]);
    const [allPosters, setAllPosters] = useState([]);
    const [isLoadingTrailers, setIsLoadingTrailers] = useState(true); // 로딩 상태 추가

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTrailer, setSelectedTrailer] = useState(null);
    const [selectedProvider, setSelectedProvider] = useState(firstProvider);

    //예고편
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoadingTrailers(true); // 로딩 시작

                const ottData = await getAllOTTPopularWithTrailer();

                const today = new Date();
                const y = today.getFullYear();
                const m = String(today.getMonth() + 1).padStart(2, "0");
                const d = String(today.getDate() - 1).padStart(2, "0");
                const targetDate = `${y}${m}${d}`;

                const boxOfficeData = await getBoxOfficeWithPostersAndTrailer(targetDate, { type: "daily" });

                const flatOtt = Object.values(ottData).flat();

                // 랜덤으로 OTT 또는 BoxOffice 중 하나 선택
                const shouldShowOTT = Math.random() < 0.5;
                setSelectedTrailerData(shouldShowOTT ? flatOtt : boxOfficeData);
            } catch (error) {
                console.error('예고편 데이터 로딩 실패:', error);
            } finally {
                console.log('[DEBUG] setIsLoadingTrailers(false) 호출!');
                setIsLoadingTrailers(false); // 로딩 완료
            }
        }
        fetchData();
    }, [])

    // //인기작 포스터
    // useEffect(() => {
    //     const fetchPosters = async () => {
    //         const data = await getAllOTTPopular();
    //         const allMovies = Object.values(data).flat();
    //         setAllPosters(allMovies);
    //     };
    //     fetchPosters();
    // }, []);
    useEffect(() => {
        const fetchAllPopular = async () => {
            const ottData = await getAllOTTPopular();
            const allOTT = Object.values(ottData).flat().map(item => ({
                ...item,
                type: 'ott',
            }));

            const today = new Date().toISOString().split('T')[0].replace(/-/g, ''); // YYYYMMDD
            const movieData = await getBoxOfficeWithPostersAndTrailer(today);
            const allMovies = movieData.map(item => ({
                ...item,
                provider: '영화',  // 👉 provider 없을 수 있으니 명시적으로
                type: 'movie',
            }));

            const combined = [...allOTT, ...allMovies];

            // console.log("OTT sample data:", allOTT.slice(0, 10));
            // console.log("Movie sample data:", allMovies.slice(0, 10));
            // console.log("Combined sample data:", combined.slice(0, 10));

            // 🔽 정렬: TMDB 인기순(popularity), 또는 rank 기반 정렬
            const sorted = combined.sort((a, b) => {
                if (a.rank && b.rank) {
                    return Number(a.rank) - Number(b.rank); // 박스오피스 기준
                }
                if (a.popularity && b.popularity) {
                    return b.popularity - a.popularity; // TMDB 기준
                }
                return 0;
            });

            setAllPosters(sorted);
        };

        fetchAllPopular();
    }, []);

//     useEffect(() => {
//   console.log("allPosters 상태 변경됨:", allPosters.slice(0, 20));
// }, [allPosters]);

    const handlePlay = (trailerKey) => {
        setSelectedTrailer(trailerKey);
        setModalVisible(true);
    };

    const handleClose = () => {
        setSelectedTrailer(null);
        setModalVisible(false);
    };

    const playerWidth = SCREEN_WIDTH * 1;
    const playerHeight = (playerWidth * 9) / 16;

    // 로딩 중일 때 스피너 표시
    if (isLoadingTrailers) {
        return (
            <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
                <StatusBar
                    backgroundColor="transparent"
                    translucent
                    barStyle="dark-content"
                />
                <LoadingSpinner />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container} edges={['left', 'right']}>
            <StatusBar
                backgroundColor="transparent"
                translucent
                barStyle="dark-content"
            />

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* 1️⃣ 상단 메인 트레일러(예고편) */}
                <Trailer data={selectedTrailerData} onPlay={handlePlay} />

                {/* 2️⃣ OTT 선택 버튼 */}
                <>
                    <Text style={styles.allTitle}>카테고리 선택</Text>
                    <OTTSelector />
                </>

                {/* 3️⃣ 선택한 OTT별 인기작 리스트 */}
                {selectedProvider && (
                    <>
                        <View style={styles.popularHeader}>
                            <Text style={styles.popularTitle}>전체 인기순</Text>
                            <TouchableOpacity onPress={() => navigation.navigate("ReviewList")}>
                                <Text style={styles.seeAllText}>전체보기</Text>
                            </TouchableOpacity>
                        </View>
                        <Main_OTTList
                            data={allPosters}
                            provider={selectedProvider}
                        />

                        {/* <View style={styles.popularHeader}>
                            <Text style={styles.popularTitle}>리뷰 인기순</Text>
                            <TouchableOpacity onPress={() => navigation.navigate("ReviewList")}>
                                <Text style={styles.seeAllText}>전체보기</Text>
                            </TouchableOpacity>
                        </View>
                        <Main_OTTList
                            data={allPosters}
                            provider={selectedProvider}
                        /> */}
                    </>
                )}

                <Footer />
            </ScrollView>

            {/* 포스터에서 재생버튼 눌렀을 때 나오는 영상 모달창 */}
            <TrailerModal
                visible={modalVisible}
                onClose={handleClose}
                videoId={selectedTrailer}
                playerWidth={playerWidth}
                playerHeight={playerHeight}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    allTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 16,
        marginTop: 16,
    },
    popularHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    popularTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 16,
        marginVertical: 10,
    },
    seeAllText: {
        fontSize: 16,
        color: '#007bff',
        marginRight: 12,
    },
    // 로딩 스피너 스타일
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    loadingBackground: {
        backgroundColor: '#f8f9fa',
        borderRadius: 20,
        padding: 40,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    spinnerContainer: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    outerRing: {
        position: 'absolute',
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: '#007bff',
        borderTopColor: 'transparent',
    },
    innerRing: {
        position: 'absolute',
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#28a745',
        borderBottomColor: 'transparent',
    },
    centerDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#007bff',
    },
    loadingText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 15,
    },
    loadingDots: {
        marginTop: 10,
    },
})

export default Home;