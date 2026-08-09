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
    });

    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
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
            const data = new FormData();
            data.append("title", formData.name);
            data.append("description", formData.description);
            data.append("price", formData.price);
            data.append("category", formData.category);
            data.append("condition", formData.condition);
            if (image) {
                data.append("image", image);
            }

            const token = localStorage.getItem("token");

            const response = await fetch("http://localhost:5000/api/listings", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: data,
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.message || "Failed to post product");
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
            <h1>Sell Your Product</h1>

            {error && <p className="form-error">{error}</p>}

            <form className="sell-form" onSubmit={handleSubmit}>
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

                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        name="description"
                        placeholder="Enter product description"
                        value={formData.description}
                        onChange={handleChange}
                    ></textarea>
                </div>

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

                <div className="form-group">
                    <label>Product Image</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? "Posting..." : "Post Product"}
                </button>
            </form>
        </div>
    );
}

export default SellProduct;
