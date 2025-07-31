import { useEffect, useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet } from "react-native";
import { resetPassword } from "../../All/api/UserApi";
import { useRoute, useNavigation } from "@react-navigation/native";

const ResetPassword = () => {

    const route = useRoute();
    const navigation = useNavigation();

    const token = route.params?.token ?? null; //딥링크에서 받은 토큰
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        if (!token) {
            Alert.alert("오류", "비밀번호 재설정 토큰이 없습니다.", [
                { text: "확인", onPress: () => navigation.navigate("FindPassword") },
            ]);
        }
    }, [token, navigation]);

    const handleReset = async () => {
        if (!newPassword) {
            Alert.alert('오류', '새 비밀번호를 입력해주세요.');
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert('오류', '비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            const message = await resetPassword(token, newPassword);
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
        padding: 20,
    },
    input: {
        borderWidth: 1,
        marginBottom: 12,
        padding: 8,
    },
})

export default ResetPassword;