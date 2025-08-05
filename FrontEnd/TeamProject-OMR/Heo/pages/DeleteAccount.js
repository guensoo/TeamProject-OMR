import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';

const DeleteAccount = ({ navigation }) => {
    const [password, setPassword] = useState('');

    const handleDeleteAccount = () => {
        if (!password) {
            Alert.alert('오류', '비밀번호를 입력해주세요.');
            return;
        }

        Alert.alert(
            '회원 탈퇴',
            '정말로 회원 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.',
            [
                {
                    text: '취소',
                    style: 'cancel',
                },
                {
                    text: '탈퇴',
                    style: 'destructive',
                    onPress: () => {
                        // 여기서 실제 API 요청으로 탈퇴 처리
                        console.log('탈퇴 요청 보냄. 비밀번호:', password);

                        // 탈퇴 성공 시 처리
                        Alert.alert('탈퇴 완료', '정상적으로 회원 탈퇴 처리되었습니다.');
                        // navigation.navigate('Login'); // 또는 앱 초기 화면 등
                    },
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>회원 탈퇴</Text>

            <Text style={styles.description}>
                회원 탈퇴를 위해 비밀번호를 입력해주세요.
            </Text>

            <TextInput
                style={styles.input}
                placeholder="비밀번호 입력"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
                <Text style={styles.deleteButtonText}>회원 탈퇴</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        color: '#555',
        marginBottom: 30,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
    deleteButton: {
        backgroundColor: '#ff3b30',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 30,
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default DeleteAccount;