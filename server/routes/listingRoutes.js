const express = require("express");
const router = express.Router();
const multer = require("multer");

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

router.put("/:id", protect, updateListing);

router.delete("/:id", protect, deleteListing);

router.put("/:id/sold", protect, markAsSold);

module.exports = router;