import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/SellProduct.css";

function SellProduct() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        condition: "",
        sellerPhone: "",
    });

    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0] || null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (
            !formData.name ||
            !formData.description ||
            !formData.price ||
            !formData.category ||
            !formData.condition ||
            !formData.sellerPhone
        ) {
            setError("Please fill all fields.");
            return;
        }

        if (!/^[0-9]{10}$/.test(formData.sellerPhone)) {
            setError("Please enter a valid 10-digit phone number.");
            return;
        }

        setLoading(true);

        try {
            const data = new FormData();

            data.append("title", formData.name);
            data.append("description", formData.description);
            data.append("price", formData.price);
            data.append("category", formData.category);
            data.append("condition", formData.condition);
            data.append("sellerPhone", formData.sellerPhone);

            if (image) {
                data.append("image", image);
            }

            const token = localStorage.getItem("token");

            const API_URL =
                import.meta.env.VITE_API_URL ||
                "https://college-marketplace-hae2.onrender.com";

            const response = await fetch(
                `${API_URL}/listings`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: data,
                }
            );

            if (!response.ok) {
                const errData = await response
                    .json()
                    .catch(() => ({}));

                throw new Error(
                    errData.message ||
                    "Failed to post product"
                );
            }

            navigate("/profile");

        } catch (err) {
            console.error("POST LISTING ERROR:", err);

            setError(
                err.message ||
                "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="sell-page">

            <h1>Sell Your Product</h1>

            {error && (
                <p className="form-error">
                    {error}
                </p>
            )}

            <form
                className="sell-form"
                onSubmit={handleSubmit}
            >

                {/* Product Name */}
                <div className="form-group">
                    <label>Product Name</label>

                    <input
                        type="text"
                        name="name"
                        placeholder="Enter product name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

                {/* Description */}
                <div className="form-group">
                    <label>Description</label>

                    <textarea
                        name="description"
                        placeholder="Enter product description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                {/* Price */}
                <div className="form-group">
                    <label>Price</label>

                    <input
                        type="number"
                        name="price"
                        placeholder="Enter price"
                        value={formData.price}
                        onChange={handleChange}
                    />
                </div>

                {/* Category */}
                <div className="form-group">
                    <label>Category</label>

                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    >
                        <option value="">
                            Select category
                        </option>

                        <option value="Books">
                            Books
                        </option>

                        <option value="Electronics">
                            Electronics
                        </option>

                        <option value="Clothing">
                            Clothing
                        </option>

                        <option value="Other">
                            Other
                        </option>
                    </select>
                </div>

                {/* Condition */}
                <div className="form-group">
                    <label>Condition</label>

                    <select
                        name="condition"
                        value={formData.condition}
                        onChange={handleChange}
                    >
                        <option value="">
                            Select condition
                        </option>

                        <option value="New">
                            New
                        </option>

                        <option value="Like New">
                            Like New
                        </option>

                        <option value="Good">
                            Good
                        </option>

                        <option value="Used">
                            Used
                        </option>
                    </select>
                </div>

                {/* Phone */}
                <div className="form-group">
                    <label>Phone Number</label>

                    <input
                        type="tel"
                        name="sellerPhone"
                        placeholder="Enter your 10-digit phone number"
                        value={formData.sellerPhone}
                        onChange={handleChange}
                        maxLength="10"
                    />
                </div>

                {/* Image */}
                <div className="form-group">
                    <label>Product Image</label>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? "Posting..."
                        : "Post Product"}
                </button>

            </form>
        </div>
    );
}

export default SellProduct;