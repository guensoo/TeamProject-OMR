import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    keyboardView: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    container: {
        paddingBottom: 100, // 댓글 입력창 공간 확보
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
    
    // 헤더 섹션
    headerSection: {
        padding: 20,
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 1,
        borderBottomColor: "#F0F0F0",
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        color: "#1A1A1A",
        marginBottom: 16,
        lineHeight: 32,
    },
    authorSection: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    authorAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#FF6B6B",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    authorAvatarText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "600",
    },
    authorInfo: {
        flex: 1,
    },
    author: {
        fontSize: 16,
        fontWeight: "600",
        color: "#1A1A1A",
        marginBottom: 4,
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    stars: {
        flexDirection: "row",
        marginRight: 8,
    },
    star: {
        fontSize: 16,
        marginRight: 2,
    },
    starFilled: {
        color: "#FFD700",
    },
    starEmpty: {
        color: "#E0E0E0",
    },
    ratingScore: {
        fontSize: 16,
        fontWeight: "600",
        color: "#FF6B6B",
    },
    statsRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    statText: {
        fontSize: 14,
        color: "#666",
    },
    statDot: {
        fontSize: 14,
        color: "#CCC",
        marginHorizontal: 8,
    },

    // 본문 섹션
    contentSection: {
        padding: 20,
    },
    contentText: {
        fontSize: 16,
        lineHeight: 24,
        color: "#333",
        marginBottom: 12,
        textAlign: "left",
    },
    imageContainer: {
        marginVertical: 20,
        borderRadius: 12,
        overflow: "hidden",
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    reviewImage: {
        width: "100%",
        height: 200,
        backgroundColor: "#F5F5F5",
    },

    // 액션 버튼 섹션
    actionSection: {
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: "#FAFAFA",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#F0F0F0",
    },
    actionButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: "#FFFFFF",
        marginRight: 12,
        elevation: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    actionButtonLiked: {
        backgroundColor: "#FFE8E8",
    },
    actionIcon: {
        fontSize: 16,
        marginRight: 6,
    },
    actionIconLiked: {
        color: "#FF6B6B",
    },
    actionText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#333",
    },
    actionTextLiked: {
        color: "#FF6B6B",
    },

    // 영상 배너
    videoBanner: {
        margin: 20,
        padding: 16,
        backgroundColor: "#F8F9FA",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E9ECEF",
    },
    videoBannerText: {
        fontSize: 14,
        color: "#495057",
        textAlign: "center",
    },
    videoBannerLink: {
        color: "#007BFF",
        fontWeight: "600",
        textDecorationLine: "underline",
    },

    // 댓글 섹션
    commentSection: {
        paddingHorizontal: 20,
    },
    commentSectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#1A1A1A",
        marginBottom: 16,
    },
    commentBox: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#F0F0F0",
    },
    commentHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    userAvatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#4ECDC4",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    avatarText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "600",
    },
    commentInfo: {
        flex: 1,
    },
    commentUser: {
        fontSize: 14,
        fontWeight: "600",
        color: "#1A1A1A",
        marginBottom: 2,
    },
    commentDate: {
        fontSize: 12,
        color: "#999",
    },
    commentText: {
        fontSize: 14,
        lineHeight: 20,
        color: "#333",
        marginBottom: 12,
    },
    commentFooter: {
        flexDirection: "row",
        alignItems: "center",
    },
    commentActionBtn: {
        marginRight: 16,
    },
    replyBtn: {
        fontSize: 12,
        color: "#666",
        fontWeight: "500",
    },
    reportBtn: {
        fontSize: 12,
        color: "#999",
        fontWeight: "500",
    },
    commentLike: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: "auto",
    },
    likeIcon: {
        fontSize: 14,
        color: "#FF6B6B",
        marginRight: 4,
    },
    likeCount: {
        fontSize: 12,
        color: "#666",
    },

    // 댓글 작성 인풋 섹션
    commentInputSection: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#FFFFFF",
        borderTopWidth: 1,
        borderTopColor: "#E9ECEF",
        paddingHorizontal: 16,
        paddingVertical: 12,
        elevation: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    commentInputContainer: {
        flexDirection: "row",
        alignItems: "flex-end",
        backgroundColor: "#F8F9FA",
        borderRadius: 24,
        paddingHorizontal: 4,
        paddingVertical: 4,
        minHeight: 48,
    },
    currentUserAvatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#6C5CE7",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8,
        marginLeft: 4,
    },
    currentUserAvatarText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "600",
    },
    commentInput: {
        flex: 1,
        fontSize: 16,
        color: "#333",
        paddingVertical: 8,
        paddingHorizontal: 12,
        maxHeight: 100,
        textAlignVertical: "center",
    },
    sendButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginLeft: 8,
        marginRight: 4,
        justifyContent: "center",
        alignItems: "center",
        minWidth: 60,
    },
    sendButtonActive: {
        backgroundColor: "#FF6B6B",
    },
    sendButtonInactive: {
        backgroundColor: "#E9ECEF",
    },
    sendButtonText: {
        fontSize: 14,
        fontWeight: "600",
    },
    sendButtonTextActive: {
        color: "#FFFFFF",
    },
    sendButtonTextInactive: {
        color: "#ADB5BD",
    },
});

export default styles;