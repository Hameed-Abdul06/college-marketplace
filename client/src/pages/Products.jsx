import "../styles/Products.css";
import Navbar from "../components/common/Navbar";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import ListingCard from "../components/ListingCard";
import { getListings, getCategories } from "../api/listingApi";
import { useState, useEffect, useCallback } from "react";

function Products() {
  const [listings, setListings] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  const fetchListings = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getListings(search, activeCategory);
      setListings(data);
    } catch (err) {
      setError("Couldn't load listings. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }, [search, activeCategory]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  return (
    <>
      <Navbar />
      <main className="products">
        <header className="products-header">
          <h1>Browse Products</h1>
          <p>Find what you need from sellers on campus</p>
          <SearchBar onSearch={setSearch} />
        </header>

        <CategoryFilter
          categories={categories.length ? categories : undefined}
          active={activeCategory}
          onSelect={setActiveCategory}
        />

        {loading && <p className="state-msg">Loading listings...</p>}
        {error && <p className="state-msg state-error">{error}</p>}

        {!loading && !error && listings.length === 0 && (
          <p className="state-msg">
            No listings found{search ? ` for "${search}"` : ""}
            {activeCategory !== "All" ? ` in ${activeCategory}` : ""}.
          </p>
        )}

        <div className="listing-grid">
          {listings.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
        </div>
      </main>
    </>
  );
}

export default Products;
