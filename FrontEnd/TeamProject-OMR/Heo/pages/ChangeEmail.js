import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';

const ChangeEmail = () => {
    const [currentEmail, setCurrentEmail] = useState('');
    const [newEmail, setNewEmail] = useState('');

    const handleEmailChange = () => {
        if (!currentEmail || !newEmail) {
            Alert.alert('오류', '모든 항목을 입력해주세요.');
            return;
        }

        // 여기에 이메일 변경 API 요청 로직을 추가하면 됩니다.
        console.log('현재 이메일:', currentEmail);
        console.log('새 이메일:', newEmail);

        Alert.alert('완료', '이메일이 성공적으로 변경되었습니다.');
        // 변경 후 필요한 추가 로직 (예: 로그아웃 또는 프로필 업데이트 등)
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>이메일 변경</Text>

            <Text style={styles.label}>현재 이메일</Text>
            <TextInput
                style={styles.input}
                value={currentEmail}
                onChangeText={setCurrentEmail}
                placeholder="현재 이메일 입력"
                autoCapitalize="none"
                keyboardType="email-address"
            />

            <Text style={styles.label}>새 이메일</Text>
            <TextInput
                style={styles.input}
                value={newEmail}
                onChangeText={setNewEmail}
                placeholder="새 이메일 입력"
                autoCapitalize="none"
                keyboardType="email-address"
            />

            <TouchableOpacity style={styles.button} onPress={handleEmailChange}>
                <Text style={styles.buttonText}>이메일 변경</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flex: 1,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        marginTop: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
    },
    button: {
        marginTop: 30,
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ChangeEmail;
