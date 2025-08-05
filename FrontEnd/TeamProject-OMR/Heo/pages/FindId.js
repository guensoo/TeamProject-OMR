import { useContext, useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { findId } from '../../All/api/UserApi';
import { measure } from 'react-native-reanimated';

const FindId = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleFindId = async () => {
        if (!email) {
            setError("이메일을 입력해주세요.")
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("유효한 이메일 주소를 입력해주세요.");
            return;
        }

        setError('');

        try {
            const res = await findId(email);
            Alert.alert("아이디 찾기 완료", `회원님의 아이디는 ${res.userId} 입니다.`);
        } catch (error) {
            Alert.alert("오류", error.message || "아이디를 찾을 수 없습니다.");
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <View style={styles.content}>
                    <View style={styles.form}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>이메일</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="가입하신 이메일을 입력하세요."
                                placeholderTextColor="#9CA3AF"
                                value={email}
                                onChangeText={(text) => {
                                    setEmail(text);
                                    if (text) setError('');
                                }}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                            {error && <Text style={styles.errorText}>{error}</Text>}
                        </View>

                        <TouchableOpacity style={styles.findButton} onPress={handleFindId}>
                            <Text style={styles.findButtonText}>아이디 찾기</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                            <Text style={styles.goLoginText}>로그인 화면으로 돌아가기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    keyboardView: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: 'center',
        marginTop: 10,
    },
    form: {
        marginBottom: 32,
    },
    inputContainer: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
    },
    input: {
        height: 56,
        borderWidth: 1.5,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        backgroundColor: '#FAFAFA',
        color: '#111827',
    },
    findButton: {
        height: 56,
        backgroundColor: '#6366F1',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        shadowColor: '#6366F1',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    findButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginLeft: 4,
        marginTop: 6,
    },
    goLoginText: {
        color: '#6366F1',
        fontWeight: '600',
        textAlign: 'center',
        fontSize: 14,
    },
});

export default FindId;