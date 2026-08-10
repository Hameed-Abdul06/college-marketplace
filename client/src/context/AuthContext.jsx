import { createContext, useState } from "react";
import {
    loginUser,
    registerUser,
} from "../services/authService";

export const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const login = async (userData) => {
        const data = await loginUser(userData);

        if (data.token) {
            localStorage.setItem("token", data.token);
            setUser(data);

            return {
                success: true,
                data,
            };
        }

        return {
            success: false,
            data,
        };
    };

    const register = async (userData) => {
        const data = await registerUser(userData);

        if (data.token) {
            localStorage.setItem("token", data.token);
            setUser(data);

            return {
                success: true,
                data,
            };
        }

        return {
            success: false,
            data,
        };
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;