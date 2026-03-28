// src/contexts/UserContext.js
import { createContext, useState } from "react";
const UserContext = createContext();

export function UserProvider({ children }) {
    // 初始化時從 localStorage 讀取 user
    const [user, setUserState] = useState(() => {
        const stored = localStorage.getItem("doraUser");
        return stored ? JSON.parse(stored) : null;
    });

    // 包裝 setUser，寫入 localStorage
    const setUser = (userData) => {
        setUserState(userData);
        if (userData) {
            localStorage.setItem("doraUser", JSON.stringify(userData));
        } else {
            localStorage.removeItem("doraUser");
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;