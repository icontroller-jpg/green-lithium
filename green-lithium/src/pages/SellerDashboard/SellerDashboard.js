import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom"; // ✅ correct
import { useState } from "react"; // regular import for runtime functions
import "./SellerDashboard.css";
export default function SellerDashboard() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);
    const [companyName, setCompanyName] = useState("");
    const [error, setError] = useState("");
    const [selectedProductType, setSelectedProductType] = useState("");
    const userId = localStorage.getItem("user_id");
    const token = localStorage.getItem("access_token");
    const productTypes = ["Battery", "Charger", "Accessory"]; // Example dropdown options
    // Handle file input
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };
    const addProduct = async (e) => {
        e.preventDefault();
        if (!name || !selectedProductType || !price || !userId || !token)
            return;
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("type", selectedProductType);
        if (image)
            formData.append("image", image);
        try {
            const response = await fetch(`/api/seller/${userId}/products/add/`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.detail || "Failed to add product");
            }
            const newProduct = await response.json();
            setProducts([...products, newProduct]);
            setName("");
            setDescription("");
            setPrice("");
            setImage(null);
            setSelectedProductType("");
        }
        catch (err) {
            setError(err.message || "Something went wrong");
        }
    };
    if (!userId || !token) {
        return (_jsxs("main", { className: "seller-dashboard", children: [_jsx("p", { className: "error", children: "You must be logged in to access your dashboard." }), _jsx("button", { className: "login-button", onClick: () => navigate("/seller/login"), children: "Go to Login" })] }));
    }
    return (_jsxs("main", { className: "seller-dashboard", children: [companyName && _jsxs("h1", { className: "dashboard-title", children: ["Welcome, ", companyName, "!"] }), error && _jsx("p", { className: "error", children: error }), _jsxs("section", { className: "card add-product-section", children: [_jsx("h2", { children: "Add Product" }), _jsxs("form", { onSubmit: addProduct, className: "product-form", children: [_jsxs("label", { children: ["Product Type", _jsxs("select", { value: selectedProductType, onChange: (e) => setSelectedProductType(e.target.value), required: true, children: [_jsx("option", { value: "", children: "Select type..." }), productTypes.map((type) => (_jsx("option", { value: type, children: type }, type)))] })] }), selectedProductType && (_jsxs(_Fragment, { children: [_jsx("input", { type: "text", placeholder: "Product name", value: name, onChange: (e) => setName(e.target.value), required: true }), _jsx("textarea", { placeholder: "Description", value: description, onChange: (e) => setDescription(e.target.value) }), _jsx("input", { type: "text", placeholder: "Price (USD)", value: price, onChange: (e) => setPrice(e.target.value), required: true }), _jsx("input", { type: "file", accept: "image/*", onChange: handleFileChange }), _jsx("button", { type: "submit", children: "Add Product" })] }))] })] }), _jsxs("section", { className: "card products-section", children: [_jsx("h2", { children: "Your Products" }), products.length === 0 ? (_jsx("p", { className: "empty", children: "No products yet" })) : (_jsx("div", { className: "products-grid", children: products.map((product) => (_jsxs("div", { className: "product-card", children: [_jsx("div", { className: "product-placeholder", children: product.name.charAt(0).toUpperCase() }), _jsx("div", { className: "product-name", children: product.name }), _jsx("div", { className: "product-description", children: product.description }), _jsxs("div", { className: "product-price", children: ["$", product.price] }), product.image && _jsx("img", { src: product.image, alt: product.name, className: "product-image" })] }, product.id))) }))] })] }));
}
