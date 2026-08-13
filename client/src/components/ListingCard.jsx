import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../api/listingApi";
import "./ListingCard.css";

function ListingCard({ listing }) {
    const navigate = useNavigate();
    const [imageError, setImageError] = useState(false);

    return (
        <div
            className="listing-card"
            onClick={() =>
                navigate(`/listing/${listing._id}`)
            }
        >
            <div className="listing-image-container">

                {listing.image && !imageError ? (
                    <img
                        src={getImageUrl(listing.image)}
                        alt={listing.title}
                        className="listing-image"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="listing-image-placeholder">
                        <span>📦</span>
                        <p>No Image Available</p>
                    </div>
                )}

            </div>

            <div className="listing-info">

                <span className="listing-category">
                    {listing.category}
                </span>

                <h3>
                    {listing.title}
                </h3>

                <p className="listing-price">
                    ₹{Number(listing.price).toLocaleString("en-IN")}
                </p>

            </div>
        </div>
    );
}

export default ListingCard;