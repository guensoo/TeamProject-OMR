import React, { useEffect, useState } from "react";
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
    FlatList,
    TextInput
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import review_sample from '../assets/review_sample.jpg';

const { width, height } = Dimensions.get('window');

// 샘플 데이터
const sampleMovie = {
    id: 1,
    title: "쥬라기 월드",
    originalTitle: "Jurassic World",
    poster: review_sample,
    releaseDate: "2015.06.11",
    runtime: "124분",
    genre: "액션, 어드벤처, SF",
    rating: "12세 관람가",
    director: "콜린 트레보로우",
    cast: ["크리스 프랫", "브라이스 달라스 하워드", "이르판 칸"],
    synopsis: "쥬라기 공원이 문을 닫은 지 22년 후, 새롭게 재단장한 쥬라기 월드가 개장한다. 더욱 스릴 넘치고 진화된 공룡들로 가득한 이곳에서 예상치 못한 사고가 발생하는데...",
    netizensRating: 6.71,
    netizensTotal: 23000,
    expertsRating: 6.24,
    expertsTotal: 15,
    watchGrade: 7.55,
    
    ratingStats: [
        { stars: 10, percentage: 27, count: 6200 },
        { stars: 9, percentage: 28, count: 6440 },
        { stars: 8, percentage: 24, count: 5520 },
        { stars: 7, percentage: 9, count: 2070 },
        { stars: 6, percentage: 12, count: 2760 }
    ],
    
    reviews: [
        {
            id: 1,
            user: "네이버 사용자",
            rating: 2,
            content: "스케일과 조명은 나쁘지 않았는데 몇몇 연출이 아쉬웠다. 배우들이 바로 물 수중에...",
            date: "2015.6.11",
            likes: 175
        },
        {
            id: 2,
            user: "영화 마니아",
            rating: 8,
            content: "높은 제작 품질!대면 분 쪽보다 스크린갤거나 만날처럼한 더 힘들...",
            date: "2015.6.12",
            likes: 112
        }
    ],

    videos: [
        { id: 1, title: "공식 예고편", thumbnail: review_sample, duration: "2:30" },
        { id: 2, title: "메이킹 영상", thumbnail: review_sample, duration: "5:45" },
        { id: 3, title: "인터뷰", thumbnail: review_sample, duration: "3:20" },
    ],

    photos: [
        review_sample,
        review_sample,
        review_sample,
        review_sample,
        review_sample,
    ],

    castAndCrew: [
        { name: "콜린 트레보로우", role: "감독", image: review_sample },
        { name: "크리스 프랫", role: "오웬", image: review_sample },
        { name: "브라이스 달라스 하워드", role: "클레어", image: review_sample },
        { name: "이르판 칸", role: "마스라니", image: review_sample },
        { name: "빈센트 도노프리오", role: "호스킨스", image: review_sample },
    ]
};

// 별점 표시 컴포넌트
const StarRating = ({ rating, size = 16, showNumber = true }) => (
    <View style={styles.starContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
            <Ionicons
                key={star}
                name={star <= rating ? "star" : star - 0.5 <= rating ? "star-half" : "star-outline"}
                size={size}
                color="#FFD700"
            />
        ))}
        {showNumber && <Text style={styles.ratingNumber}>{rating}</Text>}
    </View>
);

// 평점 막대 차트
const RatingBar = ({ stars, percentage, count }) => (
    <View style={styles.ratingBarContainer}>
        <Text style={styles.ratingBarStars}>{stars}</Text>
        <View style={styles.ratingBarTrack}>
            <View style={[styles.ratingBarFill, { width: `${percentage}%` }]} />
        </View>
        <Text style={styles.ratingBarPercentage}>{percentage}%</Text>
    </View>
);

// 리뷰 아이템
const ReviewItem = ({ item }) => (
    <View style={styles.reviewItem}>
        <View style={styles.reviewHeader}>
            <View style={styles.reviewUserInfo}>
                <StarRating rating={item.rating} size={14} showNumber={false} />
                <Text style={styles.reviewUser}>{item.user}</Text>
                <Text style={styles.reviewDate}>{item.date}</Text>
            </View>
            <TouchableOpacity style={styles.reviewLikeBtn}>
                <Ionicons name="thumbs-up-outline" size={14} color="#666" />
                <Text style={styles.reviewLikes}>{item.likes}</Text>
            </TouchableOpacity>
        </View>
        <Text style={styles.reviewContent} numberOfLines={2}>{item.content}</Text>
    </View>
);

