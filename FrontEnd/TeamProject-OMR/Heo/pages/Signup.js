import { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, Alert, ScrollView, ActivityIndicator } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { registerUser, sendSignupCode, verifySignupCode } from "../../All/api/UserApi";

const Signup = () => {
    const navigation = useNavigation();

    const [id, setId] = useState('');
    const [nickName, setNickName] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [passwordCheck, setPasswordCheck] = useState('');
    const [isPasswordCheckVisible, setIsPasswordCheckVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [emailCode, setEmailCode] = useState('');

    const [emailVerified, setEmailVerified] = useState(false);
    const [showVerificationInput, setShowVerificationInput] = useState(false);
    const [isSendingCode, setIsSendingCode] = useState(false);

    const [idError, setIdError] = useState('');
    const [nickNameError, setNickNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordCheckError, setPasswordCheckError] = useState('');
    const [emailError, setEmailError] = useState('');

    const validateId = () => {
        const idRegex = /^[a-z0-9]{4,12}$/;
        if (!id) {
            setIdError('아이디를 입력해주세요.');
            return false;
        }
        if (!idRegex.test(id)) {
            setIdError('아이디는 4~12자 영문 소문자 및 숫자만 가능합니다.');
            return false;
        }
        setIdError('');
        return true;
    };

    const validateNickName = () => {
        const nickNameRegex = /^[가-힣a-zA-Z0-9]{2,8}$/;
        if (!nickName) {
            setNickNameError('닉네임을 입력해주세요.');
            return false;
        }
        if (!nickNameRegex.test(nickName)) {
            setNickNameError('닉네임은 2~8자 한글, 영문, 숫자만 가능합니다.');
            return false;
        }
        setNickNameError('');
        return true;
    };

    const validatePassword = () => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,16}$/;
        if (!password) {
            setPasswordError('비밀번호를 입력해주세요.');
            return false;
        }
        if (!passwordRegex.test(password)) {
            setPasswordError('비밀번호는 8~16자, 영문/숫자/특수문자를 포함해야 합니다.');
            return false;
        }
        setPasswordError('');
        return true;
    };

    const validatePasswordCheck = () => {
        if (!passwordCheck) {
            setPasswordCheckError('비밀번호를 재입력해주세요.');
            return false;
        }
        if (password !== passwordCheck) {
            setPasswordCheckError('비밀번호가 일치하지 않습니다.');
            return false;
        }
        setPasswordCheckError('');
        return true;
    };

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            setEmailError('이메일을 입력해주세요.');
            return false;
        }
        if (!emailRegex.test(email)) {
            setEmailError('유효한 이메일 주소를 입력해주세요.(example@naver.com)');
            return false;
        }
        setEmailError('');
        return true;
    };

    const handleSignup = async () => {
        // 회원가입 로직 구현

        const isValid =
            validateId() &&
            validateNickName() &&
            validatePassword() &&
            validatePasswordCheck() &&
            validateEmail();

        if (!isValid) return;

        try {
            const userData = {
                userId: id,
                nickname: nickName,
                password: password,
                email: email,
            }

            await registerUser(userData);
            Alert.alert("완료", "회원가입 성공");
            navigation.navigate('Login');
        } catch (error) {
            Alert.alert("회원가입 실패", error.message)
        }

    };

    const handleSendCode = async () => {
        if (!validateEmail()) return;

        setIsSendingCode(true);

        try {
            const result = await sendSignupCode(email);
            Alert.alert("성공", "인증 코드가 이메일로 전송되었습니다.");
            setShowVerificationInput(true);
        } catch (error) {
            Alert.alert("실패", error.message);
        } finally {
            setIsSendingCode(false);
        }
    }

    const handleVerifyCode = async () => {
        if (emailCode.length !== 6) {
            Alert.alert("오류", "6자리 인증 코드를 입력해주세요.");
            return;
        }
        try {
            const result = await verifySignupCode(email, emailCode);
            Alert.alert("성공", "이메일 인증이 완료되었습니다.");
            setShowVerificationInput(false);
            setEmailVerified(true);
        } catch (error) {
            Alert.alert("실패", error.message);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
                    {/* 입력 폼 */}
                    <View style={styles.form}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>아이디</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="아이디를 입력하세요."
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
                            <Text style={styles.inputLabel}>닉네임</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="닉네임을 입력하세요."
                                placeholderTextColor="#9CA3AF"
                                value={nickName}
                                onChangeText={(text) => {
                                    setNickName(text);
                                    if (text) setNickNameError('');
                                }}
                                keyboardType="default"
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                            {nickNameError && <Text style={styles.errorText}>{nickNameError}</Text>}
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>비밀번호</Text>
                            <View style={styles.passwordContainer}>
                                <TextInput
                                    style={styles.passwordInput}
                                    placeholder="비밀번호를 입력하세요."
                                    placeholderTextColor="#9CA3AF"
                                    value={password}
                                    onChangeText={(text) => {
                                        setPassword(text);
                                        if (text) setPasswordError('');
                                    }}
                                    secureTextEntry={!isPasswordVisible}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />
                                <TouchableOpacity
                                    style={styles.eyeButton}
                                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                                >
                                    <Text style={styles.eyeText}>
                                        {isPasswordVisible ? '👁️' : '👁️‍🗨️'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>비밀번호 확인</Text>
                            <View style={styles.passwordContainer}>
                                <TextInput
                                    style={styles.passwordInput}
                                    placeholder="비밀번호를 재입력하세요."
                                    placeholderTextColor="#9CA3AF"
                                    value={passwordCheck}
                                    onChangeText={(text) => {
                                        setPasswordCheck(text);
                                        if (text) setPasswordCheckError('');
                                    }}
                                    secureTextEntry={!isPasswordCheckVisible}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />
                                <TouchableOpacity
                                    style={styles.eyeButton}
                                    onPress={() => setIsPasswordCheckVisible(!isPasswordCheckVisible)}
                                >
                                    <Text style={styles.eyeText}>
                                        {isPasswordCheckVisible ? '👁️' : '👁️‍🗨️'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            {passwordCheckError && <Text style={styles.errorText}>{passwordCheckError}</Text>}
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>이메일</Text>
                            <View style={styles.emailRow}>
                                <TextInput
                                    style={[styles.input, { flex: 1 }]}
                                    placeholder="이메일을 입력하세요."
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
                                <TouchableOpacity
                                    style={[styles.verifyButton, isSendingCode && styles.disabledButton]}
                                    onPress={handleSendCode}
                                    disabled={isSendingCode}
                                >
                                    {isSendingCode ? (
                                        <ActivityIndicator size="small" color="#ffffff" />
                                    ) : (
                                        <Text style={styles.verifyButtonText}>인증</Text>
                                    )}
                                </TouchableOpacity>
                            </View>
                            {emailError && <Text style={styles.errorText}>{emailError}</Text>}
                        </View>

                        {/* 인증 입력창 & 버튼 */}
                        {showVerificationInput && (
                            <View style={styles.emailRow}>
                                <TextInput
                                    placeholder="인증 코드 입력"
                                    value={emailCode}
                                    onChangeText={setEmailCode}
                                    style={styles.verifyInput}
                                    keyboardType="number-pad"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    maxLength={6}
                                />
                                <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyCode}>
                                    <Text style={styles.verifyButtonText}>인증 확인</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        {/* 인증 완료 메시지 */}
                        {emailVerified && (
                            <Text style={{ color: 'green', marginLeft: 3 }}>
                                이메일 인증이 완료되었습니다!
                            </Text>
                        )}

                        {/* 회원가입 버튼 */}
                        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
                            <Text style={styles.signupButtonText}>회원가입</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
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
        flexGrow: 1,
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
        height: 48,
        borderWidth: 1.5,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        backgroundColor: '#FAFAFA',
        color: '#111827',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        backgroundColor: '#FAFAFA',
        height: 56,
    },
    passwordInput: {
        flex: 1,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#111827',
    },
    eyeButton: {
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    eyeText: {
        fontSize: 18,
    },
    signupButton: {
        height: 56,
        backgroundColor: '#6366F1',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        marginTop: 14,
        shadowColor: '#6366F1',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    signupButtonText: {
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
    verifyButton: {
        marginLeft: 8,
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: '#007BFF',
        borderRadius: 8,
    },
    verifyButtonFull: {
        marginTop: 10,
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    verifyButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    emailRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    verifyInput: {
        height: 48,
        borderWidth: 1.5,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        backgroundColor: '#FAFAFA',
        color: '#111827',
        minWidth: 140,
    },
});

export default Signup;