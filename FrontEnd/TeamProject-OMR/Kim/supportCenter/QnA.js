import { useContext, useEffect, useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { SupportNavbar } from "./SupportNavbar";
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserContext } from '../../All/context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from "../../All/api/API";


// 한개의 문의사항 보여주는 카드
const InquiryItem = ({ item, isExpanded, onToggle }) => {

  const [showNewAnswer,setShowNewAnser] = useState(false);
  const [newAnswer,setNewAnswer] = useState('');

  const {user} = useContext(UserContext);

  const handleNewAnswer = () => {
    
  }
  
  return(
    <View style={styles.inquiryItem}>
        <TouchableOpacity style={styles.inquiryHeader} onPress={onToggle}>
            <View style={styles.inquiryInfo}>
                <Text style={styles.inquiryTitle}>{item.title}</Text>
                <Text style={styles.inquiryDate}>{item.createdAt}</Text>
                <Text style={styles.inquiryPreview}>{item.content}</Text>
            </View>
            <View style={styles.inquiryRight}>
                <View style={[styles.statusBadge,
                item.answer !== null ? styles.completedBadge : styles.pendingBadge
                ]}>
                    <Text style={[styles.statusText,
                    item.answer !== null ? styles.completedText : styles.pendingText
                    ]}>
                        {item.answer!==null?'답변완료':'처리중'}
                    </Text>
                </View>
                <Text style={styles.expandIcon}>{isExpanded ? '−' : '+'}</Text>
            </View>
        </TouchableOpacity>

        {isExpanded && item.answer && (
            <View style={styles.answerContainer}>
                <Text style={styles.answerLabel}>답변</Text>
                <Text style={styles.answerText}>{item.answer}</Text>
            </View>
        )}

        {!showNewAnswer?
        isExpanded && !item.answer && (
            <View style={styles.answerContainer}>
                <Text style={styles.pendingAnswer}>답변 준비 중입니다. 조금만 기다려주세요.</Text>

              {user?.id===1&&<TouchableOpacity
                  style={styles.newInquiryButton}
                  onPress={()=>setShowNewAnser(true)}
              >
                  <Text style={styles.newInquiryButtonText}>답변 작성하기</Text>
              </TouchableOpacity>}
            </View>
        )
        :
        isExpanded && !item.answer && (
            <View style={[styles.modernInputContainer,styles.newAnswerbutton]}>
              <TextInput
                multiline
                style={styles.modernAnswerInput}
                placeholder="어떤 내용인지 간단히 적어주세요"
                placeholderTextColor="#A0A0A0"
                value={newAnswer}
                onChangeText={setNewAnswer}
                // onFocus={() => setTitleFocused(true)}
                // onBlur={() => setTitleFocused(false)}
                maxLength={50}
            />
            <View style={{gap:5}}>
              <TouchableOpacity
                      style={styles.newInquiryButton}
                      onPress={handleNewAnswer}
              >
                <Text style={styles.newInquiryButtonText}>완료</Text>
              </TouchableOpacity>
              <TouchableOpacity
                      style={styles.newInquiryButton}
                      onPress={()=>{
                        setNewAnswer('')
                        setShowNewAnser(false)
                      }}
              >
                <Text style={styles.newInquiryButtonText}>취소</Text>
              </TouchableOpacity>
            </View>
            </View>
          )
        }
    </View>
)};

