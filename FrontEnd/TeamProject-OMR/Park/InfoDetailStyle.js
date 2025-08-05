import { StyleSheet } from "react-native";

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
        marginTop: 30,
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

    // 평점 섹션 스타일 수정
    ratingsSection: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    ratingCard: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 12,
        backgroundColor: '#F8F9FA',
        borderRadius: 8,
        marginHorizontal: 4, // 카드 사이 작은 간격
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

export default styles;