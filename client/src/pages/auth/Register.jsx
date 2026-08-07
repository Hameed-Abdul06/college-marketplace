import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/Login.css";

function Register() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        setErrors({
            ...errors,
            [e.target.name]: "",
        });
    };

    const handleSubmit = (e) => {
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
            newErrors.password = "Password must be at least 8 characters";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Confirm your password";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            alert("Registration Successful (Frontend Validation)");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">

                <h2>Create Account</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="fullName"
                        placeholder={errors.fullName || "Full Name"}
                        value={formData.fullName}
                        onChange={handleChange}
                        className={errors.fullName ? "input-error" : ""}
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder={errors.email || "College Email"}
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? "input-error" : ""}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className={errors.password ? "input-error" : ""}
                    />
                    {errors.password && (
                        <p className="error">{errors.password}</p>
                    )}

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={errors.confirmPassword ? "input-error" : ""}
                    />
                    {errors.confirmPassword && (
                        <p className="error">{errors.confirmPassword}</p>
                    )}

                    <button type="submit">
                        Register
                    </button>

                </form>

                <p>
                    Already have an account?{" "}
                    <Link to="/login">Login</Link>
                </p>

            </div>
        </div>
    );
}

export default Register;