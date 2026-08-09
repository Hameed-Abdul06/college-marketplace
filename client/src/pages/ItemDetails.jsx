import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getListingById, getImageUrl } from "../api/listingApi";
import "./ItemDetails.css";

function toE164(phone) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `91${digits}`;
  if (digits.length === 11 && digits.startsWith("0")) return `91${digits.slice(1)}`;
  if (digits.length === 12 && digits.startsWith("91")) return digits;
  return digits;
}

function ItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    getListingById(id)
      .then((data) => {
        setListing(data);
      })
      .catch(() => setError("Listing not found."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="state-msg">Loading...</p>;
  if (error || !listing) return <p className="state-msg state-error">{error}</p>;

  const phoneE164 = listing.sellerPhone ? toE164(listing.sellerPhone) : "";
  const waMessage = encodeURIComponent(
    `Hi! I'm interested in your listing "${listing.title}" on College Marketplace.`
  );

  return (
    <div className="item-details">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="item-details-grid">
        <div className="item-gallery">
          <div className="item-gallery-main">
            <img src={getImageUrl(listing.image)} alt={listing.title} />
          </div>
        </div>

        <div className="item-info">
          <span className="item-category">{listing.category}</span>
          <h1>{listing.title}</h1>
          <p className="item-price">₹{listing.price.toLocaleString("en-IN")}</p>

          <div className="item-description">
            <h3>Description</h3>
            <p>{listing.description}</p>
          </div>

          <div className="seller-box">
            <p className="seller-label">Seller</p>
            <p className="seller-name">{listing.seller?.fullName || "Unknown"}</p>

            {phoneE164 && (
              <div className="contact-btns">
                <a className="btn-call" href={`tel:+${phoneE164}`}>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.9 21 3 13.1 3 3.9c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1L6.6 10.8z" />
                  </svg>
                  Call Seller
                </a>
                <a className="btn-whatsapp" href={`https://wa.me/${phoneE164}?text=${waMessage}`} target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.87.51 3.63 1.47 5.16L2 22l5.06-1.53a9.9 9.9 0 0 0 4.98 1.33c5.46 0 9.91-4.45 9.91-9.9C21.95 6.45 17.5 2 12.04 2zm5.79 14.13c-.24.68-1.2 1.24-1.96 1.4-.52.11-1.2.2-3.48-.75-2.92-1.21-4.8-4.17-4.95-4.36-.14-.2-1.18-1.57-1.18-3 0-1.42.75-2.13 1.02-2.42.27-.29.58-.36.78-.36.2 0 .39 0 .56.01.18.01.42-.07.65.5.24.58.82 2 .89 2.15.07.15.12.33.02.53-.1.2-.15.32-.3.5-.15.17-.31.39-.44.52-.15.15-.3.31-.13.6.17.3.77 1.27 1.65 2.06 1.14 1.02 2.1 1.33 2.4 1.48.3.15.47.13.65-.08.18-.2.75-.87.95-1.17.2-.3.39-.24.66-.14.27.1 1.7.8 2 .95.3.15.5.22.57.35.08.13.08.75-.16 1.43z" />
                  </svg>
                  WhatsApp Seller
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