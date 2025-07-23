import { View, Text, StyleSheet, ScrollView, StatusBar, FlatList, Dimensions, Image, TouchableOpacity, Modal } from "react-native"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { SafeAreaView } from "react-native-safe-area-context"
import { useEffect, useState } from "react"
import { getMoviePopularWithTrailer, getAllOTTPopularWithTrailer } from "../../All/api/tmdb"
import YoutubePlayer from "react-native-youtube-iframe"
import { Ionicons } from '@expo/vector-icons';
import ProviderInfo from "../utils/ProviderInfo"
import Trailer from "../components/Trailer"
import Main_OTTList from "../components/Main_OTTList"
import TrailerModal from "../components/TrailerModal"
import OTTSelector from "../utils/OTTSelector"

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const Home = () => {
    const [allTrailers, setAllTrailers] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTrailer, setSelectedTrailer] = useState(null);
    const [selectedProvider, setSelectedProvider] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllOTTPopularWithTrailer();
            const allMovies = Object.values(data).flat();
            setAllTrailers(allMovies);
        }
        fetchData();
    }, [])

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
        <SafeAreaView style={styles.container}>
            <StatusBar
                backgroundColor="transparent"
                translucent
                barStyle="dark-content"
            />
            <Header />

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* 1️⃣ 상단 메인 트레일러(예고편) */}
                <Trailer data={allTrailers} onPlay={handlePlay} />

                {/* 2️⃣ OTT 선택 버튼 */}
                <OTTSelector
                    selectedProvider={selectedProvider}
                    onSelectProvider={setSelectedProvider}
                />

                {/* 3️⃣ 선택한 OTT별 인기작 리스트 */}
                {selectedProvider && (
                    <>
                        <Text style={styles.popularTitle}>인기작</Text>
                        <Main_OTTList
                            data={allTrailers}
                            provider={selectedProvider}
                        />
                    </>
                )}
            </ScrollView>

            <Footer />

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
    popularTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 16,
        marginVertical: 10,
    },
})

export default Home;