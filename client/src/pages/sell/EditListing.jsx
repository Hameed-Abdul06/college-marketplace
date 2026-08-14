import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import "../../styles/SellProduct.css";

function EditListing() {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();

    const existing = location.state?.listing;

    // ================================
    // NORMALIZE CATEGORY
    // ================================

    const normalizeCategory = (value) => {
        if (!value) return "";

        const category = value
            .toString()
            .trim()
            .toLowerCase();

        if (category === "books") return "books";
        if (category === "book") return "books";

        if (category === "electronics") {
            return "electronics";
        }

        if (category === "clothing") {
            return "clothing";
        }

        if (category === "other") {
            return "other";
        }

        return category;
    };

    // ================================
    // NORMALIZE CONDITION
    // ================================

    const normalizeCondition = (value) => {
        if (!value) return "";

        const condition = value
            .toString()
            .trim()
            .toLowerCase();

        if (condition === "new") {
            return "new";
        }

        if (
            condition === "like new" ||
            condition === "like-new"
        ) {
            return "like-new";
        }

        if (condition === "good") {
            return "good";
        }

        if (condition === "used") {
            return "used";
        }

        return condition;
    };

    // ================================
    // FORM DATA
    // ================================

    const [formData, setFormData] = useState({
        name: existing?.title || "",
        description: existing?.description || "",
        price: existing?.price || "",
        category: normalizeCategory(
            existing?.category
        ),
        condition: normalizeCondition(
            existing?.condition
        ),
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // ================================
    // NO LISTING
    // ================================

    if (!existing) {
        return (
            <div className="sell-page">

                <p className="form-error">
                    No listing data found.
                    Please go back to My Listings
                    and click Edit again.
                </p>

            </div>
        );
    }

    // ================================
    // HANDLE INPUT
    // ================================

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // ================================
    // UPDATE PRODUCT
    // ================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        // Validation

        if (
            !formData.name.trim() ||
            !formData.price ||
            !formData.category ||
            !formData.condition
        ) {
            setError(
                "Please fill in all required fields."
            );

            return;
        }

        setLoading(true);

        try {
            const token =
                localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            // ============================
            // API BASE URL
            // ============================

            const API_BASE =
                import.meta.env.VITE_API_URL ||
                "http://localhost:5000/api";

            // ============================
            // UPDATE REQUEST
            // ============================

            const response = await fetch(
                `${API_BASE}/listings/${id}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`,
                    },

                    body: JSON.stringify({
                        title:
                            formData.name.trim(),

                        description:
                            formData.description.trim(),

                        price:
                            Number(formData.price),

                        category:
                            formData.category,

                        condition:
                            formData.condition,
                    }),
                }
            );

            const data =
                await response
                    .json()
                    .catch(() => ({}));

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to update product"
                );
            }

            // ============================
            // SUCCESS
            // ============================

            alert(
                "Product updated successfully!"
            );

            navigate("/seller-dashboard");

        } catch (err) {

            console.error(
                "UPDATE LISTING ERROR:",
                err
            );

            setError(
                err.message ||
                "Something went wrong. Please try again."
            );

        } finally {

            setLoading(false);

        }
    };

    // ================================
    // UI
    // ================================

    return (
        <div className="sell-page">

            <h1>
                Edit Your Product
            </h1>

            {error && (
                <p className="form-error">
                    {error}
                </p>
            )}

            <form
                className="sell-form"
                onSubmit={handleSubmit}
            >

                {/* =========================
                    PRODUCT NAME
                ========================= */}

                <div className="form-group">

                    <label>
                        Product Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                </div>


                {/* =========================
                    DESCRIPTION
                ========================= */}

                <div className="form-group">

                    <label>
                        Description
                    </label>

                    <textarea
                        name="description"
                        value={
                            formData.description
                        }
                        onChange={handleChange}
                    />

                </div>


                {/* =========================
                    PRICE
                ========================= */}

                <div className="form-group">

                    <label>
                        Price
                    </label>

                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        min="0"
                        required
                    />

                </div>


                {/* =========================
                    CATEGORY
                ========================= */}

                <div className="form-group">

                    <label>
                        Category
                    </label>

                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >

                        <option value="">
                            Select category
                        </option>

                        <option value="books">
                            Books
                        </option>

                        <option value="electronics">
                            Electronics
                        </option>

                        <option value="clothing">
                            Clothing
                        </option>

                        <option value="other">
                            Other
                        </option>

                    </select>

                </div>


                {/* =========================
                    CONDITION
                ========================= */}

                <div className="form-group">

                    <label>
                        Condition
                    </label>

                    <select
                        name="condition"
                        value={formData.condition}
                        onChange={handleChange}
                        required
                    >

                        <option value="">
                            Select condition
                        </option>

                        <option value="new">
                            New
                        </option>

                        <option value="like-new">
                            Like New
                        </option>

                        <option value="good">
                            Good
                        </option>

                        <option value="used">
                            Used
                        </option>

                    </select>

                </div>


                {/* =========================
                    UPDATE BUTTON
                ========================= */}

                <button
                    type="submit"
                    disabled={loading}
                >

                    {loading
                        ? "Updating..."
                        : "Update Product"}

                </button>

            </form>

        </div>
    );
}

export default EditListing;