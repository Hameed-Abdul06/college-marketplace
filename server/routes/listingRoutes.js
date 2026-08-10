const express = require("express");
const router = express.Router();

const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

const cloudinary = require("../config/cloudinary");
const Listing = require("../models/Listing");

const {
    createListing,
    getMyListings,
    updateListing,
    deleteListing,
    markAsSold,
} = require("../controllers/listingController");

const protect = require("../middleware/authMiddleware");

// Cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "college-marketplace",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
    },
});

const upload = multer({ storage });

// Create listing
router.post("/", protect, upload.single("image"), createListing);

// My listings
router.get("/my", protect, getMyListings);

// Get categories
router.get("/categories", async (req, res) => {
    try {
        const categories = await Listing.distinct("category");
        res.json(categories);
    } catch (err) {
        res.status(500).json({
            message: "Server error",
            error: err.message,
        });
    }
});

// Get listings by category
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
        res.status(500).json({
            message: "Server error",
            error: err.message,
        });
    }
});

// Get all available listings
router.get("/", async (req, res) => {
    try {
        const { search, category } = req.query;

        const filter = {
            status: "Available",
        };

        if (category && category !== "All") {
            filter.category = category;
        }

        if (search) {
            filter.title = {
                $regex: search,
                $options: "i",
            };
        }

        const listings = await Listing.find(filter)
            .populate("seller", "fullName")
            .sort({ createdAt: -1 });

        res.json(listings);
    } catch (err) {
        res.status(500).json({
            message: "Server error",
            error: err.message,
        });
    }
});

// Get single listing
router.get("/:id", async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id)
            .populate("seller", "fullName");

        if (!listing) {
            return res.status(404).json({
                message: "Listing not found",
            });
        }

        res.json(listing);
    } catch (err) {
        res.status(500).json({
            message: "Server error",
            error: err.message,
        });
    }
});

// Update listing
router.put("/:id", protect, updateListing);

// Delete listing
router.delete("/:id", protect, deleteListing);

// Mark as sold
router.put("/:id/sold", protect, markAsSold);

module.exports = router;