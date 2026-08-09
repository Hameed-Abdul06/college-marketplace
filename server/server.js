const authRoutes = require("./routes/authRoutes");
const listingRoutes = require("./routes/listingRoutes");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

connectDB();
require("dns").setServers(["8.8.8.8", "1.1.1.1"]);
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/listings", listingRoutes);
app.get("/", (req, res) => {
    res.send("College Marketplace API is Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});