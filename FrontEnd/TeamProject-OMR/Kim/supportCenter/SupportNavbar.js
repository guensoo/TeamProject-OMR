import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useState } from 'react';

export const SupportNavbar = () => {
    const navigation = useNavigation();
    const [pressedButton, setPressedButton] = useState(null);

    const handlePressIn = (buttonName) => {
        setPressedButton(buttonName);
    };

    const handlePressOut = () => {
        setPressedButton(null);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={styles.navButton} 
                onPress={() => navigation.navigate('FAQ')}
                onPressIn={() => handlePressIn('FAQ')}
                onPressOut={handlePressOut}
                activeOpacity={1}
            >
                <Text style={[
                    styles.navText,
                    pressedButton === 'FAQ' && styles.pressedText
                ]}>
                    FAQ
                </Text>
                {pressedButton === 'FAQ' && <View style={styles.underline} />}
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity 
                style={styles.navButton} 
                onPress={() => navigation.navigate('Notice')}
                onPressIn={() => handlePressIn('Notice')}
                onPressOut={handlePressOut}
                activeOpacity={1}
            >
                <Text style={[
                    styles.navText,
                    pressedButton === 'Notice' && styles.pressedText
                ]}>
                    공지사항
                </Text>
                {pressedButton === 'Notice' && <View style={styles.underline} />}
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity 
                style={styles.navButton} 
                onPress={() => navigation.navigate('QnA')}
                onPressIn={() => handlePressIn('QnA')}
                onPressOut={handlePressOut}
                activeOpacity={1}
            >
                <Text style={[
                    styles.navText,
                    pressedButton === 'QnA' && styles.pressedText
                ]}>
                    1:1문의
                </Text>
                {pressedButton === 'QnA' && <View style={styles.underline} />}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    navButton: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        backgroundColor: '#f8f9fa',
        marginHorizontal: 5,
    },
    navText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333333',
        textAlign: 'center',
    },
    pressedText: {
        color: '#007AFF',
    },
    underline: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 2,
        backgroundColor: '#007AFF',
        borderRadius: 1,
    },
    divider: {
        width: 1,
        backgroundColor: '#e0e0e0',
        marginHorizontal: 5,
    },
});