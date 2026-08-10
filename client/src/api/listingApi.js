import axios from "axios";

// Adjust this if your backend runs elsewhere (check your existing api.js / .env)
const API_BASE =
    import.meta.env.VITE_API_URL ||
    "https://college-marketplace-server.onrender.com/api";

export const getListings = async (search = "", category = "All") => {
  const params = {};
  if (search) params.search = search;
  if (category && category !== "All") params.category = category;

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

// Builds a full image URL from the filename Multer stored.
// Adjust "/uploads/" to match wherever your server serves static images from.
export const getImageUrl = (filename) => {
  if (!filename) return "https://via.placeholder.com/400x300?text=No+Image";
  const SERVER_ROOT = API_BASE.replace("/api", "");
  return `${SERVER_ROOT}/uploads/${filename}`;
};