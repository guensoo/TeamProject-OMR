import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useState } from 'react';
import { useRoute } from '@react-navigation/native';

export const SupportNavbar = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [pressedButton, setPressedButton] = useState(null);

    const handlePressIn = (buttonName) => {
        setPressedButton(buttonName);
    };

    const handlePressOut = () => {
        setPressedButton(null);
    };

    const navItems = [
        {
            key: 'FAQ',
            label: 'FAQ',
            icon: '❓',
            route: 'FAQ'
        },
        {
            key: 'Notice',
            label: '공지사항',
            icon: '📢',
            route: 'Notice'
        },
        {
            key: 'QnA',
            label: '1:1문의',
            icon: '💬',
            route: 'QnA'
        }
    ];

    const isActive = (routeName) => {
        return route.name === routeName;
    };

    return (
        <View style={styles.container}>
            <View style={styles.navWrapper}>
                {navItems.map((item, index) => (
                    <View key={item.key} style={styles.navItemWrapper}>
                        <TouchableOpacity
                            style={[
                                styles.navButton,
                                isActive(item.route) && styles.navButtonActive,
                                pressedButton === item.key && styles.navButtonPressed
                            ]}
                            onPress={() => navigation.navigate(item.route)}
                            onPressIn={() => handlePressIn(item.key)}
                            onPressOut={handlePressOut}
                            activeOpacity={1}
                        >
                            <View style={styles.navButtonContent}>
                                <Text style={[
                                    styles.navIcon,
                                    isActive(item.route) && styles.navIconActive,
                                    pressedButton === item.key && styles.navIconPressed
                                ]}>
                                    {item.icon}
                                </Text>
                                <Text style={[
                                    styles.navText,
                                    isActive(item.route) && styles.navTextActive,
                                    pressedButton === item.key && styles.navTextPressed
                                ]}>
                                    {item.label}
                                </Text>
                            </View>
                            
                            {/* 활성 상태 인디케이터 */}
                            {isActive(item.route) && (
                                <View style={styles.activeIndicator} />
                            )}
                            
                            {/* 터치 시 밑줄 */}
                            {pressedButton === item.key && !isActive(item.route) && (
                                <View style={styles.pressedIndicator} />
                            )}
                        </TouchableOpacity>
                        
                        {/* 구분선 (마지막 아이템 제외) */}
                        {index < navItems.length - 1 && (
                            <View style={styles.divider} />
                        )}
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E9ECEF',
        paddingVertical: 8,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 8,
    },
    navWrapper: {
        flexDirection: 'row',
        paddingHorizontal: 12,
    },
    navItemWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    navButton: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderRadius: 12,
        marginHorizontal: 4,
        backgroundColor: 'transparent',
        position: 'relative',
        minHeight: 60,
        justifyContent: 'center',
    },
    navButtonActive: {
        backgroundColor: '#F0F8FF',
        transform: [{ scale: 1.02 }],
    },
    navButtonPressed: {
        backgroundColor: '#E8F4FD',
        transform: [{ scale: 0.98 }],
    },
    navButtonContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    navIcon: {
        fontSize: 20,
        marginBottom: 4,
        opacity: 0.6,
    },
    navIconActive: {
        opacity: 1,
        transform: [{ scale: 1.1 }],
    },
    navIconPressed: {
        opacity: 0.8,
        transform: [{ scale: 1.05 }],
    },
    navText: {
        fontSize: 13,
        fontWeight: '500',
        color: '#6C757D',
        textAlign: 'center',
        lineHeight: 16,
    },
    navTextActive: {
        color: '#007AFF',
        fontWeight: '600',
        transform: [{ scale: 1.05 }],
    },
    navTextPressed: {
        color: '#0066CC',
        fontWeight: '600',
    },
    activeIndicator: {
        position: 'absolute',
        bottom: 0,
        left: '20%',
        right: '20%',
        height: 3,
        backgroundColor: '#007AFF',
        borderRadius: 2,
    },
    pressedIndicator: {
        position: 'absolute',
        bottom: 0,
        left: '25%',
        right: '25%',
        height: 2,
        backgroundColor: '#0066CC',
        borderRadius: 1,
        opacity: 0.6,
    },
    divider: {
        width: 1,
        height: 24,
        backgroundColor: '#E9ECEF',
        alignSelf: 'center',
        marginHorizontal: 8,
    },
});