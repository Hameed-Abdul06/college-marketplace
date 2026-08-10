import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../services/authService";
import "../styles/Profile.css";

function Profile() {
    const [profile, setProfile] = useState(null);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("Please login first.");
                setLoading(false);
                return;
            }

            try {
                const data = await getProfile(token);

                if (data._id) {
                    setProfile(data);
                    setFullName(data.fullName);
                    setEmail(data.email);
                } else {
                    setError(data.message || "Failed to load profile.");
                }
            } catch (err) {
                setError("Unable to connect to server.");
            }

            setLoading(false);
        };

        fetchProfile();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        if (!fullName.trim()) {
            setError("Full name is required.");
            return;
        }

        if (!email.trim()) {
            setError("Email is required.");
            return;
        }

        const token = localStorage.getItem("token");

        if (!token) {
            setError("Please login first.");
            return;
        }

        try {
            const data = await updateProfile(token, {
                fullName,
                email,
            });

            if (data._id) {
                setProfile(data);
                setFullName(data.fullName);
                setEmail(data.email);
                setMessage("Profile updated successfully!");
                setEditing(false);
            } else {
                setError(data.message || "Failed to update profile.");
            }
        } catch (err) {
            setError("Unable to connect to server.");
        }
    };

    if (loading) {
        return (
            <div className="profile-page">
                <div className="profile-card">
                    <h2>Loading profile...</h2>
                </div>
            </div>
        );
    }

    if (error && !profile) {
        return (
            <div className="profile-page">
                <div className="profile-card">
                    <h2>{error}</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-page">

            <div className="profile-card">

                {/* Header */}
                <div className="profile-header">
                    <div className="profile-avatar">
                        {profile?.fullName?.charAt(0).toUpperCase()}
                    </div>

                    <h1>
                        {editing ? "Edit Profile" : "My Profile"}
                    </h1>

                    <p>
                        Manage your College Marketplace account
                    </p>
                </div>

                {/* Messages */}
                {message && (
                    <div className="success-message">
                        ✓ {message}
                    </div>
                )}

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                {/* View Profile */}
                {!editing ? (
                    <div>

                        <div className="profile-info">
                            <label>FULL NAME</label>
                            <div className="info-box">
                                {profile?.fullName}
                            </div>
                        </div>

                        <div className="profile-info">
                            <label>EMAIL ADDRESS</label>
                            <div className="info-box">
                                {profile?.email}
                            </div>
                        </div>

                        <button
                            className="edit-profile-btn"
                            onClick={() => {
                                setMessage("");
                                setError("");
                                setEditing(true);
                            }}
                        >
                            Edit Profile
                        </button>

                    </div>
                ) : (

                    /* Edit Profile */
                    <form onSubmit={handleUpdate}>

                        <div className="profile-field">
                            <label htmlFor="fullName">
                                FULL NAME
                            </label>

                            <input
                                id="fullName"
                                type="text"
                                value={fullName}
                                onChange={(e) =>
                                    setFullName(e.target.value)
                                }
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div className="profile-field">
                            <label htmlFor="email">
                                EMAIL ADDRESS
                            </label>

                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className="profile-buttons">

                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={() => {
                                    setFullName(profile.fullName);
                                    setEmail(profile.email);
                                    setError("");
                                    setMessage("");
                                    setEditing(false);
                                }}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="save-btn"
                            >
                                Save Changes
                            </button>

                        </div>

                    </form>
                )}

            </div>

        </div>
    );
}

export default Profile;