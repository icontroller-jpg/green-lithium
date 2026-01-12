import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Marketplace from "../pages/Marketplace";
import Sellers from "../pages/Sellers";
import Sustainability from "../pages/Sustainability";
import Pricing from "../pages/Pricing";
import SellerLogin from "../pages/SellerLogin/SellerLogin";
import SellerSignup from "../pages/SellerSignup/SellerSignup";
import SellerDashboard from "../pages/SellerDashboard/SellerDashboard";


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