export const QnA = () => {
    const [expandedItems, setExpandedItems] = useState(new Set());
    // 새로 작성하기 상태
    const [showNewInquiry, setShowNewInquiry] = useState(false);
    // 유저 입력 필드
    const [inquiryTitle, setInquiryTitle] = useState('');
    const [inquiryContent, setInquiryContent] = useState('');
    const [inquiryType, setInquiryType] = useState('일반문의');

    const [titleFocused, setTitleFocused] = useState(false);
    const [contentFocused, setContentFocused] = useState(false);
    //받아온 데이터
    const [inquiryHistory,setInquiryHistory] = useState([]);
    //유저 데이터
    const {user} = useContext(UserContext);

    const inquiryTypes = ['일반문의', '기술지원', '결제문의', '계정문의', '신고/건의'];

    const toggleExpanded = (itemId) => {
        const newExpanded = new Set(expandedItems);
        if (newExpanded.has(itemId)) {
            newExpanded.delete(itemId);
        } else {
            newExpanded.add(itemId);
        }
        setExpandedItems(newExpanded);
    };

    const handleNewInquiry = () => {
        // AsyncStorage.getItem('authToken')
        //     .then(token => {
        //         alert("로그인이 필요합니다")
        //     if (token === null) return;
        //     setShowNewInquiry(true);
        // });

        if(user==null){
            alert("로그인이 필요합니다")
            }
        else{setShowNewInquiry(true);}
    };


    //컴포넌트 연결시 보여주기
    useEffect(()=>{
        const findAll = async () => {
            try {
                const connect = await fetch(`${API}/api/qna`)
                const result = await connect.json() ;
                setInquiryHistory(result)
                // console.log(result)

            } catch (error) {
                Alert.alert("에러","문의사항 불러오기에 실패했습니다")
                console.log(error);
            }
        }
        findAll()
    },[showNewInquiry])

    // 새로운 문의글 작성(POST)
    const handleSubmitInquiry = async () => {
      try {
        if (inquiryTitle.trim() && inquiryContent.trim()) {
            // 문의 제출 로직
            const data = {
                title: inquiryTitle,
                content: inquiryContent,
                answer: null,
                types: inquiryType,
                userId:user.id,
                createdAt: new Date(),
                updatedAt: new Date()
            }
            console.log('문의 제출:', data);

            const updateQna = await fetch(`${API}/api/qna`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const response = await updateQna.json();

            // console.log("서버 응답:", response);         

            //입력 필드 초기화
            setInquiryTitle('');
            setInquiryContent('');
            setInquiryType('일반문의');
            setShowNewInquiry(false);
            alert('문의가 성공적으로 접수되었습니다.');
        } else {
            alert('제목과 내용을 모두 입력해주세요.');
        }
      } catch (error) {
        Alert.alert("오류","문의 작성에 실패했습니다.")
        console.log(error)
      }
    };

    const handleCancel = () => {
        setShowNewInquiry(false);
        setInquiryTitle('');
        setInquiryContent('');
        setInquiryType('일반문의');
    };

    // 문의 작성 화면
    if (showNewInquiry) {
        return (
            <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
                <>
                    <SupportNavbar />
                    <View style={styles.modernContainer}>
                        {/* 헤더 영역 */}
                        <View style={styles.modernHeader}>
                            <View style={styles.headerBackground}>
                                <View style={styles.headerContent}>
                                    <TouchableOpacity
                                        style={styles.backButton}
                                        onPress={handleCancel}
                                    >
                                        <Text style={styles.backIcon}>←</Text>
                                    </TouchableOpacity>
                                    <View style={styles.headerTextContainer}>
                                        <Text style={styles.modernTitle}>1:1 문의하기</Text>
                                        <Text style={styles.modernSubtitle}>궁금한 내용을 자세히 알려주세요</Text>
                                    </View>
                                    <View style={styles.headerIconContainer}>
                                        <View style={styles.supportIcon}>
                                            <Text style={styles.supportIconText}>💬</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <ScrollView
                            style={styles.modernScrollView}
                            showsVerticalScrollIndicator={false}
                            bounces={true}
                        >
                            <View style={styles.modernContent}>

                                {/* 문의 유형 선택 카드 */}
                                <View style={styles.inputCard}>
                                    <View style={styles.cardHeader}>
                                        <View style={styles.cardIcon}>
                                            <Text style={styles.cardIconText}>🏷️</Text>
                                        </View>
                                        <Text style={styles.cardTitle}>문의 유형</Text>
                                        <Text style={styles.requiredMark}>*</Text>
                                    </View>
                                    <View style={styles.typeContainer}>
                                        {inquiryTypes.map((type) => (
                                            <TouchableOpacity
                                                key={type}
                                                style={[
                                                    styles.typeChip,
                                                    inquiryType === type && styles.selectedTypeChip
                                                ]}
                                                onPress={() => setInquiryType(type)}
                                            >
                                                <Text style={[
                                                    styles.typeChipText,
                                                    inquiryType === type && styles.selectedTypeChipText
                                                ]}>
                                                    {type}
                                                </Text>
                                                {inquiryType === type && (
                                                    <Text style={styles.checkIcon}>✓</Text>
                                                )}
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </View>

                                {/* 제목 입력 카드 */}
                                <View style={styles.inputCard}>
                                    <View style={styles.cardHeader}>
                                        <View style={styles.cardIcon}>
                                            <Text style={styles.cardIconText}>📝</Text>
                                        </View>
                                        <Text style={styles.cardTitle}>문의 제목</Text>
                                        <Text style={styles.requiredMark}>*</Text>
                                    </View>
                                    <View style={[
                                        styles.modernInputContainer,
                                        titleFocused && styles.focusedInputContainer
                                    ]}>
                                        <TextInput
                                            style={styles.modernInput}
                                            placeholder="어떤 내용인지 간단히 적어주세요"
                                            placeholderTextColor="#A0A0A0"
                                            value={inquiryTitle}
                                            onChangeText={setInquiryTitle}
                                            onFocus={() => setTitleFocused(true)}
                                            onBlur={() => setTitleFocused(false)}
                                            maxLength={50}
                                        />
                                    </View>
                                    <Text style={styles.charCount}>{inquiryTitle.length}/50</Text>
                                </View>

                                {/* 내용 입력 카드 */}
                                <View style={styles.inputCard}>
                                    <View style={styles.cardHeader}>
                                        <View style={styles.cardIcon}>
                                            <Text style={styles.cardIconText}>💭</Text>
                                        </View>
                                        <Text style={styles.cardTitle}>상세 내용</Text>
                                        <Text style={styles.requiredMark}>*</Text>
                                    </View>
                                    <View style={[
                                        styles.modernTextAreaContainer,
                                        contentFocused && styles.focusedInputContainer
                                    ]}>
                                        <TextInput
                                            style={styles.modernTextArea}
                                            placeholder="문제 상황이나 궁금한 점을 자세히 설명해주세요&#10;&#10;• 언제 발생했나요?&#10;• 어떤 상황에서 발생했나요?&#10;• 어떤 도움이 필요한가요?&#10;&#10;더 자세히 알려주실수록 정확한 답변을 드릴 수 있어요!"
                                            placeholderTextColor="#A0A0A0"
                                            value={inquiryContent}
                                            onChangeText={setInquiryContent}
                                            onFocus={() => setContentFocused(true)}
                                            onBlur={() => setContentFocused(false)}
                                            multiline
                                            numberOfLines={8}
                                            textAlignVertical="top"
                                            maxLength={1000}
                                        />
                                    </View>
                                    <Text style={styles.charCount}>{inquiryContent.length}/1000</Text>
                                </View>

                                {/* 빠른 답변 팁 카드 */}
                                <View style={styles.tipCard}>
                                    <View style={styles.tipHeader}>
                                        <Text style={styles.tipIcon}>⚡</Text>
                                        <Text style={styles.tipTitle}>빠른 답변을 위한 꿀팁!</Text>
                                    </View>
                                    <View style={styles.tipContent}>
                                        <View style={styles.tipItem}>
                                            <Text style={styles.tipBullet}>🎯</Text>
                                            <Text style={styles.tipText}>구체적인 상황을 설명해주세요</Text>
                                        </View>
                                        <View style={styles.tipItem}>
                                            <Text style={styles.tipBullet}>📱</Text>
                                            <Text style={styles.tipText}>사용 중인 기기와 앱 버전을 알려주세요</Text>
                                        </View>
                                        <View style={styles.tipItem}>
                                            <Text style={styles.tipBullet}>🖼️</Text>
                                            <Text style={styles.tipText}>스크린샷이 있다면 더욱 좋아요</Text>
                                        </View>
                                        <View style={styles.tipItem}>
                                            <Text style={styles.tipBullet}>⏰</Text>
                                            <Text style={styles.tipText}>평균 답변 시간: 2-4시간 (업무시간 기준)</Text>
                                        </View>
                                    </View>
                                </View>

                                {/* 하단 여백 */}
                                <View style={styles.bottomSpacing} />
                            </View>
                        </ScrollView>

                        {/* 하단 고정 버튼 */}
                        <View style={styles.bottomButtonContainer}>
                            <View style={styles.buttonInfo}>
                                <Text style={styles.responseTime}>💌 평균 답변 시간: 2-4시간</Text>
                            </View>
                            <TouchableOpacity
                                style={[
                                    styles.submitButton,
                                    (!inquiryTitle.trim() || !inquiryContent.trim()) && styles.disabledButton
                                ]}
                                onPress={handleSubmitInquiry}
                                disabled={!inquiryTitle.trim() || !inquiryContent.trim()}
                            >
                                <Text style={[
                                    styles.submitButtonText,
                                    (!inquiryTitle.trim() || !inquiryContent.trim()) && styles.disabledButtonText
                                ]}>
                                    문의 보내기
                                </Text>
                                <Text style={styles.submitButtonIcon}>✈️</Text>
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
                            <Text style={styles.title}>나의 문의 내역</Text>
                            <TouchableOpacity
                                style={styles.newInquiryButton}
                                onPress={handleNewInquiry}
                            >
                                <Text style={styles.newInquiryButtonText}>+ 새 문의</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.subtitle}>
                            문의하신 내용과 답변을 확인하실 수 있습니다.
                        </Text>

                        <View style={styles.inquiryContainer}>
                            {inquiryHistory.map((item) => (
                                <InquiryItem
                                    key={item.id}
                                    item={item}
                                    isExpanded={expandedItems.has(item.id)}
                                    onToggle={() => toggleExpanded(item.id)}
                                />
                            )).reverse()}
                        </View>

                        {inquiryHistory.length === 0 && (
                            <View style={styles.emptyState}>
                                <Text style={styles.emptyText}>아직 문의 내역이 없습니다.</Text>
                                <Text style={styles.emptySubtext}>궁금한 점이 있으시면 언제든 문의해주세요.</Text>
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
    content: {
        padding: 20,
    },
    headerSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    newInquiryButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 6,
        marginRight:10
    },
    newInquiryButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',     
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 24,
        lineHeight: 22,
    },
    inquiryContainer: {
        marginBottom: 32,
    },
    inquiryItem: {
        backgroundColor: '#fff',
        marginBottom: 12,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    inquiryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: 16,
    },
    inquiryInfo: {
        flex: 1,
        marginRight: 12,
    },
    inquiryTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    inquiryDate: {
        fontSize: 12,
        color: '#999',
        marginBottom: 6,
    },
    inquiryPreview: {
        fontSize: 14,
        color: '#666',
        lineHeight: 18,
    },
    inquiryRight: {
        alignItems: 'flex-end',
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        marginBottom: 8,
    },
    completedBadge: {
        backgroundColor: '#E8F5E8',
    },
    pendingBadge: {
        backgroundColor: '#FFF3E0',
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
    },
    completedText: {
        color: '#4CAF50',
    },
    pendingText: {
        color: '#FF9800',
    },
    expandIcon: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#007AFF',
    },
    answerContainer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    answerLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginTop: 8,
        marginBottom: 6,
    },
    answerText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    pendingAnswer: {
        fontSize: 14,
        color: '#999',
        fontStyle: 'italic',
        marginTop: 8,
    },
    emptyState: {
        alignItems: 'center',
        paddingVertical: 40,
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 14,
        color: '#999',
    },

    // 새로운 모던 스타일들
    modernContainer: {
        flex: 1,
        backgroundColor: '#F0F9FF',
    },
    modernHeader: {
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        shadowColor: '#0EA5E9',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    headerBackground: {
        paddingBottom: 24,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 8,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F0F9FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    backIcon: {
        fontSize: 18,
        color: '#0EA5E9',
        fontWeight: '600',
    },
    headerTextContainer: {
        flex: 1,
    },
    modernTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: 4,
    },
    modernSubtitle: {
        fontSize: 14,
        color: '#64748B',
        fontWeight: '400',
    },
    headerIconContainer: {
        alignItems: 'center',
    },
    supportIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#0EA5E9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    supportIconText: {
        fontSize: 18,
    },
    modernScrollView: {
        flex: 1,
    },
    modernContent: {
        padding: 20,
    },
    progressContainer: {
        marginBottom: 32,
        alignItems: 'center',
    },
    progressSteps: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    step: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeStep: {
        backgroundColor: '#0EA5E9',
    },
    inactiveStep: {
        backgroundColor: '#E2E8F0',
    },
    stepNumber: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    inactiveStepText: {
        color: '#94A3B8',
    },
    progressLine: {
        width: 40,
        height: 2,
        backgroundColor: '#E2E8F0',
        marginHorizontal: 8,
    },
    stepLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 120,
    },
    activeStepLabel: {
        fontSize: 12,
        color: '#0EA5E9',
        fontWeight: '600',
    },
    inactiveStepLabel: {
        fontSize: 12,
        color: '#94A3B8',
        fontWeight: '500',
    },
    inputCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 24,
        marginBottom: 20,
        shadowColor: '#0EA5E9',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 16,
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
        backgroundColor: '#F0F9FF',
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
        color: '#0F172A',
        flex: 1,
    },
    requiredMark: {
        fontSize: 18,
        color: '#EF4444',
        fontWeight: '600',
    },
    typeContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    typeChip: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: '#F8FAFC',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectedTypeChip: {
        backgroundColor: '#0EA5E9',
        borderColor: '#0EA5E9',
    },
    typeChipText: {
        fontSize: 14,
        color: '#64748B',
        fontWeight: '500',
    },
    selectedTypeChipText: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
    checkIcon: {
        fontSize: 12,
        color: '#FFFFFF',
        marginLeft: 6,
        fontWeight: '600',
    },
    modernInputContainer: {
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#E5E7EB',
        backgroundColor: '#FAFBFF',
        overflow: 'hidden',
    },
    focusedInputContainer: {
        borderColor: '#0EA5E9',
        backgroundColor: '#FFFFFF',
        shadowColor: '#0EA5E9',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
    },
    modernInput: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        fontSize: 16,
        color: '#0F172A',
        fontWeight: '400',
    },
    modernTextAreaContainer: {
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#E5E7EB',
        backgroundColor: '#FAFBFF',
        overflow: 'hidden',
        minHeight: 140,
    },
    modernTextArea: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        fontSize: 16,
        color: '#0F172A',
        fontWeight: '400',
        flex: 1,
        textAlignVertical: 'top',
    },
    charCount: {
        position: 'absolute',
        bottom: 4,
        right: 12,
        fontSize: 12,
        color: '#9CA3AF',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    tipCard: {
        backgroundColor: '#FFFBEB',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#FDE68A',
    },
    tipHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    tipIcon: {
        fontSize: 20,
        marginRight: 8,
    },
    tipTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#92400E',
    },
    tipContent: {
        gap: 8,
    },
    tipItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tipBullet: {
        fontSize: 14,
        marginRight: 8,
        width: 20,
    },
    tipText: {
        fontSize: 14,
        color: '#A16207',
        flex: 1,
        lineHeight: 20,
    },
    faqCard: {
        backgroundColor: '#F8FAFC',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    faqHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    faqIcon: {
        fontSize: 20,
        marginRight: 8,
    },
    faqTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
    },
    faqItems: {
        gap: 8,
    },
    faqItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    faqItemText: {
        fontSize: 14,
        color: '#374151',
        fontWeight: '500',
    },
    faqArrow: {
        fontSize: 16,
        color: '#0EA5E9',
        fontWeight: '600',
    },
    bottomButtonContainer: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    buttonInfo: {
        alignItems: 'center',
        marginBottom: 12,
    },
    responseTime: {
        fontSize: 12,
        color: '#64748B',
        fontWeight: '500',
    },
    submitButton: {
        backgroundColor: '#0EA5E9',
        borderRadius: 16,
        paddingVertical: 18,
        paddingHorizontal: 24,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#0EA5E9',
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
    submitButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
        marginRight: 8,
    },
    disabledButtonText: {
        color: '#9CA3AF',
    },
    submitButtonIcon: {
        fontSize: 16,
        marginLeft: 4,
    },
    bottomSpacing: {
        height: 100,
    },
    newAnswerbutton : {
      flexDirection: 'row',
      alignItems:'center'
    },
    modernAnswerInput: {
      paddingHorizontal: 16,
      paddingVertical: 16,
      fontSize: 16,
      height:120,
      color: '#0F172A',
      fontWeight: '400',
      flex :1
  },
});