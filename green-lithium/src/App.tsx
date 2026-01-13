import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // ✅ added Navigate
import Header from "./components/layout/Header.js";
import Footer from "./components/layout/Footer.js";

import Home from "./pages/Home.js";
import Marketplace from "./pages/Marketplace.js";
import Sellers from "./pages/Sellers.js";
import Sustainability from "./pages/Sustainability.js";
import Pricing from "./pages/Pricing.js";
import SellerProfile from "./pages/SellerProfile.js";
import SellerLogin from "./pages/SellerLogin/SellerLogin.js";
import SellerSignup from "./pages/SellerSignup/SellerSignup.js";
import SellerDashboard from "./pages/SellerDashboard/SellerDashboard.js";

interface ProtectedRouteProps {
  children: React.JSX.Element;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem("access_token");

  return token ? children : <Navigate to="/seller/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/sellers" element={<Sellers />} />
        <Route path="/sustainability" element={<Sustainability />} />
        <Route path="/pricing" element={<Pricing />} />

        {/* SELLER ROUTES */}
        <Route path="/seller/login" element={<SellerLogin />} />
        <Route path="/seller/signup" element={<SellerSignup />} />

        {/* Dashboard: protected */}
        <Route
          path="/seller/dashboard"
          element={
            <ProtectedRoute>
              <SellerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Seller Profile (public) */}
        <Route path="/seller/:sellerId" element={<SellerProfile />} />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
