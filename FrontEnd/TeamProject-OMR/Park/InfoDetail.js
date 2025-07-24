import { useEffect, useState } from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
    ScrollView, 
    ActivityIndicator, 
    Image, 
    TouchableOpacity,
    SafeAreaView,
    Dimensions,
    FlatList
} from "react-native";
import review_sample from '../assets/review_sample.jpg'; // ⭐️ 이미지 통일

const { width, height } = Dimensions.get('window');

// 샘플 데이터 (이미지 경로 모두 review_sample로 대체)
const sampleMovie = {
    id: 1,
    title: "쥬라기 월드",
    poster: review_sample, // ⭐️ 포스터
    releaseDate: "2015.06.11",
    runtime: "124분",
    genre: "액션, 어드벤처, SF",
    rating: "12세 관람가",
    director: "콜린 트레보로우",
    cast: ["크리스 프랫", "브라이스 달라스 하워드", "이르판 칸"],
    synopsis: "쥬라기 공원이 문을 닫은 지 22년 후, 새롭게 재단장한 쥬라기 월드가 개장한다. 더욱 스릴 넘치고 진화된 공룡들로 가득한 이곳에서 예상치 못한 사고가 발생하는데...",
    videos: [
        { id: 1, title: "공식 예고편", thumbnail: review_sample, duration: "2:30" },
        { id: 2, title: "메이킹 영상", thumbnail: review_sample, duration: "5:45" },
        { id: 3, title: "인터뷰", thumbnail: review_sample, duration: "3:20" },
    ],
    trailers: [
        { id: 1, title: "티저 예고편", thumbnail: review_sample, duration: "1:15" },
        { id: 2, title: "국제 예고편", thumbnail: review_sample, duration: "2:45" },
        { id: 3, title: "메인 예고편", thumbnail: review_sample, duration: "2:30" },
    ],
    photos: [
        review_sample,
        review_sample,
        review_sample,
        review_sample,
        review_sample,
    ],
    castAndCrew: [
        { name: "가렛 에드워즈", role: "감독", image: review_sample },
        { name: "스칼릿 조핸슨", role: "조라", image: review_sample },
        { name: "마하살라 알리", role: "단리", image: review_sample },
        { name: "조나단 베일리", role: "헨리 박사", image: review_sample },
        { name: "루퍼트 프렌드", role: "맥", image: review_sample },
    ],
    userStats: [
        { label: "남", percentage: 48.8, color: "#34495E" },
        { label: "여", percentage: 51.2, color: "#E91E63" }
    ],
    ageStats: [
        { age: "10대", percentage: 3.2 },
        { age: "20대", percentage: 20.8 },
        { age: "30대", percentage: 27.7 },
        { age: "40대", percentage: 27.4 },
        { age: "50대", percentage: 21.0 }
    ]
};

// PlaceholderImage → Image로 변경 (아래 VideoItem, PhotoItem, CastItem에서 바로 Image 사용)
const PlaceholderImage = ({ style, text = "이미지" }) => (
    <View style={[style, styles.placeholderContainer]}>
        <Text style={styles.placeholderText}>{text}</Text>
    </View>
);

const VideoItem = ({ item, onPress }) => (
    <TouchableOpacity style={styles.videoItem} onPress={() => onPress(item)}>
        <View style={styles.videoThumbnailContainer}>
            <Image source={item.thumbnail} style={styles.videoThumbnail} />
            <View style={styles.videoOverlay}>
                <View style={styles.playButton}>
                    <Text style={styles.playIcon}>▶</Text>
                </View>
                <View style={styles.durationContainer}>
                    <Text style={styles.videoDuration}>{item.duration}</Text>
                </View>
            </View>
        </View>
        <Text style={styles.videoTitle} numberOfLines={2}>{item.title}</Text>
    </TouchableOpacity>
);

const PhotoItem = ({ item, index, onPress }) => (
    <TouchableOpacity style={styles.photoItem} onPress={() => onPress(item, index)}>
        <Image source={item} style={styles.photoImage} />
    </TouchableOpacity>
);

