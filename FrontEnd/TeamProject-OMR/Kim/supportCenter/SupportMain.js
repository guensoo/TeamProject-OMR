import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Header from "../../Heo/components/Header";
import { SupportNavbar } from "./SupportNavbar";
import { useContext } from "react";
import { SupportContext } from '../context/SupportContext'
import { QnA } from "./QnA";
import { Notice } from "./Notice";
import { FAQ } from "./FAQ";
import { SafeAreaView } from "react-native-safe-area-context";

export const SupportMain = () => {
    const navigation = useNavigation();

    const { supportData, setSupportData } = useContext(SupportContext);

    const supportMenus = [
        {
            id: 'faq',
            title: 'FAQ',
            subtitle: '자주 묻는 질문',
            description: '가장 많이 문의하는 질문들과 답변을 확인하세요',
            icon: '❓',
            color: '#4285F4',
            route: 'FAQ'
        },
        {
            id: 'notice',
            title: '공지사항',
            subtitle: 'Notice',
            description: '서비스 업데이트 및 중요한 공지사항을 확인하세요',
            icon: '📢',
            color: '#FF6B6B',
            route: 'Notice'
        },
        {
            id: 'qna',
            title: '1:1 문의',
            subtitle: 'Q&A',
            description: '개인적인 문의사항이나 건의사항을 남겨주세요',
            icon: '💬',
            color: '#34A853',
            route: 'QnA'
        }
    ];

    const quickActions = [
        {
            id: 'contact',
            title: '연락처',
            description: '고객센터 전화번호',
            value: '1588-0000',
            icon: '📞',
            action: () => { }
        },
        {
            id: 'email',
            title: '이메일',
            description: '문의 이메일 주소',
            value: 'support@example.com',
            icon: '📧',
            action: () => { }
        },
        {
            id: 'hours',
            title: '운영시간',
            description: '고객센터 운영시간',
            value: '평일 09:00-18:00',
            icon: '🕒',
            action: () => { }
        }
    ];

    const handleMenuPress = (route) => {
        navigation.navigate(route);
    };

    if (supportData === 'QnA') {
        return <QnA />
    }

    if (supportData === 'Notice') {
        return <Notice />
    }

    if (supportData === 'FAQ') {
        return <FAQ />
    }

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <>
                <SupportNavbar />

                <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                    {/* 환영 메시지 */}
                    <View style={styles.welcomeSection}>
                        <Text style={styles.welcomeTitle}>고객지원센터</Text>
                        <Text style={styles.welcomeSubtitle}>
                            무엇을 도와드릴까요?
                        </Text>
                    </View>

                    {/* 메인 메뉴 카드들 */}
                    <View style={styles.menuSection}>
                        {supportMenus.map((menu) => (
                            <TouchableOpacity
                                key={menu.id}
                                style={[styles.menuCard, { borderLeftColor: menu.color }]}
                                onPress={() => handleMenuPress(menu.route)}
                                activeOpacity={0.7}
                            >
                                <View style={styles.menuCardContent}>
                                    <View style={styles.menuCardHeader}>
                                        <View style={[styles.menuIcon, { backgroundColor: menu.color + '20' }]}>
                                            <Text style={styles.menuIconText}>{menu.icon}</Text>
                                        </View>
                                        <View style={styles.menuCardInfo}>
                                            <Text style={styles.menuTitle}>{menu.title}</Text>
                                            <Text style={styles.menuSubtitle}>{menu.subtitle}</Text>
                                        </View>
                                        <View style={styles.menuArrow}>
                                            <Text style={styles.menuArrowText}>›</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.menuDescription}>{menu.description}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* 빠른 정보 섹션 */}
                    <View style={styles.quickSection}>
                        <Text style={styles.sectionTitle}>빠른 정보</Text>
                        <View style={styles.quickGrid}>
                            {quickActions.map((action) => (
                                <TouchableOpacity
                                    key={action.id}
                                    style={styles.quickCard}
                                    onPress={action.action}
                                    activeOpacity={0.7}
                                >
                                    <View style={styles.quickIcon}>
                                        <Text style={styles.quickIconText}>{action.icon}</Text>
                                    </View>
                                    <Text style={styles.quickTitle}>{action.title}</Text>
                                    <Text style={styles.quickDescription}>{action.description}</Text>
                                    <Text style={styles.quickValue}>{action.value}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* 도움말 섹션 */}
                    <View style={styles.helpSection}>
                        <View style={styles.helpCard}>
                            <View style={styles.helpIcon}>
                                <Text style={styles.helpIconText}>💡</Text>
                            </View>
                            <View style={styles.helpContent}>
                                <Text style={styles.helpTitle}>도움이 필요하신가요?</Text>
                                <Text style={styles.helpDescription}>
                                    FAQ를 먼저 확인해보시고, 원하는 답변을 찾지 못하셨다면
                                    1:1 문의를 통해 언제든지 연락주세요.
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* 하단 여백 */}
                    <View style={styles.bottomSpacing} />
                </ScrollView>
            </>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },

    // 환영 섹션
    welcomeSection: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        marginBottom: 8,
    },
    welcomeTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1A1A1A',
        marginBottom: 4,
    },
    welcomeSubtitle: {
        fontSize: 16,
        color: '#666',
        lineHeight: 22,
    },

    // 메뉴 섹션
    menuSection: {
        paddingHorizontal: 20,
        marginBottom: 24,
    },
    menuCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginBottom: 12,
        borderLeftWidth: 4,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    menuCardContent: {
        padding: 20,
    },
    menuCardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    menuIcon: {
        width: 48,
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    menuIconText: {
        fontSize: 20,
    },
    menuCardInfo: {
        flex: 1,
    },
    menuTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1A1A1A',
        marginBottom: 2,
    },
    menuSubtitle: {
        fontSize: 14,
        color: '#666',
    },
    menuArrow: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuArrowText: {
        fontSize: 20,
        color: '#CCC',
        fontWeight: '300',
    },
    menuDescription: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        paddingLeft: 64,
    },

    // 빠른 정보 섹션
    quickSection: {
        paddingHorizontal: 20,
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1A1A1A',
        marginBottom: 16,
    },
    quickGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    quickCard: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        marginHorizontal: 4,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    quickIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F0F8FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    quickIconText: {
        fontSize: 18,
    },
    quickTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1A1A1A',
        marginBottom: 4,
        textAlign: 'center',
    },
    quickDescription: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
        marginBottom: 6,
    },
    quickValue: {
        fontSize: 12,
        fontWeight: '500',
        color: '#4285F4',
        textAlign: 'center',
    },

    // 도움말 섹션
    helpSection: {
        paddingHorizontal: 20,
        marginBottom: 24,
    },
    helpCard: {
        backgroundColor: '#FFF8E1',
        borderRadius: 12,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderWidth: 1,
        borderColor: '#FFF3C4',
    },
    helpIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFEB3B',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    helpIconText: {
        fontSize: 18,
    },
    helpContent: {
        flex: 1,
    },
    helpTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1A1A1A',
        marginBottom: 6,
    },
    helpDescription: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },

    // 하단 여백
    bottomSpacing: {
        height: 20,
    },
});