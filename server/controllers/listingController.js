const Listing = require("../models/Listing");

// Add Listing
const createListing = async (req, res) => {
    try {
        const {
            title,
            description,
            price,
            category,
            condition,
            sellerPhone,
        } = req.body;

        if (
            !title ||
            !description ||
            !price ||
            !category ||
            !condition ||
            !sellerPhone
        ) {
            return res.status(400).json({
                message: "Please fill all fields",
            });
        }

        const listing = await Listing.create({
            title,
            description,
            price,
            category,
            condition,
            sellerPhone,

            // Cloudinary image URL
            image: req.file ? req.file.path : null,

            seller: req.user.id,
        });

        res.status(201).json(listing);
    } catch (error) {
        console.error("CREATE LISTING ERROR:", error);

        res.status(500).json({
            message: error.message,
        });
    }
};

// Get My Listings
const getMyListings = async (req, res) => {
    try {
        const listings = await Listing.find({
            seller: req.user.id,
        });

        res.json(listings);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Update Listing
const updateListing = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);

        if (!listing) {
            return res.status(404).json({
                message: "Listing not found",
            });
        }

        Object.assign(listing, req.body);

        await listing.save();

        res.json(listing);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Delete Listing
const deleteListing = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);

        if (!listing) {
            return res.status(404).json({
                message: "Listing not found",
            });
        }

        await listing.deleteOne();

        res.json({
            message: "Listing deleted",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Mark Item Sold
const markAsSold = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);

        if (!listing) {
            return res.status(404).json({
                message: "Listing not found",
            });
        }

        listing.status = "Sold";

        await listing.save();

        res.json(listing);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    createListing,
    getMyListings,
    updateListing,
    deleteListing,
    markAsSold,
};