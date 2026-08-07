import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "../../styles/Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

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

    const handleSubmit = (e) => {
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
            login({
                email,
            });

            navigate("/");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">

                <h2>Login</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        name="email"
                        placeholder={errors.email || "College Email"}
                        value={email}
                        onChange={handleChange}
                        className={errors.email ? "input-error" : ""}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder={errors.password || "Password"}
                        value={password}
                        onChange={handleChange}
                        className={errors.password ? "input-error" : ""}
                    />

                    <button type="submit">
                        Login
                    </button>

                </form>

                <p>
                    Don't have an account?{" "}
                    <Link to="/register">Register</Link>
                </p>

            </div>
        </div>
    );
}

export default Login;