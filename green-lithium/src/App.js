import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
export function ProtectedRoute(_a) {
    var children = _a.children;
    var token = localStorage.getItem("access_token");
    return token ? children : _jsx(Navigate, { to: "/seller/login", replace: true });
}
function App() {
    return (_jsxs(BrowserRouter, { children: [_jsx(Header, {}), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/marketplace", element: _jsx(Marketplace, {}) }), _jsx(Route, { path: "/sellers", element: _jsx(Sellers, {}) }), _jsx(Route, { path: "/sustainability", element: _jsx(Sustainability, {}) }), _jsx(Route, { path: "/pricing", element: _jsx(Pricing, {}) }), _jsx(Route, { path: "/seller/login", element: _jsx(SellerLogin, {}) }), _jsx(Route, { path: "/seller/signup", element: _jsx(SellerSignup, {}) }), _jsx(Route, { path: "/seller/dashboard", element: _jsx(ProtectedRoute, { children: _jsx(SellerDashboard, {}) }) }), _jsx(Route, { path: "/seller/:sellerId", element: _jsx(SellerProfile, {}) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/", replace: true }) })] }), _jsx(Footer, {})] }));
}
export default App;
