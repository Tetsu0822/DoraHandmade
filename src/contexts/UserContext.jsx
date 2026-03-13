// src/contexts/UserContext.js
import { createContext, useState } from "react";
const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null); // null 表示未登入

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;