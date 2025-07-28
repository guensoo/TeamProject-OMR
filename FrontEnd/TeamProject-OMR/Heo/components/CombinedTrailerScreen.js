import { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import Trailer from "./Trailer";
import TrailerModal from "./TrailerModal";
import { getAllOTTPopularWithTrailer } from "../../All/api/tmdb";
import { getBoxOfficeWithPostersAndTrailer } from "../../All/api/kofic";

const CombinedTrailerScreen = () => {
    const [ottData, setOttData] = useState(null);
    const [boxOfficeData, setBoxOfficeData] = useState(null);
    const [showOtt, setShowOtt] = useState(null); // true면 OTT, false면 박스오피스
    const [loading, setLoading] = useState(true);

    // 예고편 모달 상태 및 현재 재생 중인 영상 키
    const [modalVisible, setModalVisible] = useState(false);
    const [currentTrailerKey, setCurrentTrailerKey] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            // 1. OTT 인기작 불러오기
            const ottResult = await getAllOTTPopularWithTrailer();

            // 2. 박스오피스 인기작 불러오기 (어제 날짜 예시)
            const today = new Date();
            const y = today.getFullYear();
            const m = String(today.getMonth() + 1).padStart(2, "0");
            const d = String(today.getDate() - 1).padStart(2, "0");
            const targetDate = `${y}${m}${d}`;

            const boxOfficeResult = await getBoxOfficeWithPostersAndTrailer(targetDate, { type: "daily" });

            setOttData(ottResult);
            setBoxOfficeData(boxOfficeResult);

            // 3. 랜덤으로 OTT(true) 또는 박스오피스(false) 선택
            setShowOtt(Math.random() < 0.5);

            setLoading(false);
        }
        fetchData();
    }, [])

    if (loading) return <ActivityIndicator size='large' style={{ flex: 1, justifyContent: "center" }} />

    const ottList = ottData ? Object.values(ottData).flat() : [];

    const dataToShow = showOtt ? ottList : boxOfficeData;

    // 예고편 재생 핸들러
    const handlePlay = (trailerKey) => {
        if (trailerKey) {
            setCurrentTrailerKey(trailerKey);
            setModalVisible(true);
        } else {
            alert("예고편이 없습니다.");
        }
    };

    // 모달 닫기 핸들러
    const handleClose = () => {
        setModalVisible(false);
        setCurrentTrailerKey(null);
    };

    return (
        <View style={{ flex: 1 }}>
            <Trailer
                data={dataToShow}
                onPlay={handlePlay}
            />

            <TrailerModal
                visible={modalVisible}
                videoId={currentTrailerKey}
                onClose={handleClose}
                playerWidth={SCREEN_WIDTH}
                playerHeight={300}
            />
        </View>
    )
}

export default CombinedTrailerScreen;