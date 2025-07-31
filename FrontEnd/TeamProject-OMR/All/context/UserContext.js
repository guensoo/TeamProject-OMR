import { createContext, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const loginUserInfo = (userInfo) => setUser(userInfo); //로그인 성공 시 사용자 정보를 저장할 때 사용
    const logoutUserInfo = () => setUser(null); //로그아웃 시 user 상태를 null로 초기화

    return (
        <UserContext.Provider value={{ user, loginUserInfo, logoutUserInfo }}>
            {children}
        </UserContext.Provider>
    )

}