import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SellerProfile.css";
export default function SellerProfile() {
    const { sellerId } = useParams();
    const [seller, setSeller] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    useEffect(() => {
        const fetchSeller = async () => {
            try {
                const response = await fetch(`/api/seller/${sellerId}/`);
                if (!response.ok) {
                    throw new Error("Failed to fetch seller profile");
                }
                const data = await response.json();
                setSeller(data);
            }
            catch (err) {
                setError(err.message || "Something went wrong");
            }
            finally {
                setLoading(false);
            }
        };
        fetchSeller();
    }, [sellerId]);
    if (loading)
        return _jsx("p", { className: "loading-text", children: "Loading seller..." });
    if (error)
        return _jsx("p", { className: "error-text", children: error });
    if (!seller)
        return _jsx("p", { className: "error-text", children: "Seller not found" });
    return (_jsxs("div", { className: "seller-profile-container", children: [_jsx("h2", { className: "company-name", children: seller.company_name }), _jsx("h3", { className: "products-title", children: "Products" }), _jsxs("div", { className: "products-grid", children: [seller.products.length === 0 && _jsx("p", { children: "No products found" }), seller.products.map((product) => (_jsxs("div", { className: "product-card", children: [product.image ? (_jsx("img", { src: product.image, alt: product.name, className: "product-image" })) : (_jsx("div", { className: "product-placeholder", children: product.name.charAt(0) })), _jsx("h4", { className: "product-name", children: product.name }), _jsxs("p", { className: "product-price", children: ["$", product.price.toFixed(2)] })] }, product.id)))] })] }));
}