// 비디오 아이템
const VideoItem = ({ item, onPress }) => (
    <TouchableOpacity style={styles.videoItem} onPress={() => onPress(item)}>
        <View style={styles.videoThumbnailContainer}>
            <Image source={item.thumbnail} style={styles.videoThumbnail} resizeMode="cover" />
            <View style={styles.videoPlayOverlay}>
                <Ionicons name="play-circle" size={40} color="rgba(255,255,255,0.9)" />
            </View>
            <View style={styles.videoDurationBadge}>
                <Text style={styles.videoDuration}>{item.duration}</Text>
            </View>
        </View>
        <Text style={styles.videoTitle} numberOfLines={2}>{item.title}</Text>
    </TouchableOpacity>
);

// 포토 아이템
const PhotoItem = ({ item, index, onPress }) => (
    <TouchableOpacity style={styles.photoItem} onPress={() => onPress(item, index)}>
        <Image source={item} style={styles.photoImage} resizeMode="cover" />
    </TouchableOpacity>
);

// 출연진 아이템
const CastItem = ({ item }) => (
    <View style={styles.castItem}>
        <Image source={item.image} style={styles.castImage} resizeMode="cover" />
        <Text style={styles.castName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.castRole} numberOfLines={1}>{item.role}</Text>
    </View>
);

