import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
import "../../styles/Login.css";

function Register() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });

        setErrors({
            ...errors,
            [name]: "",
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let newErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = "Full Name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Enter a valid email";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            newErrors.password =
                "Password must be at least 8 characters";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword =
                "Confirm your password";
        } else if (
            formData.password !== formData.confirmPassword
        ) {
            newErrors.confirmPassword =
                "Passwords do not match";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length !== 0) {
            return;
        }

        setLoading(true);

        try {
            const data = await registerUser({
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password,
            });

            if (data.token) {
                localStorage.setItem("token", data.token);

                setTimeout(() => {
                    navigate("/login");
                }, 500);
            } else {
                setErrors({
                    email: data.message || "Registration failed",
                });

                setLoading(false);
            }
        } catch (error) {
            setErrors({
                email: "Unable to connect to server",
            });

            setLoading(false);
        }
    };

    return (
        <div className="login-container">

            <div className="login-card">

                <div className="login-header">

                    <div className="login-icon">
                        ✨
                    </div>

                    <h2>Create Account</h2>

                    <p className="login-subtitle">
                        Join your College Marketplace community
                    </p>

                </div>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label>Full Name</label>

                        <input
                            type="text"
                            name="fullName"
                            placeholder={
                                errors.fullName || "Full Name"
                            }
                            value={formData.fullName}
                            onChange={handleChange}
                            className={
                                errors.fullName
                                    ? "input-error"
                                    : ""
                            }
                            disabled={loading}
                        />
                    </div>

                    <div className="input-group">
                        <label>Email</label>

                        <input
                            type="email"
                            name="email"
                            placeholder={
                                errors.email || "College Email"
                            }
                            value={formData.email}
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
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className={
                                errors.password
                                    ? "input-error"
                                    : ""
                            }
                            disabled={loading}
                        />

                        {errors.password && (
                            <p className="error">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div className="input-group">
                        <label>Confirm Password</label>

                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={
                                errors.confirmPassword
                                    ? "input-error"
                                    : ""
                            }
                            disabled={loading}
                        />

                        {errors.confirmPassword && (
                            <p className="error">
                                {errors.confirmPassword}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={
                            loading ? "login-loading" : ""
                        }
                    >
                        {loading ? (
                            <>
                                <span className="spinner"></span>
                                Creating Account...
                            </>
                        ) : (
                            "Create Account"
                        )}
                    </button>

                </form>

                <p className="register-link">
                    Already have an account?{" "}
                    <Link to="/login">
                        Login
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Register;