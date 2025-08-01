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

//비밀번호찾기 api
export async function findPassword(userId, email) {
    try {
        const res = await axios.post(`${API}/api/users/find-password`, { userId, email });
        return res.data;
    } catch (error) {
        const message = error.response?.data?.message || error.message || '비밀번호 찾기 실패';
        throw new Error(message);
    }
}

//비밀번호 재설정 api
export async function resetPassword(token, newPassword) {
    try {
        const res = await axios.post(`${API}/api/users/reset-password`, { token, newPassword });
        return res.data;
    } catch (error) {
        const message = error.response?.data?.message || error.message || '비밀번호 재설정 실패';
        throw new Error(message);
    }
}