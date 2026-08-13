import {
    createContext,
    useEffect,
    useState,
} from "react";

import {
    loginUser,
    registerUser,
    getProfile,
} from "../services/authService";

export const AuthContext = createContext();

function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    // =========================================
    // RESTORE USER AFTER REFRESH
    // =========================================

    useEffect(() => {

        const restoreUser = async () => {

            const token = localStorage.getItem("token");

            // No token = not logged in
            if (!token) {
                setLoading(false);
                return;
            }

            try {

                const data = await getProfile(token);

                console.log("RESTORED USER:", data);

                if (data && data.user) {

                    // API returned { user: ... }
                    setUser(data.user);

                } else if (data && data._id) {

                    // API returned user directly
                    setUser(data);

                } else {

                    // Token is invalid
                    localStorage.removeItem("token");
                    setUser(null);

                }

            } catch (error) {

                console.error(
                    "RESTORE USER ERROR:",
                    error
                );

                localStorage.removeItem("token");
                setUser(null);

            } finally {

                setLoading(false);

            }
        };

        restoreUser();

    }, []);


    // =========================================
    // LOGIN
    // =========================================

    const login = async (userData) => {

        const data = await loginUser(userData);

        if (data.token) {

            localStorage.setItem(
                "token",
                data.token
            );

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


    // =========================================
    // REGISTER
    // =========================================

    const register = async (userData) => {

        const data = await registerUser(userData);

        if (data.token) {

            localStorage.setItem(
                "token",
                data.token
            );

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


    // =========================================
    // LOGOUT
    // =========================================

    const logout = () => {

        localStorage.removeItem("token");

        setUser(null);
    };


    // =========================================
    // WAIT UNTIL USER RESTORATION FINISHES
    // =========================================

    if (loading) {

        return (
            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#0f172a",
                    color: "#ffffff",
                    fontSize: "18px",
                }}
            >
                Loading...
            </div>
        );
    }


    // =========================================
    // CONTEXT
    // =========================================

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