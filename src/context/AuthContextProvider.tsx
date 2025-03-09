import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
    name: string;
    email: string;
    password?: string;
    isAdmin?: boolean;
}

interface UserContext {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    loading: boolean; // Add a loading state
}

export const AuthContext = createContext<UserContext | null>(null);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("user");
        if (token) {
            const value = JSON.parse(token);
            setUser(value);
        }
        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const auth = useContext(AuthContext);
    if (!auth) {
        throw new Error("useAuth must be used within an AuthContextProvider");
    }
    return auth;
};

export default AuthContextProvider;
