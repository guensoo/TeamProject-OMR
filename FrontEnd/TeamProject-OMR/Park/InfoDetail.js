import { useState } from "react";
import {
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    TextInput,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Linking } from 'react-native';

import styles from './InfoDetailStyle';

// ⭐ 예쁜 동영상 빈 상태 컴포넌트
const EmptyVideoState = () => {
    return (
        <View style={styles.emptyVideoContainer}>
            <View style={styles.emptyVideoIconContainer}>
                <Text style={styles.emptyVideoIcon}>🎬
                아직 등록된 동영상이 없어요</Text>
            </View>
        </View>
    );
};

// ⭐ 줄거리 더보기/접기 컴포넌트
function SynopsisSection({ synopsis }) {
    const [expanded, setExpanded] = useState(false);
    const isLong = synopsis && synopsis.length > 60; // 60자 이상이면 더보기 표시(자유롭게 수정)
    return (
        <View>
            <Text
                numberOfLines={expanded ? undefined : 3}
                style={styles.synopsisText}
            >
                {synopsis}
            </Text>
            {isLong && (
                <TouchableOpacity onPress={() => setExpanded((v) => !v)}>
                    <Text style={{ color: '#ffd700', marginTop: 2, alignSelf: 'flex-end' }}>
                        {expanded ? "접기 ▲" : "더보기 ▼"}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

// 별점, 평점, 리뷰, 비디오, 포토, 출연진 컴포넌트
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

const RatingBar = ({ stars, percentage }) => (
    <View style={styles.ratingBarContainer}>
        <Text style={styles.ratingBarStars}>{stars}</Text>
        <View style={styles.ratingBarTrack}>
            <View style={[styles.ratingBarFill, { width: `${percentage}%` }]} />
        </View>
        <Text style={styles.ratingBarPercentage}>{percentage}%</Text>
    </View>
);

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

const VideoItem = ({ item, onPress }) => (
    <TouchableOpacity style={styles.videoItem} onPress={() => onPress(item)}>
        <View style={styles.videoThumbnailContainer}>
            <Image
                source={item.thumbnail ? { uri: item.thumbnail } : null}
                style={styles.videoThumbnail}
                resizeMode="cover"
            />
            <View style={styles.videoPlayOverlay}>
                <Ionicons name="play-circle" size={40} color="rgba(255,255,255,0.9)" />
            </View>
            {/* duration 정보는 TMDB에 없음 */}
        </View>
        <Text style={styles.videoTitle} numberOfLines={2}>{item.title}</Text>
    </TouchableOpacity>
);

// TMDB cast 구조 대응 (cast: [{profile_path, name, character}], crew: [{profile_path, name, job}])
const CastItem = ({ item }) => (
    <View style={styles.castItem}>
        <Image
            source={
                item.profile_path
                    ? { uri: `https://image.tmdb.org/t/p/w185${item.profile_path}` }
                    : item.image
                        ? { uri: item.image }
                        : null
            }
            style={styles.castImage}
            resizeMode="cover"
        />
        <Text style={styles.castName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.castRole} numberOfLines={1}>{item.character || item.role || item.job}</Text>
    </View>
);

const InfoDetail = ({ route }) => {
    const { movie, ott } = route.params || {};
    const detailData = movie || ott;

    const [activeTab, setActiveTab] = useState('info');
    const [userRating, setUserRating] = useState(0);
    const [userReview, setUserReview] = useState('');

    const handleVideoPress = (video) => { /* TODO: 유튜브 플레이어 연결 */ };
    const handlePhotoPress = (photo, index) => { /* TODO: 이미지 뷰어 연결 */ };
    const handleRatingSubmit = () => {
        if (userRating > 0) {
            setUserRating(0);
            setUserReview('');
        }
    };

    if (!detailData) {
        return (
            <SafeAreaView style={styles.errorContainer}>
                <Text style={styles.errorText}>영화 정보를 찾을 수 없습니다.</Text>
            </SafeAreaView>
        );
    }

    // TMDB 안전하게 대응
    const posterUrl = detailData.poster_path
        ? { uri: `https://image.tmdb.org/t/p/w500${detailData.poster_path}` }
        : detailData.poster
            ? (typeof detailData.poster === 'string'
                ? { uri: detailData.poster }
                : detailData.poster)
            : null;

    const title = detailData.title || detailData.name || '';
    const originalTitle = detailData.original_title || detailData.originalName || '';
    const releaseDate = detailData.release_date || detailData.first_air_date || '';
    const runtime = detailData.runtime ? `${detailData.runtime}분` : '';
    const genre =
        Array.isArray(detailData.genres)
            ? detailData.genres.map((g) => g.name).join(', ')
            : detailData.genre || '';

    // cast: TMDB API의 credits.cast 또는 castAndCrew 등 다양하게 대응
    const castList = detailData.castAndCrew || detailData.credits?.cast || detailData.cast || [];
    // crew(감독): TMDB API의 credits.crew에서 job이 Director
    const director =
        detailData.director ||
        (detailData.credits?.crew
            ? detailData.credits.crew.find((c) => c.job === "Director")?.name
            : '');

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* 메인 포스터 및 정보 섹션 */}
                <View style={styles.mainSection}>
                    <View style={styles.posterContainer}>
                        <Image
                            source={posterUrl}
                            style={styles.posterImage}
                            resizeMode="cover"
                        />
                        <View style={styles.posterBadge}>
                            <Text style={styles.ratingBadge}>{detailData.rating || detailData.certification}</Text>
                        </View>
                    </View>

                    <View style={styles.movieInfoContainer}>
                        <Text style={styles.movieTitle}>{title}</Text>
                        <Text style={styles.originalTitle}>{originalTitle}</Text>
                        <View style={styles.movieDetails}>
                            <Text style={styles.detailText}>{releaseDate} 개봉</Text>
                            <Text style={styles.detailSeparator}>·</Text>
                            <Text style={styles.detailText}>{runtime}</Text>
                            <Text style={styles.detailSeparator}>·</Text>
                            <Text style={styles.detailText}>{genre}</Text>
                        </View>
                        <Text style={styles.directorText}>감독 {director}</Text>
                        <Text style={styles.castText}>
                            출연 {Array.isArray(castList) ? castList.slice(0, 5).map(c => c.name).join(', ') : ''}
                        </Text>
                    </View>
                </View>

                {/* 평점 섹션 */}
                <View style={styles.ratingsSection}>
                    <View style={styles.ratingCard}>
                        <Text style={styles.ratingLabel}>네티즌 평점</Text>
                        <View style={styles.ratingRow}>
                            <Text style={styles.ratingScore}>{detailData.netizensRating || detailData.vote_average}</Text>
                            <Text style={styles.ratingMax}>/10</Text>
                        </View>
                        <Text style={styles.ratingCount}>
                            {(detailData.netizensTotal || detailData.vote_count)?.toLocaleString()}명 참여
                        </Text>
                    </View>
                    <View style={styles.ratingCard}>
                        <Text style={styles.ratingLabel}>관람객</Text>
                        <View style={styles.ratingRow}>
                            <Text style={styles.ratingScore}>{detailData.watchGrade || '-'}</Text>
                            <Text style={styles.ratingMax}>/10</Text>
                        </View>
                    </View>
                </View>

                {/* 탭 네비게이션 */}
                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'info' && styles.activeTab]}
                        onPress={() => setActiveTab('info')}
                    >
                        <Text style={[styles.tabText, activeTab === 'info' && styles.activeTabText]}>정보</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'rating' && styles.activeTab]}
                        onPress={() => setActiveTab('rating')}
                    >
                        <Text style={[styles.tabText, activeTab === 'rating' && styles.activeTabText]}>평점/리뷰</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'media' && styles.activeTab]}
                        onPress={() => setActiveTab('media')}
                    >
                        <Text style={[styles.tabText, activeTab === 'media' && styles.activeTabText]}>미디어</Text>
                    </TouchableOpacity>
                </View>

                {/* 탭 컨텐츠 */}
                {activeTab === 'info' && (
                    <View style={styles.tabContent}>
                        <View style={styles.synopsisSection}>
                            <Text style={styles.sectionTitle}>줄거리</Text>
                            <SynopsisSection synopsis={detailData.synopsis || detailData.overview} />
                        </View>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>감독/출연</Text>
                            <FlatList
                                data={castList}
                                renderItem={({ item }) => <CastItem item={item} />}
                                keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.horizontalList}
                            />
                        </View>
                    </View>
                )}

                {activeTab === 'rating' && (
                    <View style={styles.tabContent}>
                        <View style={styles.ratingDistributionSection}>
                            <Text style={styles.sectionTitle}>평점 분포</Text>
                            <View style={styles.ratingStatsContainer}>
                                <View style={styles.ratingOverview}>
                                    <Text style={styles.overallRating}>{detailData.netizensRating || detailData.vote_average}</Text>
                                    <StarRating rating={Math.floor((detailData.netizensRating || detailData.vote_average || 0) / 2)} size={20} showNumber={false} />
                                    <Text style={styles.ratingParticipants}>
                                        {(detailData.netizensTotal || detailData.vote_count)?.toLocaleString()}명 참여
                                    </Text>
                                </View>
                                <View style={styles.ratingBars}>
                                    {(detailData.ratingStats || []).map((stat, index) => (
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

                        <View style={styles.reviewsSection}>
                            <Text style={styles.sectionTitle}>관람평</Text>
                            {(detailData.reviews || []).map((review) => (
                                <ReviewItem key={review.id} item={review} />
                            ))}
                        </View>
                    </View>
                )}

                {activeTab === 'media' && (
                    <View style={styles.tabContent}>
                        {/* 동영상 - 예쁜 빈 상태로 업데이트! */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>동영상</Text>
                            <FlatList
                                data={detailData.videos?.results || []}
                                renderItem={({ item }) =>
                                    <VideoItem
                                        item={{
                                            title: item.name,
                                            thumbnail: `https://img.youtube.com/vi/${item.key}/0.jpg`,
                                            duration: "",
                                        }}
                                        onPress={handleVideoPress}
                                    />
                                }
                                keyExtractor={(item) => item.id?.toString() || item.key}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.horizontalList}
                                ListEmptyComponent={<EmptyVideoState />}
                            />
                        </View>

                        {/* 홈페이지 */}
                        <View style={styles.section}>
                            <TouchableOpacity
                                style={{
                                    marginTop: 12,
                                    marginBottom: 12,
                                    backgroundColor: '#007bff',
                                    padding: 14,
                                    borderRadius: 8,
                                    alignItems: 'center',
                                }}
                                onPress={() => {
                                    if (detailData.homepage) {
                                        Linking.openURL(detailData.homepage);
                                    }
                                }}
                                disabled={!detailData.homepage}
                            >
                                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
                                    공식 홈페이지 보러가기
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                )}

                <View style={styles.bottomPadding} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default InfoDetail;