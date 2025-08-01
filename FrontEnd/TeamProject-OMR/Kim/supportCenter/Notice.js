import { useCallback, useContext, useEffect, useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, TextInput, Switch, Alert } from 'react-native';
import Header from "../../Heo/components/Header";
import { SupportNavbar } from "./SupportNavbar";
import { NoticeItem } from '../component/NoticeItem';
<<<<<<< Updated upstream
import { SafeAreaView } from 'react-native-safe-area-context';

// 공지사항 샘플 데이터
const noticeData = [
    {
        id: 1,
        title: "[중요] 서비스 점검 안내",
        date: "2024-01-20",
        category: "시스템",
        isImportant: true,
        isNew: true,
        content: `안녕하세요. 더 나은 서비스 제공을 위해 시스템 점검을 실시합니다.

              점검 일시: 2024년 1월 25일 (목) 02:00 ~ 06:00 (4시간)
              점검 내용: 
              - 서버 안정성 개선
              - 새로운 기능 업데이트 준비
              - 보안 강화 작업

              점검 시간 동안에는 서비스 이용이 일시적으로 중단될 수 있습니다.
              이용에 불편을 드려 죄송합니다.

              감사합니다.`
    },
    {
        id: 2,
        title: "새로운 기능 업데이트 소식",
        date: "2024-01-18",
        category: "업데이트",
        isImportant: false,
        isNew: true,
        content: `새로운 기능이 추가되었습니다!

              주요 업데이트 내용:
              1. 다크 모드 지원
              2. 알림 설정 세분화
              3. 검색 기능 개선
              4. 사용자 인터페이스 개선

              앱 스토어에서 최신 버전으로 업데이트해주세요.
              더 나은 사용 경험을 제공하겠습니다.`
    },
    {
        id: 3,
        title: "개인정보 처리방침 변경 안내",
        date: "2024-01-15",
        category: "정책",
        isImportant: true,
        isNew: false,
        content: `개인정보 처리방침이 변경되었습니다.

              변경 사항:
              - 개인정보 수집 목적 명시 강화
              - 개인정보 보관 기간 조정
              - 제3자 제공 관련 내용 추가

              변경된 개인정보 처리방침은 2024년 1월 20일부터 적용됩니다.
              자세한 내용은 앱 내 '개인정보 처리방침'에서 확인하실 수 있습니다.`
    },
    {
        id: 4,
        title: "고객센터 운영시간 변경",
        date: "2024-01-12",
        category: "고객센터",
        isImportant: false,
        isNew: false,
        content: `고객센터 운영시간이 변경되었습니다.

              기존: 평일 09:00 ~ 18:00
              변경: 평일 09:00 ~ 19:00, 토요일 10:00 ~ 16:00

              더 많은 시간 동안 고객님께 도움을 드릴 수 있게 되었습니다.
              언제든지 문의해주세요!`
    },
    {
        id: 5,
        title: "설 연휴 고객센터 운영 안내",
        date: "2024-01-10",
        category: "고객센터",
        isImportant: false,
        isNew: false,
        content: `설 연휴 기간 고객센터 운영 안내드립니다.

              휴무 기간: 2024년 2월 9일(금) ~ 2월 12일(월)
              정상 운영: 2024년 2월 13일(화)부터

              휴무 기간 중 긴급 문의사항은 앱 내 '문의하기'를 통해 접수해주시면,
              연휴 후 순차적으로 답변드리겠습니다.`
    }
];
// 예시 json 유저 확정되면 해결예정
// [
//   {
//     "category": "시스템",
//     "isImportant": true,
//     "isNew": true,
//     "title": "서비스 점검 안내",
//     "content": "안녕하세요. 더 나은 서비스 제공을 위해 시스템 점검을 실시합니다.\n\n점검 일시: 2024년 1월 25일 (목) 02:00 ~ 06:00 (4시간)\n점검 내용:\n- 서버 안정성 개선\n- 새로운 기능 업데이트 준비\n- 보안 강화 작업\n\n점검 시간 동안에는 서비스 이용이 일시적으로 중단될 수 있습니다.\n이용에 불편을 드려 죄송합니다.\n\n감사합니다.",
//     "createdAt": "2024-01-20T00:00:00",
//     "updatedAt": "2024-01-20T00:00:00",
//     "userId": 1
//   },
//   {
//     "category": "업데이트",
//     "isImportant": false,
//     "isNew": true,
//     "title": "새로운 기능 업데이트 소식",
//     "content": "새로운 기능이 추가되었습니다!\n\n주요 업데이트 내용:\n1. 다크 모드 지원\n2. 알림 설정 세분화\n3. 검색 기능 개선\n4. 사용자 인터페이스 개선\n\n앱 스토어에서 최신 버전으로 업데이트해주세요.\n더 나은 사용 경험을 제공하겠습니다.",
//     "createdAt": "2024-01-18T00:00:00",
//     "updatedAt": "2024-01-18T00:00:00",
//     "userId": 1
//   },
//   {
//     "category": "정책",
//     "isImportant": true,
//     "isNew": false,
//     "title": "개인정보 처리방침 변경 안내",
//     "content": "개인정보 처리방침이 변경되었습니다.\n\n변경 사항:\n- 개인정보 수집 목적 명시 강화\n- 개인정보 보관 기간 조정\n- 제3자 제공 관련 내용 추가\n\n변경된 개인정보 처리방침은 2024년 1월 20일부터 적용됩니다.\n자세한 내용은 앱 내 '개인정보 처리방침'에서 확인하실 수 있습니다.",
//     "createdAt": "2024-01-15T00:00:00",
//     "updatedAt": "2024-01-15T00:00:00",
//     "userId": 1
//   },
//   {
//     "category": "고객센터",
//     "isImportant": false,
//     "isNew": false,
//     "title": "고객센터 운영시간 변경",
//     "content": "고객센터 운영시간이 변경되었습니다.\n\n기존: 평일 09:00 ~ 18:00\n변경: 평일 09:00 ~ 19:00, 토요일 10:00 ~ 16:00\n\n더 많은 시간 동안 고객님께 도움을 드릴 수 있게 되었습니다.\n언제든지 문의해주세요!",
//     "createdAt": "2024-01-12T00:00:00",
//     "updatedAt": "2024-01-12T00:00:00",
//     "userId": 1
//   },
//   {
//     "category": "고객센터",
//     "isImportant": false,
//     "isNew": false,
//     "title": "설 연휴 고객센터 운영 안내",
//     "content": "설 연휴 기간 고객센터 운영 안내드립니다.\n\n휴무 기간: 2024년 2월 9일(금) ~ 2월 12일(월)\n정상 운영: 2024년 2월 13일(화)부터\n\n휴무 기간 중 긴급 문의사항은 앱 내 '문의하기'를 통해 접수해주시면,\n연휴 후 순차적으로 답변드리겠습니다.",
//     "createdAt": "2024-01-10T00:00:00",
//     "updatedAt": "2024-01-10T00:00:00",
//     "userId": 1
//   }
// ]


