import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "../../styles/Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "email") {
            setEmail(value);
        } else {
            setPassword(value);
        }

        setErrors({
            ...errors,
            [name]: "",
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let newErrors = {};

        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Enter a valid email";
        }

        if (!password.trim()) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setLoading(true);

            try {
                const result = await login({
                    email,
                    password,
                });

                if (result.success) {
                    navigate("/seller-dashboard");
                } else {
                    setErrors({
                        email:
                            result.data.message ||
                            "Login failed",
                    });

                    setLoading(false);
                }
            } catch (error) {
                console.error("LOGIN ERROR:", error);

                setErrors({
                    email: "Unable to connect to server",
                });

                setLoading(false);
            }
        }
    };

    return (
        <div className="login-container">

            <div className="login-card">

                <div className="login-header">

                    <div className="login-icon">
                        🔐
                    </div>

                    <h2>Welcome Back</h2>

                    <p className="login-subtitle">
                        Login to your College Marketplace account
                    </p>

                </div>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">

                        <label>Email</label>

                        <input
                            type="email"
                            name="email"
                            placeholder={
                                errors.email ||
                                "College Email"
                            }
                            value={email}
                            onChange={handleChange}
                            className={
                                errors.email
                                    ? "input-error"
                                    : ""
                            }
                            disabled={loading}
                        />

                    </div>

                    <div className="input-group">

                        <label>Password</label>

                        <input
                            type="password"
                            name="password"
                            placeholder={
                                errors.password ||
                                "Password"
                            }
                            value={password}
                            onChange={handleChange}
                            className={
                                errors.password
                                    ? "input-error"
                                    : ""
                            }
                            disabled={loading}
                        />

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={
                            loading
                                ? "login-loading"
                                : ""
                        }
                    >
                        {loading ? (
                            <>
                                <span className="spinner"></span>
                                Logging in...
                            </>
                        ) : (
                            "Login"
                        )}
                    </button>

                </form>

                <p className="register-link">

                    Don't have an account?{" "}

                    <Link to="/register">
                        Register
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Login;