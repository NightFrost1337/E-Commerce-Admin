import { useState, useMemo, createContext } from "react";

export const UserContext = createContext({
    user: null,
    shops: [],
    updateUser: () => {},
    updateShops: () => {}
});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [shops, setShops] = useState([]);

    const updateUser = useMemo(() => (data) => setUser(data), []);
    const updateShops = useMemo(() => (data) => setShops(data), []);
        
    return <UserContext.Provider value={{ user, shops, updateUser, updateShops }}>{children}</UserContext.Provider>;
}