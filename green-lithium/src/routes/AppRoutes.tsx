import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home.js";
import Marketplace from "../pages/Marketplace.js";
import Sellers from "../pages/Sellers.js";
import Sustainability from "../pages/Sustainability.js";
import Pricing from "../pages/Pricing.js";
import SellerLogin from "../pages/SellerLogin/SellerLogin.js";
import SellerSignup from "../pages/SellerSignup/SellerSignup.js";
import SellerDashboard from "../pages/SellerDashboard/SellerDashboard.js";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/sellers" element={<Sellers />} />
      <Route path="/sustainability" element={<Sustainability />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/seller/signup" element={<SellerSignup />} />
      <Route path="/seller/login" element={<SellerLogin />} />
      <Route path="/seller/dashboard" element={<SellerDashboard />} />

    </Routes>
  );
}
