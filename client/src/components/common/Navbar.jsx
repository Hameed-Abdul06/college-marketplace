import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "../../styles/Navbar.css";

function Navbar() {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="navbar">

            <div className="logo">
                <Link to="/">College Marketplace</Link>
            </div>

            <ul className="nav-links">

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
                                onClick={logout}
                            >
                                Logout
                            </button>
                        </li>
                    </>
                )}

            </ul>

        </nav>
    );
}

export default Navbar;