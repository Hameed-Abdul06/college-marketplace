import React from "react";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../api/listingApi";
import "./ListingCard.css";

function ListingCard({ listing }) {
  const navigate = useNavigate();

  return (
    <div
      className="listing-card"
      onClick={() => navigate(`/listing/${listing._id}`)}
    >
      <div className="listing-card-image">
        <img src={getImageUrl(listing.image)} alt={listing.title} />
        <span className="listing-card-category">{listing.category}</span>
      </div>
      <div className="listing-card-body">
        <h3>{listing.title}</h3>
        <p className="listing-card-price">₹{listing.price.toLocaleString("en-IN")}</p>
      </div>
    </div>
  );
}

export default ListingCard;