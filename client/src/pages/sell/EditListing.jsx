import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "../../styles/SellProduct.css";

function EditListing() {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();
    const existing = location.state?.listing;

    const [formData, setFormData] = useState({
        name: existing?.title || "",
        description: existing?.description || "",
        price: existing?.price || "",
        category: existing?.category || "",
        condition: existing?.condition || "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    if (!existing) {
        return (
            <div className="sell-page">
                <p className="form-error">
                    No listing data found. Please go back to My Listings and click Edit again.
                </p>
            </div>
        );
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.name || !formData.price || !formData.category || !formData.condition) {
            setError("Please fill in all required fields.");
            return;
        }

        setLoading(true);

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(`http://localhost:5000/api/listings/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title: formData.name,
                    description: formData.description,
                    price: formData.price,
                    category: formData.category,
                    condition: formData.condition,
                }),
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(data.message || "Failed to update product");
            }

            navigate("/profile");
        } catch (err) {
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="sell-page">
            <h1>Edit Your Product</h1>

            {error && <p className="form-error">{error}</p>}

            <form className="sell-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Product Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <div className="form-group">
                    <label>Price</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Category</label>
                    <select name="category" value={formData.category} onChange={handleChange}>
                        <option value="">Select category</option>
                        <option value="books">Books</option>
                        <option value="electronics">Electronics</option>
                        <option value="clothing">Clothing</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Condition</label>
                    <select name="condition" value={formData.condition} onChange={handleChange}>
                        <option value="">Select condition</option>
                        <option value="new">New</option>
                        <option value="like-new">Like New</option>
                        <option value="good">Good</option>
                        <option value="used">Used</option>
                    </select>
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? "Updating..." : "Update Product"}
                </button>
            </form>
        </div>
    );
}

export default EditListing;