const CastItem = ({ item }) => (
    <View style={styles.castItem}>
        {item.image ? (
            <Image source={item.image} style={styles.castImage} />
        ) : (
            <View style={styles.castImagePlaceholder}>
                <Text style={styles.castImageText}>사진준비중</Text>
            </View>
        )}
        <Text style={styles.castName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.castRole} numberOfLines={1}>({item.role})</Text>
    </View>
);

// 파이 차트 컴포넌트 (간단한 원형)
const PieChart = ({ data }) => (
    <View style={styles.pieChartContainer}>
        <View style={styles.pieChart}>
            <View style={[styles.pieHalf, { backgroundColor: data[0].color }]} />
            <View style={[styles.pieHalf, styles.pieHalfRight, { backgroundColor: data[1].color }]} />
        </View>
        <View style={styles.pieLegend}>
            {data.map((item, index) => (
                <View key={index} style={styles.legendItem}>
                    <View style={[styles.legendColor, { backgroundColor: item.color }]} />
                    <Text style={styles.legendText}>{item.label} {item.percentage}%</Text>
                </View>
            ))}
        </View>
    </View>
);

const InfoDetail = ({ route, navigation }) => {
    const { movieId } = route.params || { movieId: 1 };
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 실제로는 API 호출
        setTimeout(() => {
            setMovie(sampleMovie);
            setLoading(false);
        }, 500);
    }, [movieId]);

    const handleVideoPress = (video) => {
        console.log('비디오 재생:', video.title);
        // 비디오 재생 로직
    };

    const handlePhotoPress = (photo, index) => {
        console.log('포토 확대:', index);
        // 포토 확대 로직
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#FF6B6B" />
                <Text style={styles.loadingText}>영화 정보를 불러오는 중...</Text>
            </SafeAreaView>
        );
    }

    if (!movie) {
        return (
            <SafeAreaView style={styles.errorContainer}>
                <Text style={styles.errorText}>영화 정보를 찾을 수 없습니다.</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                
                {/* 포스터 섹션 (화면의 60%) */}
                <View style={styles.posterSection}>
                    <PlaceholderImage style={styles.posterImage} text="영화 포스터" />
                    <View style={styles.posterOverlay}>
                        <Text style={styles.movieTitle}>{movie.title}</Text>
                    </View>
                </View>

                {/* 영화 정보 섹션 */}
                <View style={styles.infoSection}>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>개봉</Text>
                        <Text style={styles.infoValue}>{movie.releaseDate}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>시간</Text>
                        <Text style={styles.infoValue}>{movie.runtime}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>장르</Text>
                        <Text style={styles.infoValue}>{movie.genre}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>등급</Text>
                        <Text style={styles.infoValue}>{movie.rating}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>감독</Text>
                        <Text style={styles.infoValue}>{movie.director}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>출연</Text>
                        <Text style={styles.infoValue}>{movie.cast.join(', ')}</Text>
                    </View>
                </View>

                {/* 시놉시스 */}
                <View style={styles.synopsisSection}>
                    <Text style={styles.sectionTitle}>줄거리</Text>
                    <Text style={styles.synopsisText}>{movie.synopsis}</Text>
                </View>

                {/* 비디오 섹션 */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>비디오</Text>
                    <FlatList
                        data={movie.videos}
                        renderItem={({ item }) => <VideoItem item={item} onPress={handleVideoPress} />}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.horizontalList}
                    />
                </View>

                {/* 트레일러 섹션 */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>트레일러</Text>
                    <FlatList
                        data={movie.trailers}
                        renderItem={({ item }) => <VideoItem item={item} onPress={handleVideoPress} />}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.horizontalList}
                    />
                </View>

                {/* 포토 섹션 */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>포토</Text>
                    <FlatList
                        data={movie.photos}
                        renderItem={({ item, index }) => <PhotoItem item={item} index={index} onPress={handlePhotoPress} />}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.horizontalList}
                    />
                </View>

                {/* 감독과 배우 섹션 */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>감독과 배우</Text>
                    <FlatList
                        data={movie.castAndCrew}
                        renderItem={({ item }) => <CastItem item={item} />}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.horizontalList}
                    />
                </View>

                {/* 성별 예매 분포 */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>성별 예매 분포</Text>
                    <PieChart data={movie.userStats} />
                </View>

                {/* 연령별 예매 분포 */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>연령별 예매 분포</Text>
                    <View style={styles.barChartContainer}>
                        {movie.ageStats.map((stat, index) => (
                            <View key={index} style={styles.barItem}>
                                <View 
                                    style={[
                                        styles.bar, 
                                        { height: Math.max(stat.percentage * 2.5, 10) } // 최소 높이 보장
                                    ]} 
                                />
                                <Text style={styles.barValue}>{stat.percentage}</Text>
                                <Text style={styles.barLabel}>{stat.age}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.bottomPadding} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    scrollView: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: "#666",
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
    },
    errorText: {
        fontSize: 18,
        color: "#666",
    },

    // 플레이스홀더 이미지
    placeholderContainer: {
        backgroundColor: '#E9ECEF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        color: '#6C757D',
        fontSize: 14,
        fontWeight: '500',
    },

    // 포스터 섹션
    posterSection: {
        height: height * 0.6,
        position: 'relative',
    },
    posterImage: {
        width: '100%',
        height: '100%',
    },
    posterOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 100,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    movieTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#FFFFFF',
    },

    // 정보 섹션
    infoSection: {
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    infoLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
        width: 60,
        marginRight: 12,
    },
    infoValue: {
        fontSize: 16,
        color: '#1A1A1A',
        flex: 1,
        lineHeight: 22,
    },

    // 시놉시스 섹션
    synopsisSection: {
        padding: 20,
        backgroundColor: '#F8F9FA',
    },
    synopsisText: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
        marginTop: 8,
    },

    // 공통 섹션
    section: {
        paddingVertical: 20,
        paddingLeft: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1A1A1A',
        marginBottom: 16,
    },
    horizontalList: {
        paddingRight: 20,
    },

    // 비디오/트레일러 아이템
    videoItem: {
        width: 200,
        marginRight: 16,
    },
    videoThumbnailContainer: {
        position: 'relative',
    },
    videoThumbnail: {
        width: 200,
        height: 120,
        borderRadius: 8,
    },
    videoOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    playButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    playIcon: {
        color: '#FFFFFF',
        fontSize: 20,
        marginLeft: 4,
    },
    durationContainer: {
        position: 'absolute',
        bottom: 8,
        right: 8,
        backgroundColor: 'rgba(0,0,0,0.7)',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    videoDuration: {
        color: '#FFFFFF',
        fontSize: 12,
    },
    videoTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
        marginTop: 8,
        lineHeight: 18,
    },

    // 포토 아이템
    photoItem: {
        marginRight: 12,
    },
    photoImage: {
        width: 150,
        height: 100,
        borderRadius: 8,
    },

    // 출연진 아이템
    castItem: {
        width: 80,
        alignItems: 'center',
        marginRight: 16,
    },
    castImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    castImagePlaceholder: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#E9ECEF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    castImageText: {
        fontSize: 10,
        color: '#666',
        textAlign: 'center',
    },
    castName: {
        fontSize: 12,
        fontWeight: '600',
        color: '#1A1A1A',
        marginTop: 8,
        textAlign: 'center',
    },
    castRole: {
        fontSize: 11,
        color: '#666',
        marginTop: 2,
        textAlign: 'center',
    },

    // 파이 차트
    pieChartContainer: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    pieChart: {
        width: 120,
        height: 120,
        borderRadius: 60,
        flexDirection: 'row',
        overflow: 'hidden',
        marginBottom: 20,
    },
    pieHalf: {
        width: 60,
        height: 120,
    },
    pieHalfRight: {
        width: 60,
        height: 120,
    },
    pieLegend: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    legendColor: {
        width: 16,
        height: 16,
        borderRadius: 8,
        marginRight: 8,
    },
    legendText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },

    // 막대 차트
    barChartContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        paddingHorizontal: 20,
        paddingVertical: 20,
        height: 140,
    },
    barItem: {
        alignItems: 'center',
        flex: 1,
    },
    bar: {
        width: 30,
        backgroundColor: '#FF6B6B',
        borderRadius: 4,
        marginBottom: 8,
    },
    barValue: {
        fontSize: 12,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    barLabel: {
        fontSize: 11,
        color: '#666',
    },

    bottomPadding: {
        height: 20,
    },
});

export default InfoDetail;