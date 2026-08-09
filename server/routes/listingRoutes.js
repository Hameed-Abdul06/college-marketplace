const express = require("express");
const router = express.Router();
const multer = require("multer");

const Listing = require("../models/Listing");

const {
    createListing,
    getMyListings,
    updateListing,
    deleteListing,
    markAsSold,
} = require("../controllers/listingController");

const protect = require("../middleware/authMiddleware");

// Multer storage config — saves images to uploads/ folder
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

router.post("/", protect, upload.single("image"), createListing);

router.get("/my", protect, getMyListings);

// ---- public routes (no auth) ----

// GET listings by category
router.get("/category/:categoryName", async (req, res) => {
    try {
        const listings = await Listing.find({
            category: req.params.categoryName,
            status: "Available",
        })
            .populate("seller", "fullName")
            .sort({ createdAt: -1 });
        res.json(listings);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// GET all available listings (supports ?search= and ?category=)
router.get("/", async (req, res) => {
    try {
        const { search, category } = req.query;
        const filter = { status: "Available" };

        if (category && category !== "All") {
            filter.category = category;
        }
        if (search) {
            filter.title = { $regex: search, $options: "i" }; // case-insensitive partial match
        }

        const listings = await Listing.find(filter)
            .populate("seller", "fullName")
            .sort({ createdAt: -1 });
        res.json(listings);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// GET a single listing by ID
router.get("/:id", async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id).populate(
            "seller",
            "fullName"
        );
        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }
        res.json(listing);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// ---- end public routes ----

router.put("/:id", protect, updateListing);

router.delete("/:id", protect, deleteListing);

router.put("/:id/sold", protect, markAsSold);

module.exports = router;