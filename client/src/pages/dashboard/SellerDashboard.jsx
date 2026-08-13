import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getMyListings,
    getImageUrl,
} from "../../api/listingApi";

import "../../styles/SellerDashboard.css";

function SellerDashboard() {
    const [listings, setListings] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    // ================================
    // FETCH SELLER LISTINGS
    // ================================

    useEffect(() => {
        const fetchMyListings = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    navigate("/login");
                    return;
                }

                const data = await getMyListings(token);

                setListings(data);
            } catch (err) {
                console.error("MY LISTINGS ERROR:", err);

                setError(
                    "Unable to load your listings."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchMyListings();
    }, [navigate]);

    // ================================
    // DELETE LISTING
    // ================================

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Did you sell this item? Delete this listing?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            const token = localStorage.getItem("token");

            const API_BASE =
                import.meta.env.VITE_API_URL ||
                "https://college-marketplace-hae2.onrender.com/api";

            const response = await fetch(
                `${API_BASE}/listings/${id}`,
                {
                    method: "DELETE",

                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Delete failed"
                );
            }

            setListings((prevListings) =>
                prevListings.filter(
                    (listing) =>
                        listing._id !== id
                )
            );
        } catch (err) {
            console.error(
                "DELETE LISTING ERROR:",
                err
            );

            alert(
                "Unable to delete listing."
            );
        }
    };

    // ================================
    // SEARCH
    // ================================

    const filteredListings = listings.filter(
        (listing) =>
            listing.title
                ?.toLowerCase()
                .includes(
                    search.toLowerCase()
                )
    );

    // ================================
    // LOADING
    // ================================

    if (loading) {
        return (
            <div className="seller-dashboard">

                <div className="dashboard-loading">

                    <div className="loading-spinner"></div>

                    <h2>
                        Loading your listings...
                    </h2>

                    <p>
                        Please wait a moment.
                    </p>

                </div>

            </div>
        );
    }

    // ================================
    // DASHBOARD
    // ================================

    return (
        <div className="seller-dashboard">

            {/* =========================
                HEADER
            ========================= */}

            <div className="dashboard-header">

                <div>

                    <h1>
                        Seller Dashboard
                    </h1>

                    <p>
                        Manage your marketplace
                        listings
                    </p>

                </div>

                <div className="dashboard-header-actions">

                    <button
                        className="dashboard-home-btn"
                        onClick={() =>
                            navigate("/")
                        }
                    >
                        Home
                    </button>

                    <button
                        className="dashboard-sell-btn"
                        onClick={() =>
                            navigate("/sell")
                        }
                    >
                        + Sell an Item
                    </button>

                </div>

            </div>


            {/* =========================
                CONTENT
            ========================= */}

            <div className="dashboard-content">

                <section className="listings-section">

                    {/* =====================
                        LISTINGS HEADER
                    ===================== */}

                    <div className="listings-header">

                        <div>

                            <h2>
                                My Listings
                            </h2>

                            <p className="listings-subtitle">
                                {listings.length === 0
                                    ? "You haven't listed anything yet."
                                    : `${listings.length} item${listings.length !== 1 ? "s" : ""} listed`
                                }
                            </p>

                        </div>

                        <input
                            type="text"
                            placeholder="Search listings..."
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    {/* =====================
                        ERROR
                    ===================== */}

                    {error && (
                        <div className="dashboard-error">

                            <span>
                                ⚠️
                            </span>

                            <p>
                                {error}
                            </p>

                        </div>
                    )}


                    {/* =====================
                        EMPTY STATE
                    ===================== */}

                    {!error &&
                        filteredListings.length === 0 && (
                            <div className="empty-state">

                                <div className="empty-icon">
                                    🛍️
                                </div>

                                <h3>
                                    No listings yet
                                </h3>

                                <p>
                                    You haven't listed
                                    any items yet.
                                    Start selling
                                    something to see
                                    your items here.
                                </p>

                                <button
                                    className="empty-sell-btn"
                                    onClick={() =>
                                        navigate(
                                            "/sell"
                                        )
                                    }
                                >
                                    + Sell Your First Item
                                </button>

                            </div>
                        )}


                    {/* =====================
                        LISTING GRID
                    ===================== */}

                    {filteredListings.length > 0 && (

                        <div className="listing-grid">

                            {filteredListings.map(
                                (listing) => (

                                    <div
                                        className="seller-listing-card"
                                        key={
                                            listing._id
                                        }
                                    >

                                        {/* IMAGE */}

                                        <img
                                            src={getImageUrl(
                                                listing.image
                                            )}
                                            alt={
                                                listing.title
                                            }
                                        />


                                        {/* INFO */}

                                        <div className="listing-info">

                                            <h3>
                                                {
                                                    listing.title
                                                }
                                            </h3>

                                            <p>
                                                {
                                                    listing.category
                                                }
                                            </p>

                                            <p>
                                                Condition:{" "}
                                                {
                                                    listing.condition
                                                }
                                            </p>

                                            <h4>
                                                ₹
                                                {Number(
                                                    listing.price
                                                ).toLocaleString(
                                                    "en-IN"
                                                )}
                                            </h4>

                                            <span>
                                                {
                                                    listing.status
                                                }
                                            </span>

                                        </div>


                                        {/* ACTIONS */}

                                        <div className="listing-actions">

                                            <button
                                                className="edit-btn"
                                                onClick={() =>
                                                    navigate(
                                                        `/edit-listing/${listing._id}`
                                                    )
                                                }
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="delete-btn"
                                                onClick={() =>
                                                    handleDelete(
                                                        listing._id
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    )}

                </section>

            </div>

        </div>
    );
}

export default SellerDashboard;