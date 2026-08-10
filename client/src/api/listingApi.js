import axios from "axios";

const API_BASE =
    import.meta.env.VITE_API_URL ||
    "https://college-marketplace-hae2.onrender.com/api";

export const getListings = async (search = "", category = "All") => {
    const params = {};

    if (search) {
        params.search = search;
    }

    if (category && category !== "All") {
        params.category = category;
    }

    const res = await axios.get(`${API_BASE}/listings`, { params });

    return res.data;
};

export const getCategories = async () => {
    const res = await axios.get(`${API_BASE}/listings/categories`);

    return res.data;
};

export const getListingById = async (id) => {
    const res = await axios.get(`${API_BASE}/listings/${id}`);

    return res.data;
};

export const getImageUrl = (image) => {
    if (!image) {
        return "https://via.placeholder.com/400x300?text=No+Image";
    }

    // New Cloudinary images
    if (
        image.startsWith("http://") ||
        image.startsWith("https://")
    ) {
        return image;
    }

    // Old images stored in server/uploads
    const SERVER_ROOT = API_BASE.replace(/\/api\/?$/, "");

    return `${SERVER_ROOT}/uploads/${encodeURIComponent(image)}`;
};