=======
import { UserContext } from '../../All/context/UserContext';
import { API } from "../../All/api/API";
import { useFocusEffect } from '@react-navigation/native';
>>>>>>> Stashed changes

export const Notice = () => {
    // 로그인된 유저 정보
    const {user} = useContext(UserContext);

    const [noticeData,setNoticeData] = useState([]);
    const [expandedItems, setExpandedItems] = useState(new Set());
    // 선택된 카테고리 (필터용)
    const [selectedCategory, setSelectedCategory] = useState('전체');
    const [showNewNotice, setShowNewNotice] = useState(false);

    // 유저 입력 필드
    const [noticeTitle, setNoticeTitle] = useState('');
    const [noticeContent, setNoticeContent] = useState('');
    const [selectedNoticeCategory, setSelectedNoticeCategory] = useState('시스템');
    const [isImportant, setIsImportant] = useState(false);
    const [isNew, setIsNew] = useState(true);

    const [titleFocused, setTitleFocused] = useState(false);
    const [contentFocused, setContentFocused] = useState(false);

    const categories = ['전체', '시스템', '업데이트', '정책', '고객센터', '이벤트'];
    const noticeCategories = ['시스템', '업데이트', '정책', '고객센터', '이벤트'];

    const toggleExpanded = (itemId) => {
        const newExpanded = new Set(expandedItems);
        if (newExpanded.has(itemId)) {
            newExpanded.delete(itemId);
        } else {
            newExpanded.add(itemId);
        }
        setExpandedItems(newExpanded);
    };

    const filteredNotices = selectedCategory === '전체'
        ? noticeData
        : noticeData.filter(notice => notice.category === selectedCategory);

    const handleNewNotice = () => {
        setShowNewNotice(true);
    };

    useFocusEffect(
        useCallback(()=>{
            const findAll = async () => {
            try {
                const connect = await fetch(`${API}/api/notice`)
                const result = await connect.json() ;
                setNoticeData(result)
                console.log(result)

            } catch (error) {
                Alert.alert("에러","공지사항 불러오기에 실패했습니다")
                console.log(error);
            }
        }

        findAll();            
        },[])
    )

    //[공지 사항 POST]
    const handleSubmitNotice = async () => {
        try {
            if (noticeTitle.trim() && noticeContent.trim() && selectedCategory!=='전체') {

            console.log(user)

            //공지사항 발행 로직
            const data = { 
                userId : user.id,
                title: noticeTitle, 
                content: noticeContent,
                category: selectedNoticeCategory,
                createdAt: new Date(),
                updatedAt : new Date(),
                isImportant,
                isNew
            }

            console.log('공지사항 발행 시작 :: ',data );

            const createNotice = await fetch(`${API}/api/notice`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const response = await createNotice.json();

            console.log("서버 응답:", response);         
            

            // 성공 후 입력 필드 초기화
            setNoticeTitle('');
            setNoticeContent('');
            setSelectedNoticeCategory(selectedCategory);
            setIsImportant(false);
            setIsNew(true);
            setShowNewNotice(false);

            setShowNewNotice(false);
            alert('공지사항이 성공적으로 발행되었습니다.');
        } else {
            alert('제목과 내용과 카테고리를 모두 입력해주세요.');
        }
        } catch (error) {
            Alert.alert("에러","공지사항 작성에 실패 했습니다.")
            console.log(error)
        }
    };

    const handleCancel = () => {
        setShowNewNotice(false);
        
        setNoticeTitle("")
        setNoticeContent("")
        setSelectedNoticeCategory("")
        setIsImportant(false)
        setIsNew(false)
    };

    const categoryColors = {
        '시스템': '#FF6B6B',
        '업데이트': '#4ECDC4',
        '정책': '#45B7D1',
        '고객센터': '#96CEB4',
        '이벤트': '#FECA57'
    };

    //[작성] 관리자용 공지사항 작성 화면
    if (showNewNotice) {
        setSelectedCategory("시스템")
        return (
                <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <>
                <SupportNavbar />
                <View style={styles.adminContainer}>
                    {/* 공지사항 작성 헤더 */}
                    <View style={styles.adminHeader}>
                        <View style={styles.adminHeaderContent}>
                            <TouchableOpacity 
                                style={styles.backButton}
                                onPress={handleCancel}
                            >
                                <Text style={styles.backIcon}>←</Text>
                            </TouchableOpacity>
                            <View style={styles.headerTextContainer}>
                                <Text style={styles.adminTitle}>공지사항 작성</Text>
                            </View>
                            <View style={styles.adminBadge}>
                                <Text style={styles.adminBadgeText}>ADMIN</Text>
                            </View>
                        </View>
                    </View>

                    <ScrollView 
                        style={styles.adminScrollView}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={styles.adminContent}>
                            {/* 공지사항 설정 카드 */}
                            <View style={styles.settingsCard}>
                                <View style={styles.cardHeader}>
                                    <View style={styles.cardIcon}>
                                        <Text style={styles.cardIconText}>⚙️</Text>
                                    </View>
                                    <Text style={styles.cardTitle}>공지사항 설정</Text>
                                </View>
                                
                                {/* 카테고리 선택 */}
                                <View style={styles.settingRow}>
                                    <Text style={styles.settingLabel}>카테고리</Text>
                                    <ScrollView 
                                        horizontal 
                                        showsHorizontalScrollIndicator={false}
                                        style={styles.categorySelector}
                                    >
                                        {noticeCategories.map((category) => (
                                            <TouchableOpacity
                                                key={category}
                                                style={[
                                                    styles.categoryChip,
                                                    selectedCategory === category && styles.selectedCategoryChip,
                                                    { backgroundColor: selectedCategory === category ? categoryColors[category] : '#F3F4F6' }
                                                ]}
                                                onPress={() => setSelectedCategory(category)}
                                            >
                                                <Text style={[
                                                    styles.categoryChipText,
                                                    selectedCategory === category && styles.selectedCategoryChipText
                                                ]}>
                                                    {category}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                </View>

                                {/* 중요 공지 토글 */}
                                <View style={styles.settingRow}>
                                    <View style={styles.toggleContainer}>
                                        <View style={styles.toggleInfo}>
                                            <Text style={styles.toggleLabel}>중요 공지</Text>
                                            <Text style={styles.toggleDescription}>상단에 고정되며 빨간 뱃지가 표시됩니다</Text>
                                        </View>
                                        <Switch
                                            value={isImportant}
                                            onValueChange={setIsImportant}
                                            trackColor={{ false: '#D1D5DB', true: '#EF4444' }}
                                            thumbColor={isImportant ? '#FFFFFF' : '#F3F4F6'}
                                        />
                                    </View>
                                </View>

                                {/* NEW 뱃지 토글 */}
                                <View style={styles.settingRow}>
                                    <View style={styles.toggleContainer}>
                                        <View style={styles.toggleInfo}>
                                            <Text style={styles.toggleLabel}>NEW 뱃지</Text>
                                            <Text style={styles.toggleDescription}>새로운 공지 뱃지를 표시합니다</Text>
                                        </View>
                                        <Switch
                                            value={isNew}
                                            onValueChange={setIsNew}
                                            trackColor={{ false: '#D1D5DB', true: '#10B981' }}
                                            thumbColor={isNew ? '#FFFFFF' : '#F3F4F6'}
                                        />
                                    </View>
                                </View>
                            </View>

                            {/* 제목 입력 카드 */}
                            <View style={styles.inputCard}>
                                <View style={styles.cardHeader}>
                                    <View style={styles.cardIcon}>
                                        <Text style={styles.cardIconText}>📢</Text>
                                    </View>
                                    <Text style={styles.cardTitle}>공지사항 제목</Text>
                                </View>
                                <View style={[
                                    styles.adminInputContainer,
                                    titleFocused && styles.focusedInputContainer
                                ]}>
                                    <TextInput
                                        style={styles.adminInput}
                                        placeholder="공지사항 제목을 입력하세요 (예: [중요] 서비스 점검 안내)"
                                        placeholderTextColor="#9CA3AF"
                                        value={noticeTitle}
                                        onChangeText={setNoticeTitle}
                                        onFocus={() => setTitleFocused(true)}
                                        onBlur={() => setTitleFocused(false)}
                                        maxLength={100}
                                    />
                                </View>
                                <Text style={styles.charCountBelow}>{noticeTitle.length}/100</Text>
                            </View>

                            {/* 내용 입력 카드 */}
                            <View style={styles.inputCard}>
                                <View style={styles.cardHeader}>
                                    <View style={styles.cardIcon}>
                                        <Text style={styles.cardIconText}>📝</Text>
                                    </View>
                                    <Text style={styles.cardTitle}>공지사항 내용</Text>
                                </View>
                                <View style={[
                                    styles.adminTextAreaContainer,
                                    contentFocused && styles.focusedInputContainer
                                ]}>
                                    <TextInput
                                        style={styles.adminTextArea}
                                        placeholder="사용자에게 전달할 공지사항의 상세 내용을 작성해주세요.&#10;&#10;• 명확하고 이해하기 쉽게 작성해주세요&#10;• 필요한 경우 일시, 방법, 연락처 등을 포함해주세요&#10;• 사용자에게 도움이 되는 정보를 제공해주세요"
                                        placeholderTextColor="#9CA3AF"
                                        value={noticeContent}
                                        onChangeText={text=>setNoticeContent(text)}
                                        onFocus={() => setContentFocused(true)}
                                        onBlur={() => setContentFocused(false)}
                                        multiline
                                        numberOfLines={10}
                                        textAlignVertical="top"
                                        maxLength={2000}
                                    />
                                </View>
                                <Text style={styles.charCountBelow}>{noticeContent.length}/2000</Text>
                            </View>

                            {/* 미리보기 카드 */}
                            {(noticeTitle || noticeContent) && (
                                <View style={styles.previewCard}>
                                    <View style={styles.cardHeader}>
                                        <View style={styles.cardIcon}>
                                            <Text style={styles.cardIconText}>👀</Text>
                                        </View>
                                        <Text style={styles.cardTitle}>미리보기</Text>
                                    </View>
                                    <View style={styles.previewContent}>
                                        <View style={styles.previewHeader}>
                                            <View style={styles.previewBadges}>
                                                {isImportant && (
                                                    <View style={styles.importantBadge}>
                                                        <Text style={styles.importantText}>중요</Text>
                                                    </View>
                                                )}
                                                {isNew && (
                                                    <View style={styles.newBadge}>
                                                        <Text style={styles.newText}>NEW</Text>
                                                    </View>
                                                )}
                                                <View style={[styles.categoryBadge, { backgroundColor: categoryColors[selectedCategory] }]}>
                                                    <Text style={styles.categoryText}>{selectedCategory}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <Text style={styles.previewTitle}>
                                            {noticeTitle || '제목이 여기에 표시됩니다'}
                                        </Text>
                                        <Text style={styles.previewDate}>
                                            {new Date().toLocaleDateString('ko-KR')}
                                        </Text>
                                        {noticeContent && (
                                            <Text style={styles.previewContentText}>
                                                {noticeContent}
                                            </Text>
                                        )}
                                    </View>
                                </View>
                            )}

                            <View style={styles.bottomSpacing} />
                        </View>
                    </ScrollView>

                    {/* 하단 버튼 */}
                    <View style={styles.bottomButtonContainer}>
                        <TouchableOpacity 
                            style={styles.previewButton}
                            onPress={() => alert('미리보기 기능')}
                        >
                            <Text style={styles.previewButtonText}>미리보기</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[
                                styles.publishButton,
                                (!noticeTitle.trim() || !noticeContent.trim()) && styles.disabledButton
                            ]}
                            onPress={handleSubmitNotice}
                            disabled={!noticeTitle.trim() || !noticeContent.trim()}
                        >
                            <Text style={[
                                styles.publishButtonText,
                                (!noticeTitle.trim() || !noticeContent.trim()) && styles.disabledButtonText
                            ]}>
                                공지사항 발행
                            </Text>
                            <Text style={styles.publishButtonIcon}>📢</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </>
            </SafeAreaView>
        );
    }


    return (
            <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <>
            <SupportNavbar />
            <ScrollView style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.headerSection}>
                        <Text style={styles.title}>공지사항</Text>
                        <TouchableOpacity
                            style={styles.newInquiryButton}
                            onPress={handleNewNotice}
                        >
                            <Text style={styles.newInquiryButtonText}>+ 새 공지사항</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.subtitle}>
                        서비스 관련 중요한 소식을 확인하세요.
                    </Text>

                    {/* 카테고리 필터 */}
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.categoryContainer}
                    >
                        {categories.map((category) => (
                            <TouchableOpacity
                                key={category}
                                style={[
                                    styles.categoryButton,
                                    selectedCategory === category && styles.selectedCategoryButton
                                ]}
                                onPress={() => setSelectedCategory(category)}
                            >
                                <Text style={[
                                    styles.categoryButtonText,
                                    selectedCategory === category && styles.selectedCategoryText
                                ]}>
                                    {category}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* 공지사항 목록 */}
                    <View style={styles.noticeContainer}>
                        {filteredNotices.map((item) => (
                            <NoticeItem
                                key={item.id}
                                item={item}
                                isExpanded={expandedItems.has(item.id)}
                                onToggle={() => toggleExpanded(item.id)}
                            />
                        ))}
                    </View>

                    {filteredNotices.length === 0 && (
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyText}>해당 카테고리의 공지사항이 없습니다.</Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    headerSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    newInquiryButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 6,
    },
    newInquiryButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
        lineHeight: 22,
    },
    categoryContainer: {
        marginBottom: 20,
    },
    categoryButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#fff',
        borderRadius: 20,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    selectedCategoryButton: {
        backgroundColor: '#007AFF',
        borderColor: '#007AFF',
    },
    categoryButtonText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    selectedCategoryText: {
        color: '#fff',
    },
    noticeContainer: {
        marginBottom: 32,
    },
    noticeItem: {
        backgroundColor: '#fff',
        marginBottom: 12,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    noticeHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: 16,
    },
    noticeInfo: {
        flex: 1,
        marginRight: 12,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        flexWrap: 'wrap',
    },
    importantBadge: {
        backgroundColor: '#FF4757',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 10,
        marginRight: 6,
        marginBottom: 4,
    },
    importantText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    newBadge: {
        backgroundColor: '#FF6B35',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 10,
        marginRight: 6,
        marginBottom: 4,
    },
    newText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    categoryBadge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 10,
        marginBottom: 4,
    },
    categoryText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: '600',
    },
    noticeTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 6,
        lineHeight: 20,
    },
    noticeDate: {
        fontSize: 12,
        color: '#999',
    },
    expandIcon: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#007AFF',
    },
    contentContainer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    contentText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        marginTop: 12,
        whiteSpace: 'pre-line',
    },
    emptyState: {
        alignItems: 'center',
        paddingVertical: 40,
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
    },

    // 관리자 스타일들
    adminContainer: {
        flex: 1,
        backgroundColor: '#F0F4F8',
    },
    adminHeader: {
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        paddingBottom: 24,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: '#1E293B',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    adminHeaderContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 8,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    backIcon: {
        fontSize: 18,
        color: '#475569',
        fontWeight: '600',
    },
    headerTextContainer: {
        flex: 1,
    },
    adminTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1E293B',
        marginBottom: 4,
    },
    adminSubtitle: {
        fontSize: 14,
        color: '#64748B',
        fontWeight: '400',
    },
    adminBadge: {
        backgroundColor: '#DC2626',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    adminBadgeText: {
        fontSize: 12,
        color: '#FFFFFF',
        fontWeight: '700',
    },
    adminScrollView: {
        flex: 1,
    },
    adminContent: {
        padding: 20,
    },
    settingsCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#1E293B',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
        elevation: 4,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    inputCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#1E293B',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
        elevation: 4,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    cardIcon: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: '#F8FAFC',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    cardIconText: {
        fontSize: 16,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1E293B',
    },
    settingRow: {
        marginBottom: 20,
    },
    settingLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 12,
    },
    categorySelector: {
        marginTop: 8,
    },
    categoryChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    selectedCategoryChip: {
        borderColor: 'transparent',
    },
    categoryChipText: {
        fontSize: 14,
        color: '#6B7280',
        fontWeight: '500',
    },
    selectedCategoryChipText: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    toggleInfo: {
        flex: 1,
        marginRight: 16,
    },
    toggleLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 4,
    },
    toggleDescription: {
        fontSize: 14,
        color: '#6B7280',
        lineHeight: 18,
    },
    adminInputContainer: {
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#E5E7EB',
        backgroundColor: '#FAFBFC',
        overflow: 'hidden',
    },
    focusedInputContainer: {
        borderColor: '#3B82F6',
        backgroundColor: '#FFFFFF',
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
    },
    adminInput: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        fontSize: 16,
        color: '#1F2937',
        fontWeight: '400',
    },
    adminTextAreaContainer: {
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#E5E7EB',
        backgroundColor: '#FAFBFC',
        overflow: 'hidden',
        minHeight: 160,
    },
    adminTextArea: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        fontSize: 16,
        color: '#1F2937',
        fontWeight: '400',
        flex: 1,
        textAlignVertical: 'top',
    },
    charCount: {
        position: 'absolute',
        bottom: 8,
        right: 12,
        fontSize: 12,
        color: '#9CA3AF',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    charCountBelow: {
        fontSize: 12,
        color: '#9CA3AF',
        textAlign: 'right',
        marginTop: 8,
        fontWeight: '500',
    },
    previewCard: {
        backgroundColor: '#F8FAFC',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#E2E8F0',
        borderStyle: 'dashed',
    },
    previewContent: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    previewHeader: {
        marginBottom: 12,
    },
    previewBadges: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    previewTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 6,
        lineHeight: 20,
    },
    previewDate: {
        fontSize: 12,
        color: '#999',
        marginBottom: 12,
    },
    previewContentText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        marginTop: 8,
    },
    bottomButtonContainer: {
        flexDirection: 'row',
        padding: 20,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
        gap: 12,
    },
    previewButton: {
        flex: 1,
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D1D5DB',
    },
    previewButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#6B7280',
    },
    publishButton: {
        flex: 2,
        backgroundColor: '#DC2626',
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#DC2626',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 6,
    },
    disabledButton: {
        backgroundColor: '#D1D5DB',
        shadowOpacity: 0,
        elevation: 0,
    },
    publishButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
        marginRight: 8,
    },
    disabledButtonText: {
        color: '#9CA3AF',
    },
    publishButtonIcon: {
        fontSize: 16,
        marginLeft: 4,
    },
    bottomSpacing: {
        height: 100,
    },
});