import { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { findPassword } from "../../All/api/UserApi";
import { useRoute } from "@react-navigation/native";

const FindPassword = () => {
    const navigation = useNavigation();
    const route = useRoute();

    // 딥링크에서 받은 토큰 파라미터
    const token = route.params?.token ?? null;

    const [id, setId] = useState('');
    const [email, setEmail] = useState('');

    const [idError, setIdError] = useState('');
    const [emailError, setEmailError] = useState('');

    useEffect(() => {
        if (token) {
            console.log("딥링크 토큰: ", token);

            // 예: 토큰이 있으면 아이디/이메일 입력 없이 바로 비밀번호 재설정 API 호출 등 가능
            // 예: 또는 id/email state 자동 세팅 가능 (아래는 예시)
            // setId(''); // 토큰만으로 재설정 한다면 입력란 숨기고 바로 화면 전환할 수도
            // setEmail('');
        }
    }, [token])

    const handleFindPassword = async () => {
        if (!id) {
            setIdError("아이디를 입력해주세요.");
            return;
        }

        if (!email) {
            setEmailError("이메일을 입력해주세요.");
            return;
        }

        // const idRegex = ;

        // 간단 이메일 유효성 검사
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError("유효한 이메일 주소를 입력해주세요.");
            return;
        }

        setIdError('');
        setEmailError('');

        try {
            const res = await findPassword(id, email);
            Alert.alert("완료", res.message || "비밀번호 재설정 링크가 이메일로 발송되었습니다.");
        } catch (error) {
            Alert.alert("오류", error.message || "비밀번호를 찾을 수 없습니다.");
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

                        <TouchableOpacity style={styles.findButton} onPress={handleFindPassword}>
                            <Text style={styles.findButtonText}>비밀번호 재설정 링크 보내기</Text>
                        </TouchableOpacity>

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