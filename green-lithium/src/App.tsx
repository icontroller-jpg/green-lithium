import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // ✅ added Navigate
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import Sellers from "./pages/Sellers";
import Sustainability from "./pages/Sustainability";
import Pricing from "./pages/Pricing";
import SellerProfile from "./pages/SellerProfile";
import SellerLogin from "./pages/SellerLogin/SellerLogin";
import SellerSignup from "./pages/SellerSignup/SellerSignup";
import SellerDashboard from "./pages/SellerDashboard/SellerDashboard";

// ProtectedRoute ensures only logged-in sellers can access dashboard
function ProtectedRoute({ children }: { children: JSX.Element }) {
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
