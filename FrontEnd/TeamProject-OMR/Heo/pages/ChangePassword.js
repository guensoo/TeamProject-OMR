import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handlePasswordChange = () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            Alert.alert('오류', '모든 항목을 입력해주세요.');
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert('오류', '새 비밀번호가 일치하지 않습니다.');
            return;
        }

        if (newPassword.length < 6) {
            Alert.alert('오류', '비밀번호는 6자 이상이어야 합니다.');
            return;
        }

        // 여기에 비밀번호 변경 API 요청 로직을 추가
        console.log('현재 비밀번호:', currentPassword);
        console.log('새 비밀번호:', newPassword);

        Alert.alert('완료', '비밀번호가 성공적으로 변경되었습니다.');
        // 성공 후 로그아웃 처리 등 추가 로직 가능
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>비밀번호 변경</Text>

            <Text style={styles.label}>현재 비밀번호</Text>
            <TextInput
                style={styles.input}
                value={currentPassword}
                onChangeText={setCurrentPassword}
                placeholder="현재 비밀번호 입력"
                secureTextEntry
            />

            <Text style={styles.label}>새 비밀번호</Text>
            <TextInput
                style={styles.input}
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="새 비밀번호 입력"
                secureTextEntry
            />

            <Text style={styles.label}>새 비밀번호 확인</Text>
            <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="비밀번호 재입력"
                secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handlePasswordChange}>
                <Text style={styles.buttonText}>비밀번호 변경</Text>
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

export default ChangePassword;
