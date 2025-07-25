import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Animated } from "react-native";
import React, { useState, useRef } from "react";
import Header from "../../Heo/components/Header";
import { SupportNavbar } from "./SupportNavbar";

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
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedItems, setExpandedItems] = useState(new Set());
    const [selectedCategory, setSelectedCategory] = useState('전체');

    const categories = ['전체', '계정/로그인', '서비스 이용', '결제/환불', '기술 문제'];

    const faqData = [
        {
            id: 1,
            category: '계정/로그인',
            question: '비밀번호를 잊어버렸어요. 어떻게 재설정하나요?',
            answer: '로그인 화면에서 "비밀번호 찾기"를 클릭하신 후, 가입 시 등록한 이메일 주소를 입력해주세요. 해당 이메일로 비밀번호 재설정 링크를 보내드립니다.'
        },
        {
            id: 2,
            category: '계정/로그인',
            question: '계정을 삭제하고 싶어요.',
            answer: '계정 삭제는 고객센터(1588-0000)로 연락주시거나, 1:1 문의를 통해 신청하실 수 있습니다. 계정 삭제 시 모든 데이터가 영구적으로 삭제되므로 신중히 결정해주세요.'
        },
        {
            id: 3,
            category: '서비스 이용',
            question: '리뷰 작성은 어떻게 하나요?',
            answer: '작품 상세 페이지에서 "리뷰 작성" 버튼을 클릭하시면 됩니다. 별점과 함께 솔직한 감상평을 작성해주세요. 스포일러가 포함된 내용은 피해주시기 바랍니다.'
        },
        {
            id: 4,
            category: '서비스 이용',
            question: '내가 작성한 리뷰를 수정하거나 삭제할 수 있나요?',
            answer: '네, 가능합니다. 마이페이지 > 내 리뷰에서 작성한 리뷰를 확인하고 수정하거나 삭제하실 수 있습니다. 다른 사용자들이 이미 반응한 리뷰의 경우 수정에 제한이 있을 수 있습니다.'
        },
        {
            id: 5,
            category: '결제/환불',
            question: '프리미엄 구독료는 얼마인가요?',
            answer: '프리미엄 구독료는 월 9,900원입니다. 연간 구독 시 99,000원으로 2개월 무료 혜택을 받으실 수 있습니다. 첫 7일은 무료 체험이 가능합니다.'
        },
        {
            id: 6,
            category: '결제/환불',
            question: '환불은 어떻게 신청하나요?',
            answer: '구독 후 7일 이내에는 100% 환불이 가능합니다. 마이페이지 > 구독 관리에서 환불 신청을 하시거나, 고객센터로 연락주시면 처리해드립니다.'
        },
        {
            id: 7,
            category: '기술 문제',
            question: '앱이 자꾸 종료되거나 느려요.',
            answer: '앱을 완전히 종료 후 재시작해보시고, 최신 버전으로 업데이트해주세요. 문제가 지속되면 기기 재시작을 해보시고, 그래도 해결되지 않으면 고객센터로 연락주세요.'
        },
        {
            id: 8,
            category: '기술 문제',
            question: '알림이 오지 않아요.',
            answer: '기기 설정 > 알림에서 앱 알림이 허용되어 있는지 확인해주세요. 앱 내 설정에서도 원하는 알림 유형을 선택할 수 있습니다.'
        }
    ];

    const toggleExpanded = (id) => {
        const newExpanded = new Set(expandedItems);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedItems(newExpanded);
    };

    const filteredFAQs = faqData.filter(item => {
        const matchesCategory = selectedCategory === '전체' || item.category === selectedCategory;
        const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.answer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <>
            <Header />
            <SupportNavbar/>
            <View style={styles.container}>
                {/* 헤더 섹션 */}
                <View style={styles.headerSection}>
                    <Text style={styles.pageTitle}>자주 묻는 질문</Text>
                    <Text style={styles.pageSubtitle}>
                        궁금한 내용을 빠르게 찾아보세요
                    </Text>
                </View>

                {/* FAQ 리스트 */}
                <ScrollView 
                    style={styles.faqList}
                    showsVerticalScrollIndicator={false}
                >
                    {filteredFAQs.length > 0 ? (
                        <>
                            <Text style={styles.resultCount}>
                                총 {filteredFAQs.length}개의 질문이 있습니다
                            </Text>
                            {filteredFAQs.map((item) => (
                                <FAQItem
                                    key={item.id}
                                    question={item.question}
                                    answer={item.answer}
                                    isExpanded={expandedItems.has(item.id)}
                                    onToggle={() => toggleExpanded(item.id)}
                                />
                            ))}
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
                        <TouchableOpacity style={styles.helpButton}>
                            <Text style={styles.helpButtonText}>1:1 문의하기</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.bottomSpacing} />
                </ScrollView>
            </View>
        </>
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
    pageTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1A1A1A',
        marginBottom: 4,
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
    },
});