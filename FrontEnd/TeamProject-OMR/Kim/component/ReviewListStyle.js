import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    // 컨테이너 스타일 수정 (헤더 제거로 인한 조정)
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: 0, // 헤더가 없으므로 상단 패딩 제거
    },
    
    // 검색창 스타일 (상단 여백 추가)
    searchContainer: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingVertical: 12,
        paddingTop: 20, // 상단 여백 추가
        borderBottomWidth: 1,
        borderBottomColor: '#F1F3F4',
    },
    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#E1E8ED',
        paddingHorizontal: 16,
        paddingVertical: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    searchIcon: {
        fontSize: 16,
        color: '#657786',
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#2C3E50',
        paddingVertical: 0,
    },
    clearButton: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#E1E8ED',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    clearIcon: {
        fontSize: 12,
        color: '#657786',
        fontWeight: 'bold',
    },
    
    // 필터 컨테이너
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
    
    // 🔥 2열 레이아웃을 위한 수정된 dataContainer
    dataContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between', // 좌우 간격 균등분배
        alignContent: 'flex-start', // 상단 정렬
        paddingHorizontal: 16,
        paddingBottom: 100, // 플로팅 버튼을 위한 하단 여백 추가
    },
    
    // 🆕 ReviewComponent를 위한 새로운 스타일 추가 (이게 핵심!)
    reviewItemContainer: {
        width: '48%', // 48%로 설정하여 2열 + 간격 확보
        marginBottom: 16, // 상하 간격
    },
    
    // 플로팅 버튼 스타일 추가
    floatingButton: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#f0eed8ff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
        zIndex: 1000,
    },
    floatingButtonIcon: {
        fontSize: 24,
        color: '#FFFFFF',
    },
});

export default styles;