const InfoDetail = ({ route, navigation }) => {
    const { movieId } = route.params || { movieId: 1 };
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('info');
    const [userRating, setUserRating] = useState(0);
    const [userReview, setUserReview] = useState('');

    useEffect(() => {
        setTimeout(() => {
            setMovie(sampleMovie);
            setLoading(false);
        }, 500);
    }, [movieId]);

    const handleVideoPress = (video) => {
        console.log('비디오 재생:', video.title);
    };

    const handlePhotoPress = (photo, index) => {
        console.log('포토 확대:', index);
    };

    const handleRatingSubmit = () => {
        if (userRating > 0) {
            console.log('평점 제출:', userRating, userReview);
            setUserRating(0);
            setUserReview('');
        }
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#00D4AA" />
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
                
                {/* 메인 포스터 및 정보 섹션 */}
                <View style={styles.mainSection}>
                    <View style={styles.posterContainer}>
                        <Image source={movie.poster} style={styles.posterImage} resizeMode="cover" />
                        <View style={styles.posterBadge}>
                            <Text style={styles.ratingBadge}>{movie.rating}</Text>
                        </View>
                    </View>
                    
                    <View style={styles.movieInfoContainer}>
                        <Text style={styles.movieTitle}>{movie.title}</Text>
                        <Text style={styles.originalTitle}>{movie.originalTitle}</Text>
                        
                        <View style={styles.movieDetails}>
                            <Text style={styles.detailText}>{movie.releaseDate} 개봉</Text>
                            <Text style={styles.detailSeparator}>·</Text>
                            <Text style={styles.detailText}>{movie.runtime}</Text>
                            <Text style={styles.detailSeparator}>·</Text>
                            <Text style={styles.detailText}>{movie.genre}</Text>
                        </View>
                        
                        <Text style={styles.directorText}>감독 {movie.director}</Text>
                        <Text style={styles.castText}>출연 {movie.cast.join(', ')}</Text>
                        
                        {/* 평점 섹션 */}
                        <View style={styles.ratingsSection}>
                            <View style={styles.ratingCard}>
                                <Text style={styles.ratingLabel}>네티즌 평점</Text>
                                <View style={styles.ratingRow}>
                                    <Text style={styles.ratingScore}>{movie.netizensRating}</Text>
                                    <Text style={styles.ratingMax}>/10</Text>
                                </View>
                                <Text style={styles.ratingCount}>{movie.netizensTotal.toLocaleString()}명 참여</Text>
                            </View>
                            
                            <View style={styles.ratingCard}>
                                <Text style={styles.ratingLabel}>기자·평론가</Text>
                                <View style={styles.ratingRow}>
                                    <Text style={styles.ratingScore}>{movie.expertsRating}</Text>
                                    <Text style={styles.ratingMax}>/10</Text>
                                </View>
                                <Text style={styles.ratingCount}>{movie.expertsTotal}명</Text>
                            </View>
                            
                            <View style={styles.ratingCard}>
                                <Text style={styles.ratingLabel}>관람객</Text>
                                <View style={styles.ratingRow}>
                                    <Text style={styles.ratingScore}>{movie.watchGrade}</Text>
                                    <Text style={styles.ratingMax}>/10</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {/* 탭 네비게이션 */}
                <View style={styles.tabContainer}>
                    <TouchableOpacity 
                        style={[styles.tab, activeTab === 'info' && styles.activeTab]}
                        onPress={() => setActiveTab('info')}
                    >
                        <Text style={[styles.tabText, activeTab === 'info' && styles.activeTabText]}>
                            정보
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.tab, activeTab === 'rating' && styles.activeTab]}
                        onPress={() => setActiveTab('rating')}
                    >
                        <Text style={[styles.tabText, activeTab === 'rating' && styles.activeTabText]}>
                            평점/리뷰
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.tab, activeTab === 'media' && styles.activeTab]}
                        onPress={() => setActiveTab('media')}
                    >
                        <Text style={[styles.tabText, activeTab === 'media' && styles.activeTabText]}>
                            미디어
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* 탭 컨텐츠 */}
                {activeTab === 'info' && (
                    <View style={styles.tabContent}>
                        {/* 줄거리 */}
                        <View style={styles.synopsisSection}>
                            <Text style={styles.sectionTitle}>줄거리</Text>
                            <Text style={styles.synopsisText}>{movie.synopsis}</Text>
                        </View>

                        {/* 감독과 배우 */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>감독/출연</Text>
                            <FlatList
                                data={movie.castAndCrew}
                                renderItem={({ item }) => <CastItem item={item} />}
                                keyExtractor={(item, index) => index.toString()}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.horizontalList}
                            />
                        </View>
                    </View>
                )}

                {activeTab === 'rating' && (
                    <View style={styles.tabContent}>
                        {/* 평점 분포 */}
                        <View style={styles.ratingDistributionSection}>
                            <Text style={styles.sectionTitle}>평점 분포</Text>
                            <View style={styles.ratingStatsContainer}>
                                <View style={styles.ratingOverview}>
                                    <Text style={styles.overallRating}>{movie.netizensRating}</Text>
                                    <StarRating rating={Math.floor(movie.netizensRating / 2)} size={20} showNumber={false} />
                                    <Text style={styles.ratingParticipants}>{movie.netizensTotal.toLocaleString()}명 참여</Text>
                                </View>
                                <View style={styles.ratingBars}>
                                    {movie.ratingStats.map((stat, index) => (
                                        <RatingBar key={index} {...stat} />
                                    ))}
                                </View>
                            </View>
                        </View>

                        {/* 사용자 평점 입력 */}
                        <View style={styles.userRatingSection}>
                            <Text style={styles.sectionTitle}>평점 남기기</Text>
                            <View style={styles.userRatingInput}>
                                <View style={styles.starInputContainer}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <TouchableOpacity
                                            key={star}
                                            onPress={() => setUserRating(star)}
                                        >
                                            <Ionicons
                                                name={star <= userRating ? "star" : "star-outline"}
                                                size={30}
                                                color={star <= userRating ? "#FFD700" : "#DDD"}
                                                style={styles.starInput}
                                            />
                                        </TouchableOpacity>
                                    ))}
                                </View>
                                <TextInput
                                    style={styles.reviewInput}
                                    placeholder="영화에 대한 생각을 자유롭게 표현해주세요."
                                    placeholderTextColor="#999"
                                    value={userReview}
                                    onChangeText={setUserReview}
                                    multiline={true}
                                    numberOfLines={3}
                                    textAlignVertical="top"
                                />
                                <TouchableOpacity 
                                    style={[styles.submitBtn, userRating > 0 && styles.submitBtnActive]}
                                    onPress={handleRatingSubmit}
                                    disabled={userRating === 0}
                                >
                                    <Text style={[styles.submitBtnText, userRating > 0 && styles.submitBtnTextActive]}>
                                        평점 등록
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* 리뷰 목록 */}
                        <View style={styles.reviewsSection}>
                            <Text style={styles.sectionTitle}>관람평</Text>
                            {movie.reviews.map((review) => (
                                <ReviewItem key={review.id} item={review} />
                            ))}
                        </View>
                    </View>
                )}

                {activeTab === 'media' && (
                    <View style={styles.tabContent}>
                        {/* 비디오 */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>동영상</Text>
                            <FlatList
                                data={movie.videos}
                                renderItem={({ item }) => <VideoItem item={item} onPress={handleVideoPress} />}
                                keyExtractor={(item) => item.id.toString()}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.horizontalList}
                            />
                        </View>

                        {/* 포토 */}
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
                    </View>
                )}

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

    // 메인 섹션
    mainSection: {
        flexDirection: 'row',
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
    posterContainer: {
        position: 'relative',
        marginRight: 16,
    },
    posterImage: {
        width: 120,
        height: 180,
        borderRadius: 8,
    },
    posterBadge: {
        position: 'absolute',
        top: -8,
        left: -8,
        backgroundColor: '#00D4AA',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    ratingBadge: {
        color: '#FFFFFF',
        fontSize: 11,
        fontWeight: '600',
    },
    movieInfoContainer: {
        flex: 1,
    },
    movieTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1A1A1A',
        marginBottom: 4,
    },
    originalTitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 12,
    },
    movieDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        flexWrap: 'wrap',
    },
    detailText: {
        fontSize: 13,
        color: '#666',
    },
    detailSeparator: {
        fontSize: 13,
        color: '#CCC',
        marginHorizontal: 6,
    },
    directorText: {
        fontSize: 13,
        color: '#666',
        marginBottom: 4,
    },
    castText: {
        fontSize: 13,
        color: '#666',
        marginBottom: 16,
    },

    // 평점 섹션
    ratingsSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    ratingCard: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 12,
        marginHorizontal: 4,
        backgroundColor: '#F8F9FA',
        borderRadius: 8,
    },
    ratingLabel: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: 2,
    },
    ratingScore: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1A1A1A',
    },
    ratingMax: {
        fontSize: 12,
        color: '#999',
        marginLeft: 2,
    },
    ratingCount: {
        fontSize: 11,
        color: '#999',
    },

    // 탭 네비게이션
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E9ECEF',
    },
    tab: {
        flex: 1,
        paddingVertical: 16,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeTab: {
        borderBottomColor: '#00D4AA',
    },
    tabText: {
        fontSize: 16,
        color: '#666',
        fontWeight: '500',
    },
    activeTabText: {
        color: '#00D4AA',
        fontWeight: '600',
    },
    tabContent: {
        backgroundColor: '#FFFFFF',
    },

    // 공통 섹션
    section: {
        paddingVertical: 20,
        paddingLeft: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1A1A1A',
        marginBottom: 16,
    },
    horizontalList: {
        paddingRight: 20,
    },

    // 시놉시스
    synopsisSection: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    synopsisText: {
        fontSize: 15,
        lineHeight: 22,
        color: '#333',
    },

    // 별점 표시
    starContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingNumber: {
        fontSize: 14,
        color: '#333',
        marginLeft: 6,
        fontWeight: '600',
    },

    // 평점 분포
    ratingDistributionSection: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    ratingStatsContainer: {
        flexDirection: 'row',
    },
    ratingOverview: {
        alignItems: 'center',
        marginRight: 30,
    },
    overallRating: {
        fontSize: 36,
        fontWeight: '700',
        color: '#1A1A1A',
        marginBottom: 8,
    },
    ratingParticipants: {
        fontSize: 12,
        color: '#666',
        marginTop: 8,
    },
    ratingBars: {
        flex: 1,
    },
    ratingBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    ratingBarStars: {
        fontSize: 12,
        color: '#666',
        width: 20,
        marginRight: 8,
    },
    ratingBarTrack: {
        flex: 1,
        height: 6,
        backgroundColor: '#E9ECEF',
        borderRadius: 3,
        marginRight: 8,
    },
    ratingBarFill: {
        height: 6,
        backgroundColor: '#00D4AA',
        borderRadius: 3,
    },
    ratingBarPercentage: {
        fontSize: 12,
        color: '#666',
        width: 30,
        textAlign: 'right',
    },

    // 사용자 평점 입력
    userRatingSection: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    userRatingInput: {
        backgroundColor: '#F8F9FA',
        borderRadius: 12,
        padding: 16,
    },
    starInputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 16,
    },
    starInput: {
        marginHorizontal: 4,
    },
    reviewInput: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 12,
        fontSize: 14,
        minHeight: 80,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#E9ECEF',
    },
    submitBtn: {
        backgroundColor: '#E9ECEF',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    submitBtnActive: {
        backgroundColor: '#00D4AA',
    },
    submitBtnText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#999',
    },
    submitBtnTextActive: {
        color: '#FFFFFF',
    },

    // 리뷰
    reviewsSection: {
        padding: 20,
    },
    reviewItem: {
        backgroundColor: '#F8F9FA',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    reviewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    reviewUserInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    reviewUser: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1A1A1A',
        marginLeft: 8,
        marginRight: 8,
    },
    reviewDate: {
        fontSize: 12,
        color: '#999',
    },
    reviewLikeBtn: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    reviewLikes: {
        fontSize: 12,
        color: '#666',
        marginLeft: 4,
    },
    reviewContent: {
        fontSize: 14,
        lineHeight: 20,
        color: '#333',
    },

    // 비디오 아이템
    videoItem: {
        width: 200,
        marginRight: 16,
    },
    videoThumbnailContainer: {
        position: 'relative',
        borderRadius: 8,
        overflow: 'hidden',
    },
    videoThumbnail: {
        width: 200,
        height: 120,
    },
    videoPlayOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    videoDurationBadge: {
        position: 'absolute',
        bottom: 8,
        right: 8,
        backgroundColor: 'rgba(0,0,0,0.8)',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    videoDuration: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
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
        borderRadius: 8,
        overflow: 'hidden',
    },
    photoImage: {
        width: 150,
        height: 100,
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
        marginBottom: 8,
    },
    castName: {
        fontSize: 12,
        fontWeight: '600',
        color: '#1A1A1A',
        textAlign: 'center',
        marginBottom: 2,
    },
    castRole: {
        fontSize: 11,
        color: '#666',
        textAlign: 'center',
    },

    bottomPadding: {
        height: 40,
    },
});

export default InfoDetail;