import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    // 향상된 헤더 스타일
    header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        zIndex: 1000,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        minHeight: 60,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F8F9FA',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E9ECEF',
    },
    backIcon: {
        fontSize: 20,
        color: '#495057',
        fontWeight: 'bold',
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#212529',
        letterSpacing: -0.5,
    },
    titleUnderline: {
        width: 30,
        height: 3,
        backgroundColor: '#007AFF',
        borderRadius: 2,
        marginTop: 4,
    },
    actionButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#F8F9FA',
        borderWidth: 1,
        borderColor: '#DEE2E6',
        minWidth: 80,
        justifyContent: 'center',
    },
    writeButton: {
        backgroundColor: '#007AFF',
        borderColor: '#007AFF',
    },
    actionIcon: {
        fontSize: 14,
        marginRight: 4,
    },
    actionText: {
        fontSize: 12,
        color: '#6C757D',
        fontWeight: '600',
    },
    writeIcon: {
        fontSize: 14,
        marginRight: 4,
    },
    writeText: {
        fontSize: 12,
        color: '#FFFFFF',
        fontWeight: '600',
    },
    headerGradient: {
        height: 1,
        backgroundColor: '#E9ECEF',
    },
    // 기존 스타일들 유지
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    filterContainer: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingVertical: 5,
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    filterSection: {
        marginBottom: 16,
    },
    filterLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: '#2C3E50',
        marginBottom: 12,
    },
    filterScrollContent: {
        paddingRight: 16,
    },
    filterButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E1E8ED',
        backgroundColor: '#FFFFFF',
        marginRight: 8,
        minWidth: 60,
        alignItems: 'center',
    },
    filterButtonActive: {
        backgroundColor: '#3498DB',
        borderColor: '#3498DB',
    },
    filterButtonText: {
        fontSize: 14,
        color: '#657786',
        fontWeight: '500',
    },
    filterButtonTextActive: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
    toggleContainer: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        marginBottom: 8,
    },
    toggleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#F8F9FA',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#E1E8ED',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    toggleText: {
        fontSize: 14,
        color: '#2C3E50',
        fontWeight: '500',
        marginRight: 8,
    },
    iconContainer: {
        transform: [{ rotate: '0deg' }],
    },
    iconRotated: {
        transform: [{ rotate: '180deg' }],
    },
    toggleIcon: {
        fontSize: 16,
        color: '#3498DB',
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#FFFFFF',
        marginBottom: 8,
    },
    totalCountText: {
        fontSize: 16,
        color: '#2C3E50',
        fontWeight: '600',
    },
    pickerContainer: {
        backgroundColor: '#F8F9FA',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E1E8ED',
        overflow: 'hidden',
        minWidth: 130,
    },
    picker: {
        height: 50,
        color: '#2C3E50',
    },
    scrollView: {
        flex: 1,
    },
    dataContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 20,
    }
})

export default styles;