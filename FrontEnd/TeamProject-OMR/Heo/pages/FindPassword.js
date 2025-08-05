import { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { findPassword } from "../../All/api/UserApi";
import { useRoute } from "@react-navigation/native";
import { sendResetCode, verifyResetCode } from "../../All/api/UserApi";

const FindPassword = ({ navigation }) => {
    // const navigation = useNavigation();
    // const route = useRoute();
    
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [authCode, setAuthCode] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);

    const [isSendingCode, setIsSendingCode] = useState(false);
    const [isVerifyingCode, setIsVerifyingCode] = useState(false);

    const [idError, setIdError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [codeError, setCodeError] = useState('');

    const handleSendCode = async () => {
        if (!id) {
            setIdError("아이디를 입력해주세요.");
            return;
        }

        if (!email) {
            setEmailError("이메일을 입력해주세요.");
            return;
        }

        // 간단 이메일 유효성 검사
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError("유효한 이메일 주소를 입력해주세요.");
            return;
        }

        setIdError('');
        setEmailError('');

        try {
            setIsSendingCode(true);
            const res = await sendResetCode(id, email);
            Alert.alert("완료", res.message || "인증코드 발송 완료");
            setIsCodeSent(true);
        } catch (error) {
            Alert.alert("오류", error.message);
        } finally {
            setIsSendingCode(false);
        }
    };

    // 2) 인증코드 검증 후 ResetPassword 화면으로 이동
    const handleVerifyCode = async () => {
        if (!authCode) {
            setCodeError('인증코드를 입력해주세요.');
            return;
        }
        console.log("id:", id)
        setCodeError('');
        try {
            setIsVerifyingCode(true);
            await verifyResetCode(email, authCode);
            Alert.alert('성공', '인증 성공', [
                {
                    text: '확인',
                    onPress: () =>
                        navigation.navigate('ResetPassword', {
                            userId: id,
                        }),
                },
            ]);
        } catch (err) {
            Alert.alert('오류', err.message);
        } finally {
            setIsVerifyingCode(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <View style={styles.content}>
                    <View style={styles.form}>
                        {!isCodeSent ? (
                            <>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.inputLabel}>아이디</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="가입하신 아이디를 입력하세요."
                                        placeholderTextColor="#9CA3AF"
                                        value={id}
                                        onChangeText={(text) => {
                                            setId(text);
                                            if (text) setIdError('');
                                        }}
                                        keyboardType="default"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                    />
                                    {idError && <Text style={styles.errorText}>{idError}</Text>}
                                </View>

                                <View style={styles.inputContainer}>
                                    <Text style={styles.inputLabel}>이메일</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="가입하신 이메일을 입력하세요."
                                        placeholderTextColor="#9CA3AF"
                                        value={email}
                                        onChangeText={(text) => {
                                            setEmail(text);
                                            if (text) setEmailError('');
                                        }}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                    />
                                    {emailError && <Text style={styles.errorText}>{emailError}</Text>}
                                </View>

                                <TouchableOpacity style={styles.findButton} onPress={handleSendCode} disabled={isSendingCode}>
                                    {isSendingCode ? (
                                        <ActivityIndicator size="small" color="#ffffff" />
                                    ) : (
                                        <Text style={styles.findButtonText}>인증코드 보내기</Text>
                                    )}
                                </TouchableOpacity>
                            </>
                        ) : (
                            <>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.inputLabel}>인증코드</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="이메일로 받은 인증코드를 입력하세요."
                                        placeholderTextColor="#9CA3AF"
                                        value={authCode}
                                        onChangeText={(text) => {
                                            setAuthCode(text);
                                            if (text) setCodeError('');
                                        }}
                                        keyboardType="number-pad"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                    />
                                    {codeError && <Text style={styles.errorText}>{codeError}</Text>}
                                </View>

                                <TouchableOpacity style={styles.findButton} onPress={handleVerifyCode}>
                                    {isVerifyingCode ? (
                                        <ActivityIndicator size="small" color="#ffffff" />
                                    ) : (
                                        <Text style={styles.findButtonText}>인증코드 확인</Text>
                                    )}
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => setIsCodeSent(false)} style={{ marginTop: 20, marginBottom: 10 }}>
                                    <Text style={{ color: 'blue', textAlign: 'center' }}>인증코드 재전송</Text>
                                </TouchableOpacity>
                            </>
                        )}
                        {/* 조건문 끝 */}
                        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                            <Text style={styles.goLoginText}>로그인 화면으로 돌아가기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

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

export default FindPassword;