import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getListingById, getImageUrl } from "../api/listingApi";
import "./ItemDetails.css";

function toE164(phone) {
    const digits = phone.replace(/\D/g, "");

    if (digits.length === 10) {
        return `91${digits}`;
    }

    if (digits.length === 11 && digits.startsWith("0")) {
        return `91${digits.slice(1)}`;
    }

    if (digits.length === 12 && digits.startsWith("91")) {
        return digits;
    }

    return digits;
}

function ItemDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        setLoading(true);
        setError("");
        setImageError(false);

        getListingById(id)
            .then((data) => {
                setListing(data);
            })
            .catch(() => {
                setError("Listing not found.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="item-state">
                Loading...
            </div>
        );
    }

    if (error || !listing) {
        return (
            <div className="item-state item-error">
                {error || "Listing not found."}
            </div>
        );
    }

    // Keep the phone number internally for Call and WhatsApp.
    // It will NOT be displayed on the page.
    const phoneE164 = listing.sellerPhone
        ? toE164(listing.sellerPhone)
        : "";

    const waMessage = encodeURIComponent(
        `Hi! I'm interested in your listing "${listing.title}" on College Marketplace.`
    );

    return (
        <div className="item-details-page">

            {/* Back Button */}
            <button
                className="back-btn"
                onClick={() => navigate(-1)}
            >
                ← Back
            </button>

            <div className="item-details-grid">

                {/* Product Image */}
                <div className="item-gallery">

                    <div className="item-gallery-main">

                        {listing.image && !imageError ? (
                            <img
                                src={getImageUrl(listing.image)}
                                alt={listing.title}
                                onError={() => setImageError(true)}
                            />
                        ) : (
                            <div className="item-image-placeholder">
                                <span>📦</span>
                                <p>No Image Available</p>
                            </div>
                        )}

                    </div>

                </div>

                {/* Product Information */}
                <div className="item-info">

                    <span className="item-category">
                        {listing.category}
                    </span>

                    <h1>{listing.title}</h1>

                    <p className="item-price">
                        ₹{Number(listing.price).toLocaleString("en-IN")}
                    </p>

                    {/* Description */}
                    <div className="item-description">

                        <h3>Description</h3>

                        <p>
                            {listing.description}
                        </p>

                    </div>

                    {/* Seller Information */}
                    <div className="seller-box">

                        <p className="seller-label">
                            Seller
                        </p>

                        <p className="seller-name">
                            {listing.seller?.fullName || "Unknown"}
                        </p>

                        {/* Phone number is intentionally NOT displayed */}

                        {phoneE164 && (
                            <div className="contact-btns">

                                {/* Call Seller */}
                                <a
                                    className="btn-call"
                                    href={`tel:+${phoneE164}`}
                                >
                                    📞 Call Seller
                                </a>

                                {/* WhatsApp Seller */}
                                <a
                                    className="btn-whatsapp"
                                    href={`https://wa.me/${phoneE164}?text=${waMessage}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    💬 WhatsApp Seller
                                </a>

                            </div>
                        )}

                    </div>

                </div>

            </div>

        </div>
    );
}

export default ItemDetails;