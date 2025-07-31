import { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, Alert, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { registerUser } from "../../All/api/UserApi";

const Signup = () => {
    const navigation = useNavigation();

    const [id, setId] = useState('');
    const [nickName, setNickName] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [passwordCheck, setPasswordCheck] = useState('');
    const [isPasswordCheckVisible, setIsPasswordCheckVisible] = useState(false);
    const [email, setEmail] = useState('');

    const [idError, setIdError] = useState('');
    const [nickNameError, setNickNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordCheckError, setPasswordCheckError] = useState('');
    const [emailError, setEmailError] = useState('');

    useEffect(() => {
        if(passwordCheck && password !== passwordCheck) {
            setPasswordCheckError('비밀번호가 일치하지 않습니다.');
        } else {
            setPasswordCheckError('');
        }
    },[password, passwordCheck])

    const handleSignup = async () => {
        // 회원가입 로직 구현
        let valid = true;

        if (!id) {
            setIdError('아이디를 입력해주세요.')
            valid = false;
        }

        if(!nickName) {
            setNickNameError("닉네임을 입력해주세요.")
            valid = false;
        }

        if (!password) {
            setPasswordError("비밀번호를 입력해주세요.")
            valid = false;
        }

        if(!passwordCheck) {
            setPasswordCheckError("비밀번호를 재입력해주세요.");
            valid = false;
        }

        if (password !== passwordCheck) {
            setPasswordCheckError('비밀번호가 일치하지 않습니다.');
            valid = false;
        }

        if (!email) {
            setEmailError("이메일을 입력해주세요.")
            valid = false;
        }

        if(!valid) return;

        try {
            const userData = {
                userId: id,
                nickname: nickName,
                password: password,
                email: email,
            }

            await registerUser(userData);
            // Alert.alert("완료", "회원가입 성공");
            navigation.navigate('Login');
        } catch (error) {
            Alert.alert("회원가입 실패", error.message)
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
                                        if(text) setPasswordError('');
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
                            <TextInput
                                style={styles.input}
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
                            {emailError && <Text style={styles.errorText}>{emailError}</Text>}
                        </View>

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
});

export default Signup;