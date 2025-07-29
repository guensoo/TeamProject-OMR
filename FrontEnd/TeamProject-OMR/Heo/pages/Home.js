import { Text, StyleSheet, ScrollView, StatusBar, Dimensions, TouchableOpacity, View, Platform } from "react-native"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { SafeAreaView } from "react-native-safe-area-context"
import { useEffect, useState } from "react"
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

const Home = () => {
    const navigation = useNavigation();

    // const [allTrailers, setAllTrailers] = useState([]);
    // const [ottTrailers, setOttTrailers] = useState([]);
    // const [boxOfficeTrailers, setBoxOfficeTrailers] = useState([]);
    const [selectedTrailerData, setSelectedTrailerData] = useState([]);
    const [allPosters, setAllPosters] = useState([]);

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTrailer, setSelectedTrailer] = useState(null);
    const [selectedProvider, setSelectedProvider] = useState(firstProvider);

    //예고편
    useEffect(() => {
        const fetchData = async () => {
            // const data = await getAllOTTPopularWithTrailer();
            // const allMovies = Object.values(data).flat();
            // setAllTrailers(allMovies);
            const ottData = await getAllOTTPopularWithTrailer();

            const today = new Date();
            const y = today.getFullYear();
            const m = String(today.getMonth() + 1).padStart(2, "0");
            const d = String(today.getDate() - 1).padStart(2, "0");
            const targetDate = `${y}${m}${d}`;

            const boxOfficeData = await getBoxOfficeWithPostersAndTrailer(targetDate, { type: "daily" });

            const flatOtt = Object.values(ottData).flat();
            // setOttTrailers(flatOtt);
            // setBoxOfficeTrailers(boxOfficeData);

            // 랜덤으로 OTT 또는 BoxOffice 중 하나 선택
            const shouldShowOTT = Math.random() < 0.5;
            setSelectedTrailerData(shouldShowOTT ? flatOtt : boxOfficeData);
        }
        fetchData();
    }, [])

    //인기작 포스터
    useEffect(() => {
        const fetchPosters = async () => {
            const data = await getAllOTTPopular();
            const allMovies = Object.values(data).flat();
            setAllPosters(allMovies);
        };
        fetchPosters();
    }, []);

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

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <StatusBar
                backgroundColor="transparent"
                translucent
                barStyle="dark-content"
            />
            {/* <Header /> */}

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* 1️⃣ 상단 메인 트레일러(예고편) */}
                {/* <Trailer data={allTrailers} onPlay={handlePlay} /> */}
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

                        <View style={styles.popularHeader}>
                            <Text style={styles.popularTitle}>리뷰 인기순</Text>
                            <TouchableOpacity onPress={() => navigation.navigate("ReviewList")}>
                                <Text style={styles.seeAllText}>전체보기</Text>
                            </TouchableOpacity>
                        </View>
                        <Main_OTTList
                            data={allPosters}
                            provider={selectedProvider}
                        />
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
})

export default Home;