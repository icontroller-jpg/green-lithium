import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/marketplace", element: _jsx(Marketplace, {}) }), _jsx(Route, { path: "/sellers", element: _jsx(Sellers, {}) }), _jsx(Route, { path: "/sustainability", element: _jsx(Sustainability, {}) }), _jsx(Route, { path: "/pricing", element: _jsx(Pricing, {}) }), _jsx(Route, { path: "/seller/signup", element: _jsx(SellerSignup, {}) }), _jsx(Route, { path: "/seller/login", element: _jsx(SellerLogin, {}) }), _jsx(Route, { path: "/seller/dashboard", element: _jsx(SellerDashboard, {}) })] }));
}
