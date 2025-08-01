import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Animated, Switch, Alert } from "react-native";
import React, { useState, useRef, useContext, useCallback, useEffect } from "react";
import { SupportNavbar } from "./SupportNavbar";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SupportContext } from "../context/SupportContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserContext } from "../../All/context/UserContext";
import { API } from "../../All/api/API";

// FAQ 아이템 컴포넌트
const FAQItem = ({ question, answer, isExpanded, onToggle }) => {

    const animatedHeight = useRef(new Animated.Value(0)).current;
    const rotation = useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.parallel([
            Animated.timing(animatedHeight, {
                toValue: isExpanded ? 1 : 0,
                duration: 300,
                useNativeDriver: false,
            }),
            Animated.timing(rotation, {
                toValue: isExpanded ? 1 : 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();
    }, [isExpanded]);

    const rotateIcon = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    return (
        <View style={styles.faqItem}>
            <TouchableOpacity
                style={styles.faqQuestion}
                onPress={onToggle}
                activeOpacity={0.7}
            >
                <View style={styles.questionContent}>
                    <View style={styles.questionIcon}>
                        <Text style={styles.questionIconText}>Q</Text>
                    </View>
                    <Text style={styles.questionText}>{question}</Text>
                </View>
                <Animated.View style={[styles.expandIcon, { transform: [{ rotate: rotateIcon }] }]}>
                    <Text style={styles.expandIconText}>⌄</Text>
                </Animated.View>
            </TouchableOpacity>

            <Animated.View
                style={[
                    styles.faqAnswerContainer,
                    {
                        maxHeight: animatedHeight.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 200],
                        }),
                        opacity: animatedHeight,
                    }
                ]}
            >
                <View style={styles.faqAnswer}>
                    <View style={styles.answerIcon}>
                        <Text style={styles.answerIconText}>A</Text>
                    </View>
                    <Text style={styles.answerText}>{answer}</Text>
                </View>
            </Animated.View>
        </View>
    );
};

