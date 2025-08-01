import { useContext, useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { loginUser } from '../../All/api/UserApi';
import { UserContext } from '../../All/context/UserContext';

const Login = () => {
    const navigation = useNavigation();
    const { loginUserInfo } = useContext(UserContext);

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleLogin = async () => {
        // 로그인 로직 구현
        if(!id){
            Alert.alert("아이디 미입력","아이디를 입력해주세요.");
            return;
        }

        if(!password){
            Alert.alert("비밀번호 미입력","비밀번호를 입력해주세요.");
            return;
        }

        const userData = {
            userId: id,
            password: password,
        }

        try {
            const res = await loginUser(userData);
            loginUserInfo(res.user);
            console.log("user정보: ", res)
            Alert.alert("로그인 완료", "로그인 성공");
            navigation.navigate("BottomTabMenu",{Screen: 'Home'});
        } catch (error) {
            Alert.alert("로그인 실패", error.message);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <View style={styles.content}>
                    {/* 입력 폼 */}
                    <View style={styles.form}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>아이디</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="아이디를 입력하세요."
                                placeholderTextColor="#9CA3AF"
                                value={id}
                                onChangeText={setId}
                                keyboardType="id-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>비밀번호</Text>
                            <View style={styles.passwordContainer}>
                                <TextInput
                                    style={styles.passwordInput}
                                    placeholder="비밀번호를 입력하세요."
                                    placeholderTextColor="#9CA3AF"
                                    value={password}
                                    onChangeText={setPassword}
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
                        </View>

                        {/* 로그인 버튼 */}
                        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                            <Text style={styles.loginButtonText}>로그인</Text>
                        </TouchableOpacity>
                    </View>

                    {/* 회원가입 링크 */}
                    <TouchableOpacity style={styles.forgotInfo}>
                        <Text style={styles.forgotIdText} onPress={() => navigation.navigate("FindId")}>아이디 찾기 | </Text>
                        <Text style={styles.forgotPasswordText} onPress={() => navigation.navigate("FindPassword")}>비밀번호 찾기</Text>
                    </TouchableOpacity>
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>계정이 없으신가요? </Text>
                        <TouchableOpacity>
                            <Text style={styles.signupLink} onPress={() => navigation.navigate("Signup")}>회원가입</Text>
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
    forgotInfo: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
    },
    forgotIdText: {
        fontSize: 14,
        color: '#6366F1',
        fontWeight: '500',
    },
    forgotPasswordText: {
        fontSize: 14,
        color: '#6366F1',
        fontWeight: '500',
    },
    loginButton: {
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
    loginButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerText: {
        fontSize: 14,
        color: '#6B7280',
    },
    signupLink: {
        fontSize: 14,
        color: '#6366F1',
        fontWeight: '600',
    },
});

export default Login;