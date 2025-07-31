import axios from "axios";
import { API } from "./API";

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
        // const token = res.data.token;
        // if(token) {
        //     // 예: 로컬 스토리지에 저장
        //     localStorage.setItem('authToken', token);
        // }
        return res.data;
    } catch (error) {
        const message = error.response?.data?.message || error.message || '로그인 실패';
        throw new Error(message);
    }
}