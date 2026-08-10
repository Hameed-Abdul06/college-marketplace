import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "../../styles/Navbar.css";

function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const [loggingOut, setLoggingOut] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        setLoggingOut(true);

        setTimeout(() => {
            logout();
            navigate("/");
        }, 600);
    };

    return (
        <nav className="navbar">

            <div className="logo">
                <Link to="/">College Marketplace</Link>
            </div>

            <ul className={`nav-links ${loggingOut ? "logout-animation" : ""}`}>

                <li>
                    <Link to="/">Home</Link>
                </li>

                {!user ? (
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>

                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/profile">Profile</Link>
                        </li>

                        <li>
                            <button
                                className="logout-btn"
                                onClick={handleLogout}
                                disabled={loggingOut}
                            >
                                {loggingOut ? (
                                    <>
                                        <span className="logout-spinner"></span>
                                        Logging out...
                                    </>
                                ) : (
                                    "Logout"
                                )}
                            </button>
                        </li>
                    </>
                )}

            </ul>

        </nav>
    );
}

export default Navbar;