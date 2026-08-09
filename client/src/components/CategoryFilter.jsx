import React from "react";
import "./CategoryFilter.css";

const DEFAULT_CATEGORIES = [
  "Books",
  "Electronics",
  "Clothing",
  "Other",
];

function CategoryFilter({ categories = DEFAULT_CATEGORIES, active, onSelect }) {
  const all = ["All", ...categories];

  return (
    <div className="category-filter">
      {all.map((cat) => (
        <button
          key={cat}
          className={`chip ${active === cat ? "chip-active" : ""}`}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