export const FAQ = () => {
    const [expandedItems, setExpandedItems] = useState(new Set());

    // 작성 페이지 열기
    const [showNewFAQ, setShowNewFAQ] = useState(false);

    // 유저 입력 필드    
    const [faqQuestion, setFaqQuestion] = useState('');
    const [faqAnswer, setFaqAnswer] = useState('');
    const [faqCategory, setFaqCategory] = useState('계정/로그인');

    const [questionFocused, setQuestionFocused] = useState(false);
    const [answerFocused, setAnswerFocused] = useState(false);

    // 고객센터 
    const { setSupportData } = useContext(SupportContext);
    // 유저 데이터
    const {user} = useContext(UserContext);
    // console.log(user)

    const [faqData, setFaqData] = useState([]);

    //페이지 로드시 데이터 보여주기.
    useEffect(()=>{
        const findAll = async () => {
            try {
                const connect = await fetch(`${API}/api/faq`)
                const result = await connect.json() ;
                setFaqData(result)
                // console.log(result)

            } catch (error) {
                Alert.alert("에러","자주 묻는 질문 불러오기에 실패했습니다")
                console.log(error);
            }
        }
        findAll()
    },[showNewFAQ])

    const toggleExpanded = (id) => {
        const newExpanded = new Set(expandedItems);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedItems(newExpanded);
    };


    const handleNewFAQ = () => {
        setShowNewFAQ(true);
    };

    //FAQ 데이터 작성하기.
    const handleSubmitFAQ = async () => {
        try {
            if (faqQuestion.trim() && faqAnswer.trim()) {
            const newFAQItem = {
                category: faqCategory,
                question: faqQuestion,
                answer: faqAnswer,
                createdAt : new Date(),
                updatedAt : new Date(),
                userId:user.id
            };

            const connect = await fetch(`${API}/api/faq`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newFAQItem)
            });

            const response = await connect.json();

            // setFaqData(response);
            setFaqQuestion('');
            setFaqAnswer('');
            setFaqCategory('계정/로그인');
            setShowNewFAQ(false);
            console.log('요청 데이터 :: ',newFAQItem)
            alert('FAQ가 성공적으로 등록되었습니다.');
            } else {
                alert('질문과 답변을 모두 입력해주세요.');
            }
        } catch (error) {
            Alert.alert("에러","질문 작성에 실패 했습니다.")
            console.log(error)
        }
    };

    const handleCancel = () => {
        setShowNewFAQ(false);
        setFaqQuestion('');
        setFaqAnswer('');
        setFaqCategory('계정/로그인');
    };

    // 관리자용 FAQ 작성 화면
    if (showNewFAQ) {
        return (
            <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
                <>
                    <SupportNavbar />
                    <View style={styles.adminContainer}>
                        {/* 관리자 헤더 */}
                        <View style={styles.adminHeader}>
                            <View style={styles.adminHeaderContent}>
                                <TouchableOpacity
                                    style={styles.backButton}
                                    onPress={handleCancel}
                                >
                                    <Text style={styles.backIcon}>←</Text>
                                </TouchableOpacity>
                                <View style={styles.headerTextContainer}>
                                    <Text style={styles.adminTitle}>FAQ 추가</Text>
                                    <Text style={styles.adminSubtitle}>사용자들이 자주 묻는 질문과 답변을 작성하세요</Text>
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
                                {/* 질문 입력 카드 */}
                                <View style={styles.inputCard}>
                                    <View style={styles.cardHeader}>
                                        <View style={styles.cardIcon}>
                                            <Text style={styles.cardIconText}>❓</Text>
                                        </View>
                                        <Text style={styles.cardTitle}>질문</Text>
                                    </View>
                                    <View style={[
                                        styles.adminInputContainer,
                                        questionFocused && styles.focusedInputContainer
                                    ]}>
                                        <TextInput
                                            style={styles.adminInput}
                                            placeholder="사용자가 자주 묻는 질문을 입력하세요 (예: 비밀번호를 잊어버렸어요)"
                                            placeholderTextColor="#9CA3AF"
                                            value={faqQuestion}
                                            onChangeText={setFaqQuestion}
                                            onFocus={() => setQuestionFocused(true)}
                                            onBlur={() => setQuestionFocused(false)}
                                            maxLength={100}
                                        />
                                    </View>
                                    <Text style={styles.charCountBelow}>{faqQuestion.length}/100</Text>
                                </View>

                                {/* 답변 입력 카드 */}
                                <View style={styles.inputCard}>
                                    <View style={styles.cardHeader}>
                                        <View style={styles.cardIcon}>
                                            <Text style={styles.cardIconText}>💡</Text>
                                        </View>
                                        <Text style={styles.cardTitle}>답변</Text>
                                    </View>
                                    <View style={[
                                        styles.adminTextAreaContainer,
                                        answerFocused && styles.focusedInputContainer
                                    ]}>
                                        <TextInput
                                            style={styles.adminTextArea}
                                            placeholder="질문에 대한 명확하고 도움이 되는 답변을 작성해주세요.&#10;&#10;• 단계별로 설명해주세요&#10;• 구체적인 방법을 제시해주세요&#10;• 추가 문의처가 있다면 안내해주세요&#10;&#10;사용자가 쉽게 이해할 수 있도록 친절하게 작성해주세요!"
                                            placeholderTextColor="#9CA3AF"
                                            value={faqAnswer}
                                            onChangeText={setFaqAnswer}
                                            onFocus={() => setAnswerFocused(true)}
                                            onBlur={() => setAnswerFocused(false)}
                                            multiline
                                            numberOfLines={10}
                                            textAlignVertical="top"
                                            maxLength={1000}
                                        />
                                    </View>
                                    <Text style={styles.charCountBelow}>{faqAnswer.length}/1000</Text>
                                </View>

                                {/* 작성 가이드 카드 */}
                                <View style={styles.guideCard}>
                                    <View style={styles.guideHeader}>
                                        <Text style={styles.guideIcon}>📋</Text>
                                        <Text style={styles.guideTitle}>FAQ 작성 가이드</Text>
                                    </View>
                                    <View style={styles.guideContent}>
                                        <View style={styles.guideItem}>
                                            <Text style={styles.guideBullet}>🎯</Text>
                                            <Text style={styles.guideText}>실제 사용자가 문의한 내용을 기반으로 작성</Text>
                                        </View>

                                        <View style={styles.guideItem}>
                                            <Text style={styles.guideBullet}>🔍</Text>
                                            <Text style={styles.guideText}>검색하기 쉬운 키워드 포함</Text>
                                        </View>
                                        <View style={styles.guideItem}>
                                            <Text style={styles.guideBullet}>📝</Text>
                                            <Text style={styles.guideText}>간결하고 이해하기 쉬운 답변</Text>
                                        </View>
                                        <View style={styles.guideItem}>
                                            <Text style={styles.guideBullet}>🔄</Text>
                                            <Text style={styles.guideText}>정기적으로 업데이트하여 최신성 유지</Text>

                                        <View style={styles.previewInfo}>
                                            <Text style={styles.previewCategory}>카테고리: {faqCategory}</Text>

                                        </View>
                                    </View>
                                    </View>
                                </View>

                                {/* 미리보기 카드 */}
                                {(faqQuestion || faqAnswer) && (
                                    <View style={styles.previewCard}>
                                        <View style={styles.cardHeader}>
                                            <View style={styles.cardIcon}>
                                                <Text style={styles.cardIconText}>👀</Text>
                                            </View>
                                            <Text style={styles.cardTitle}>미리보기</Text>
                                        </View>
                                        <View style={styles.previewFAQ}>
                                            <View style={styles.previewQuestion}>
                                                <View style={styles.questionIcon}>
                                                    <Text style={styles.questionIconText}>Q</Text>
                                                </View>
                                                <Text style={styles.questionText}>
                                                    {faqQuestion || '질문이 여기에 표시됩니다'}
                                                </Text>
                                            </View>
                                            <View style={styles.previewAnswer}>
                                                <View style={styles.answerIcon}>
                                                    <Text style={styles.answerIconText}>A</Text>
                                                </View>
                                                <Text style={styles.answerText}>
                                                    {faqAnswer || '답변이 여기에 표시됩니다'}
                                                </Text>
                                            </View>
                                            <View style={styles.previewInfo}>
                                                <Text style={styles.previewCategory}>카테고리: {faqCategory}</Text>
                                            </View>
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
                                    (!faqQuestion.trim() || !faqAnswer.trim()) && styles.disabledButton
                                ]}
                                onPress={handleSubmitFAQ}
                                disabled={!faqQuestion.trim() || !faqAnswer.trim()}
                            >
                                <Text style={[
                                    styles.publishButtonText,
                                    (!faqQuestion.trim() || !faqAnswer.trim()) && styles.disabledButtonText
                                ]}>
                                    FAQ 등록
                                </Text>
                                <Text style={styles.publishButtonIcon}>❓</Text>
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
                <View style={styles.container}>
                    {/* 헤더 섹션 */}
                    <View style={styles.headerSection}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.pageTitle}>자주 묻는 질문</Text>
                            {user?.id===1&&<TouchableOpacity
                                style={styles.newFAQButton}
                                onPress={handleNewFAQ}
                            >
                                <Text style={styles.newFAQButtonText}>+ 새 FAQ</Text>
                            </TouchableOpacity>}
                        </View>
                        <Text style={styles.pageSubtitle}>
                            궁금한 내용을 빠르게 찾아보세요
                        </Text>
                    </View>

                    {/* FAQ 리스트 */}
                    <ScrollView
                        style={styles.faqList}
                        showsVerticalScrollIndicator={false}
                    >
                        {faqData.length > 0 ? (
                            <>
                                <Text style={styles.resultCount}>
                                    총 {faqData.length}개의 질문이 있습니다
                                </Text>
                                {faqData.map((item) => (
                                    <FAQItem
                                        key={item.id}
                                        question={item.question}
                                        answer={item.answer}
                                        isExpanded={expandedItems.has(item.id)}
                                        onToggle={() => toggleExpanded(item.id)}
                                    />
                                )).reverse()}
                            </>
                        ) : (
                            <View style={styles.noResults}>
                                <Text style={styles.noResultsIcon}>🔍</Text>
                                <Text style={styles.noResultsTitle}>검색 결과가 없습니다</Text>
                                <Text style={styles.noResultsSubtitle}>
                                    다른 키워드로 검색해보시거나{'\n'}1:1 문의를 이용해주세요
                                </Text>
                            </View>
                        )}

                        {/* 추가 도움말 */}
                        <View style={styles.helpSection}>
                            <Text style={styles.helpTitle}>원하는 답변을 찾지 못하셨나요?</Text>
                            <Text style={styles.helpDescription}>
                                1:1 문의를 통해 개별 상담을 받아보세요
                            </Text>
                            <TouchableOpacity style={styles.helpButton}
                                onPress={() => setSupportData('QnA')} >
                                <Text style={styles.helpButtonText}>1:1 문의하기</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.bottomSpacing} />
                    </ScrollView>
                </View>
            </>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },

    // 헤더 섹션
    headerSection: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E9ECEF',
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1A1A1A',
    },
    newFAQButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 6,
    },
    newFAQButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
    },
    pageSubtitle: {
        fontSize: 16,
        color: '#6C757D',
    },

    // FAQ 리스트
    faqList: {
        flex: 1,
        padding: 20,
    },
    resultCount: {
        fontSize: 14,
        color: '#6C757D',
        marginBottom: 16,
    },
    faqItem: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginBottom: 12,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    faqQuestion: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F8F9FA',
    },
    questionContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    questionIcon: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    questionIconText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    questionText: {
        flex: 1,
        fontSize: 16,
        fontWeight: '600',
        color: '#1A1A1A',
        lineHeight: 22,
    },
    expandIcon: {
        padding: 4,
    },
    expandIconText: {
        fontSize: 16,
        color: '#6C757D',
        fontWeight: '600',
    },
    faqAnswerContainer: {
        overflow: 'hidden',
    },
    faqAnswer: {
        flexDirection: 'row',
        padding: 20,
        paddingTop: 16,
        backgroundColor: '#FAFBFC',
    },
    answerIcon: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#28A745',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    answerIconText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    answerText: {
        flex: 1,
        fontSize: 15,
        color: '#495057',
        lineHeight: 22,
    },

    // 검색 결과 없음
    noResults: {
        alignItems: 'center',
        paddingVertical: 60,
    },
    noResultsIcon: {
        fontSize: 48,
        marginBottom: 16,
        opacity: 0.5,
    },
    noResultsTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#6C757D',
        marginBottom: 8,
    },
    noResultsSubtitle: {
        fontSize: 14,
        color: '#ADB5BD',
        textAlign: 'center',
        lineHeight: 20,
    },

    // 도움말 섹션
    helpSection: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 24,
        marginTop: 24,
        alignItems: 'center',
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    helpTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1A1A1A',
        marginBottom: 8,
        textAlign: 'center',
    },
    helpDescription: {
        fontSize: 14,
        color: '#6C757D',
        textAlign: 'center',
        marginBottom: 20,
    },
    helpButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },
    helpButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },

    bottomSpacing: {
        height: 20,
        marginBottom: 20
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
        backgroundColor: '#F3F4F6',
    },
    selectedCategoryChip: {
        backgroundColor: '#007AFF',
        borderColor: '#007AFF',
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
    guideCard: {
        backgroundColor: '#F0FDF4',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#BBF7D0',
    },
    guideHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    guideIcon: {
        fontSize: 20,
        marginRight: 8,
    },
    guideTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#166534',
    },
    guideContent: {
        gap: 8,
    },
    guideItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    guideBullet: {
        fontSize: 14,
        marginRight: 8,
        width: 20,
    },
    guideText: {
        fontSize: 14,
        color: '#15803D',
        flex: 1,
        lineHeight: 20,
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
    previewFAQ: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    previewQuestion: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F8F9FA',
    },
    previewAnswer: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#FAFBFC',
    },
    previewInfo: {
        padding: 12,
        backgroundColor: '#F1F5F9',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    previewCategory: {
        fontSize: 12,
        color: '#64748B',
        fontWeight: '500',
    },
    previewPopular: {
        fontSize: 12,
        color: '#F59E0B',
        fontWeight: '600',
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
        backgroundColor: '#059669',
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#059669',
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
});