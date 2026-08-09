import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Profile from "./pages/Profile";
import Products from "./pages/Products";
import SellProduct from "./pages/sell/SellProduct";
import EditListing from "./pages/sell/EditListing"; // NEW - add this import line
import ItemDetails from "./pages/ItemDetails"; // NEW - marketplace item details page

import ProtectedRoute from "./components/auth/ProtectedRoute";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/products" element={<Products />} />

        {/* NEW - marketplace item details page */}
        <Route path="/listing/:id" element={<ItemDetails />} />

        <Route
          path="/sell"
          element={
            <ProtectedRoute>
              <SellProduct />
            </ProtectedRoute>
          }
        />

        {/* NEW - add this whole Route block, right after /sell */}
        <Route
          path="/edit-listing/:id"
          element={
            <ProtectedRoute>
              <EditListing />
            </ProtectedRoute>
          }
        />

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
