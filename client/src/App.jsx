import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Profile from "./pages/Profile";
import Products from "./pages/Products";
import SellProduct from "./pages/sell/SellProduct";
import EditListing from "./pages/sell/EditListing";
import ItemDetails from "./pages/ItemDetails";

import Navbar from "./components/common/Navbar";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>

            <Navbar />

            <Routes>

                {/* Home */}
                <Route
                    path="/"
                    element={<Home />}
                />

                {/* Authentication */}
                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                {/* Products */}
                <Route
                    path="/products"
                    element={<Products />}
                />

                {/* Item Details */}
                <Route
                    path="/listing/:id"
                    element={<ItemDetails />}
                />

                {/* Sell Product */}
                <Route
                    path="/sell"
                    element={
                        <ProtectedRoute>
                            <SellProduct />
                        </ProtectedRoute>
                    }
                />

                {/* Edit Listing */}
                <Route
                    path="/edit-listing/:id"
                    element={
                        <ProtectedRoute>
                            <EditListing />
                        </ProtectedRoute>
                    }
                />

                {/* Profile */}
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;