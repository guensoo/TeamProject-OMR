import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    keyboardView: {
        flex: 1,
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
    
    // 헤더
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
        backgroundColor: '#FFFFFF',
    },
    headerButton: {
        paddingVertical: 8,
        paddingHorizontal: 4,
    },
    headerButtonText: {
        fontSize: 16,
        color: '#FF6B6B',
        fontWeight: '500',
    },
    headerTitle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        color: '#1A1A1A',
        marginLeft: -20,
    },
    
    // 스크롤뷰
    scrollView: {
        flex: 1,
    },
    container: {
        paddingBottom: 100,
    },
    
    // 작성자 섹션
    authorSection: {
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 1,
        borderBottomColor: "#F0F0F0",
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
    authorSubtext: {
        fontSize: 14,
        color: "#666",
    },
    
    // 별점 섹션
    ratingSection: {
        padding: 20,
        backgroundColor: "#FAFAFA",
        borderBottomWidth: 1,
        borderBottomColor: "#F0F0F0",
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#1A1A1A",
        marginBottom: 12,
    },
    ratingContainer: {
        alignItems: "center",
    },
    stars: {
        flexDirection: "row",
        marginBottom: 8,
    },
    starButton: {
        padding: 4,
    },
    star: {
        fontSize: 32,
        marginHorizontal: 4,
    },
    starFilled: {
        color: "#FFD700",
    },
    starEmpty: {
        color: "#E0E0E0",
    },
    ratingText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#FF6B6B",
    },
    
    // 입력 섹션
    inputSection: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#F0F0F0",
    },
    titleInput: {
        fontSize: 18,
        color: "#333",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: 8,
        backgroundColor: "#FFFFFF",
        marginBottom: 8,
    },
    charCount: {
        fontSize: 12,
        color: "#999",
        textAlign: "right",
    },
    
    // 가이드 섹션
    guideSection: {
        margin: 20,
        padding: 16,
        backgroundColor: "#F8F9FA",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E9ECEF",
    },
    guideTitle: {
        fontSize: 14,
        fontWeight: "600",
        color: "#495057",
        marginBottom: 8,
    },
    guideText: {
        fontSize: 13,
        color: "#6C757D",
        lineHeight: 18,
        marginBottom: 2,
    },
    
    // 제출 섹션
    submitSection: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#FFFFFF",
        borderTopWidth: 1,
        borderTopColor: "#E9ECEF",
        paddingHorizontal: 20,
        paddingVertical: 16,
        elevation: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    submitButton: {
        paddingVertical: 16,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    submitButtonActive: {
        backgroundColor: "#FF6B6B",
    },
    submitButtonInactive: {
        backgroundColor: "#E9ECEF",
    },
    submitButtonText: {
        fontSize: 16,
        fontWeight: "600",
    },
    submitButtonTextActive: {
        color: "#FFFFFF",
    },
    submitButtonTextInactive: {
        color: "#ADB5BD",
    },
});

export default styles;