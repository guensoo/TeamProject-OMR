import axios from "axios";
import { API } from "./API";
import AsyncStorage from "@react-native-async-storage/async-storage";

//회원가입 api
export async function registerUser(userData) {
    try {
        const res = await axios.post(`${API}/api/users/register`, userData);
        return res.data;
    } catch (error) {
        const message = error.response?.data?.message || error.message || '회원가입 실패';
        throw new Error(message);
    }
}

// 회원가입 이메일 인증 코드 전송
export async function sendSignupCode(email) {
    try {
        const res = await axios.post(`${API}/api/users/signup/send-code`, { email });
        return res.data;
    } catch (error) {
        const message = error.response?.data || error.message || '이메일 인증 코드 전송 실패';
        throw new Error(message);
    }
}

// 회원가입 이메일 인증 코드 확인
export async function verifySignupCode(email, code) {
    try {
        const res = await axios.post(`${API}/api/users/signup/verify-code`, { email, code });
        return res.data;
    } catch (error) {
        const message = error.response?.data || error.message || '이메일 인증 실패';
        throw new Error(message);
    }
}

//로그인 api
export async function loginUser(userData) {
    try {
        const res = await axios.post(`${API}/api/users/login`, userData);
        console.log("res: ",res)

        const token = res.data.token;
        if(token) {
            // 예: 로컬 스토리지에 저장
            await AsyncStorage.setItem('authToken', token);
        }
        return res.data;
    } catch (error) {
        const message = error.response?.data?.message || error.message || '로그인 실패';
        throw new Error(message);
    }
}

//아이디찾기 api
export async function findId(email) {
    try {
        const res = await axios.post(`${API}/api/users/find-id`, { email });
        return res.data;
    } catch (error) {
        const messgae = error.response?.data?.message || error.message || '아이디 찾기 실패';
        throw new Error(messgae);
    }
}

//비밀번호찾기 인증코드 이메일 발송 API
export async function sendResetCode(userId, email) {
    try {
        const res = await axios.post(`${API}/api/users/send-reset-code`, { userId, email });
        return res.data;
    } catch (error) {
        const message = error.response?.data?.message || error.message || '인증코드 전송 실패';
        throw new Error(message);
    }
}

// 인증코드 검증 API
export async function verifyResetCode(email, code) {
    try {
        const res = await axios.post(`${API}/api/users/verify-reset-code`, { email, code });
        return res.data;
    } catch (error) {
        const message = error.response?.data || error.message || '인증코드 검증 실패';
        throw new Error(message);
    }
}

//비밀번호 재설정 api
export async function resetPassword(userId, newPassword) {
    try {
        const res = await axios.post(`${API}/api/users/reset-password`, { userId, newPassword });
        return res.data;
    } catch (error) {
        const message = error.response?.data || error.message || '비밀번호 재설정 실패';
        throw new Error(message);
    }
}