import { useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet } from "react-native";
import { resetPassword } from "../../All/api/UserApi";

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,16}$/;

const ResetPassword = ({ route, navigation }) => {
    const { userId } = route.params;
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleReset = async () => {
        if (!newPassword) {
            Alert.alert('오류', '새 비밀번호를 입력해주세요.');
            return;
        }

        if (!passwordRegex.test(newPassword)) {
            Alert.alert('오류', '비밀번호는 영문, 숫자, 특수문자를 포함해 8~16자여야 합니다.');
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert('오류', '비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            const message = await resetPassword(userId, newPassword);
            Alert.alert("성공", message, [
                { text: "확인", onPress: () => navigation.navigate('Login') }
            ])
        } catch (error) {
            Alert.alert("실패", error.message);
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="새 비밀번호 입력"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
                style={styles.input}
            />
            <Text style={styles.helperText}>
                ※ 비밀번호는 영문, 숫자, 특수문자를 포함한 8~16자여야 합니다.
            </Text>
            <TextInput
                placeholder="새 비밀번호 확인"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                style={styles.input}
            />
            <Button title="비밀번호 재설정" onPress={handleReset} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
        backgroundColor: '#f9f9f9',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 16,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    button: {
        marginTop: 8,
        backgroundColor: '#007BFF',
        borderRadius: 8,
        paddingVertical: 14,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
    },
    helperText: {
        fontSize: 12,
        color: '#888',
        marginBottom: 16,
        marginLeft: 4,
    },
})

export default ResetPassword;