import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sellers.css";
export default function Sellers() {
    const [sellers, setSellers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const fetchSellers = async () => {
            try {
                const response = await fetch("/api/seller/list/");
                if (!response.ok) {
                    throw new Error("Failed to fetch sellers");
                }
                const data = await response.json();
                setSellers(data);
            }
            catch (err) {
                setError(err.message || "Something went wrong");
            }
            finally {
                setLoading(false);
            }
        };
        fetchSellers();
    }, []);
    return (_jsxs("div", { className: "sellers-container", children: [_jsx("h2", { className: "sellers-title", children: "Sellers" }), _jsx("p", { className: "sellers-subtitle", children: "Discover verified lithium manufacturers and suppliers." }), loading && _jsx("p", { className: "loading-text", children: "Loading sellers..." }), error && _jsx("p", { className: "error-text", children: error }), _jsxs("div", { className: "sellers-grid", children: [sellers.map((seller) => (_jsxs("div", { className: "seller-card", style: { cursor: "pointer" }, onClick: () => navigate(`/seller/${seller.id}`), children: [_jsx("div", { className: "seller-avatar", children: seller.company_name
                                    ? seller.company_name.charAt(0).toUpperCase()
                                    : "?" }), _jsx("h3", { className: "seller-name", children: seller.company_name || "Unnamed Company" }), _jsx("p", { className: "seller-tagline", children: "Verified Seller" })] }, seller.id))), !loading && sellers.length === 0 && (_jsx("p", { className: "error-text", children: "No sellers found." }))] })] }));
}
