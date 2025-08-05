import { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { UserContext } from '../../All/context/UserContext';
import { formatDate } from "../utils/FormatDate";
import { useNavigation } from "@react-navigation/native";

const MyPage = () => {
    const { user, logoutUserInfo } = useContext(UserContext);
    const navigation = useNavigation();

    const menuItems = [
        { icon: "settings-outline", title: "계정 설정", color: "#6C63FF", screen: "AccountSettings" },
        { icon: "notifications-outline", title: "알림 설정", color: "#FF6B6B", screen: "Notifications" },
        { icon: "help-circle-outline", title: "고객 지원", color: "#4ECDC4", screen: "Support" },
        // { icon: "document-text-outline", title: "이용약관", color: "#45B7D1" },
    ];

    if (!user) return null;

    const handleLogout = () => {
        Alert.alert("로그아웃", "로그아웃 하시겠습니까?", [
            { text: '취소', style: 'cancel' },
            {
                text: '확인',
                onPress: () => {
                    Alert.alert("로그아웃", "로그아웃 되셨습니다.");
                    logoutUserInfo();
                    navigation.navigate("BottomTabMenu", { screen: 'Home' })
                }
            }
        ])
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* 헤더 그라데이션 */}
            <LinearGradient
                colors={['#667eea', '#764ba2']}
                style={styles.headerGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={styles.profileSection}>
                    <View style={styles.avatarContainer}>
                        <LinearGradient
                            colors={['#FF6B6B', '#4ECDC4']}
                            style={styles.avatarGradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        >
                            <Ionicons name="person" size={50} color="#fff" />
                        </LinearGradient>
                    </View>
                    <Text style={styles.welcomeText}>안녕하세요!</Text>
                    <Text style={styles.nicknameText}>{user.nickname} 님</Text>
                </View>
            </LinearGradient>

            {/* 사용자 정보 카드 */}
            <View style={styles.contentContainer}>
                <View style={styles.infoCard}>
                    <Text style={styles.cardTitle}>내 정보</Text>

                    <View style={styles.infoItem}>
                        <View style={[styles.iconContainer, { backgroundColor: '#FF6B6B20' }]}>
                            <Ionicons name="mail" size={20} color="#FF6B6B" />
                        </View>
                        <View style={styles.infoContent}>
                            <Text style={styles.infoLabel}>이메일</Text>
                            <Text style={styles.infoValue}>{user.email}</Text>
                        </View>
                    </View>

                    <View style={styles.infoItem}>
                        <View style={[styles.iconContainer, { backgroundColor: '#4ECDC420' }]}>
                            <Ionicons name="calendar" size={20} color="#4ECDC4" />
                        </View>
                        <View style={styles.infoContent}>
                            <Text style={styles.infoLabel}>가입일</Text>
                            <Text style={styles.infoValue}>{formatDate(user.createAt)}</Text>
                        </View>
                    </View>
                </View>

                {/* 메뉴 섹션 */}
                <View style={styles.menuCard}>
                    <Text style={styles.cardTitle}>설정</Text>
                    {menuItems.map((item, index) => (
                        <TouchableOpacity 
                            key={index} 
                            style={styles.menuItem}
                            onPress={() => navigation.navigate(item.screen)}
                        >
                            <View style={[styles.menuIconContainer, { backgroundColor: `${item.color}20` }]}>
                                <Ionicons name={item.icon} size={22} color={item.color} />
                            </View>
                            <Text style={styles.menuText}>{item.title}</Text>
                            <Ionicons name="chevron-forward" size={20} color="#C4C4C4" />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* 통계 카드 */}
                <View style={styles.statsCard}>
                    <Text style={styles.cardTitle}>활동 통계</Text>
                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>12</Text>
                            <Text style={styles.statLabel}>게시글</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>34</Text>
                            <Text style={styles.statLabel}>댓글</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>56</Text>
                            <Text style={styles.statLabel}>좋아요</Text>
                        </View>
                    </View>
                </View>

                {/* 로그아웃 버튼 */}
                <TouchableOpacity style={styles.logoutButton} onPress={() => handleLogout()}>
                    <LinearGradient
                        colors={['#FF6B6B', '#FF8E8E']}
                        style={styles.logoutGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Ionicons name="log-out-outline" size={22} color="#fff" />
                        <Text style={styles.logoutText}>로그아웃</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8FAFB",
    },
    headerGradient: {
        paddingTop: 60,
        paddingBottom: 40,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    profileSection: {
        alignItems: "center",
        paddingHorizontal: 20,
    },
    avatarContainer: {
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
    },
    avatarGradient: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    welcomeText: {
        fontSize: 16,
        color: "#ffffff80",
        marginBottom: 4,
    },
    nicknameText: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#ffffff",
        textAlign: "center",
    },
    contentContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 30,
    },
    infoCard: {
        backgroundColor: "#ffffff",
        borderRadius: 20,
        padding: 24,
        marginBottom: 20,
        shadowColor: "#667eea",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
    },
    menuCard: {
        backgroundColor: "#ffffff",
        borderRadius: 20,
        padding: 24,
        marginBottom: 20,
        shadowColor: "#667eea",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
    },
    statsCard: {
        backgroundColor: "#ffffff",
        borderRadius: 20,
        padding: 24,
        marginBottom: 30,
        shadowColor: "#667eea",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#2D3748",
        marginBottom: 20,
    },
    infoItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16,
    },
    infoContent: {
        flex: 1,
    },
    infoLabel: {
        fontSize: 14,
        color: "#718096",
        marginBottom: 2,
    },
    infoValue: {
        fontSize: 16,
        color: "#2D3748",
        fontWeight: "600",
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#F7FAFC",
    },
    menuIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16,
    },
    menuText: {
        flex: 1,
        fontSize: 16,
        color: "#2D3748",
        fontWeight: "500",
    },
    statsRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    statItem: {
        alignItems: "center",
        flex: 1,
    },
    statNumber: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#667eea",
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 14,
        color: "#718096",
    },
    statDivider: {
        width: 1,
        height: 40,
        backgroundColor: "#E2E8F0",
    },
    logoutButton: {
        borderRadius: 16,
        overflow: "hidden",
        shadowColor: "#FF6B6B",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
        marginBottom: 20,
    },
    logoutGradient: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 16,
        paddingHorizontal: 32,
    },
    logoutText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 8,
    },
});

export default MyPage;