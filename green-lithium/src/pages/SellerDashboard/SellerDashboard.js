var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom"; // ✅ correct
import { useState } from "react"; // regular import for runtime functions
import "./SellerDashboard.css";
export default function SellerDashboard() {
    var _this = this;
    var navigate = useNavigate();
    var _a = useState([]), products = _a[0], setProducts = _a[1];
    var _b = useState(""), name = _b[0], setName = _b[1];
    var _c = useState(""), description = _c[0], setDescription = _c[1];
    var _d = useState(""), price = _d[0], setPrice = _d[1];
    var _e = useState(null), image = _e[0], setImage = _e[1];
    var _f = useState(""), companyName = _f[0], setCompanyName = _f[1];
    var _g = useState(""), error = _g[0], setError = _g[1];
    var _h = useState(""), selectedProductType = _h[0], setSelectedProductType = _h[1];
    var userId = localStorage.getItem("user_id");
    var token = localStorage.getItem("access_token");
    var productTypes = ["Battery", "Charger", "Accessory"]; // Example dropdown options
    // Handle file input
    var handleFileChange = function (e) {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };
    var addProduct = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var formData, response, data, newProduct, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (!name || !selectedProductType || !price || !userId || !token)
                        return [2 /*return*/];
                    formData = new FormData();
                    formData.append("name", name);
                    formData.append("description", description);
                    formData.append("price", price);
                    formData.append("type", selectedProductType);
                    if (image)
                        formData.append("image", image);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, fetch("/api/seller/".concat(userId, "/products/add/"), {
                            method: "POST",
                            headers: {
                                Authorization: "Bearer ".concat(token),
                            },
                            body: formData,
                        })];
                case 2:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    throw new Error(data.detail || "Failed to add product");
                case 4: return [4 /*yield*/, response.json()];
                case 5:
                    newProduct = _a.sent();
                    setProducts(__spreadArray(__spreadArray([], products, true), [newProduct], false));
                    setName("");
                    setDescription("");
                    setPrice("");
                    setImage(null);
                    setSelectedProductType("");
                    return [3 /*break*/, 7];
                case 6:
                    err_1 = _a.sent();
                    setError(err_1.message || "Something went wrong");
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    if (!userId || !token) {
        return (_jsxs("main", { className: "seller-dashboard", children: [_jsx("p", { className: "error", children: "You must be logged in to access your dashboard." }), _jsx("button", { className: "login-button", onClick: function () { return navigate("/seller/login"); }, children: "Go to Login" })] }));
    }
    return (_jsxs("main", { className: "seller-dashboard", children: [companyName && _jsxs("h1", { className: "dashboard-title", children: ["Welcome, ", companyName, "!"] }), error && _jsx("p", { className: "error", children: error }), _jsxs("section", { className: "card add-product-section", children: [_jsx("h2", { children: "Add Product" }), _jsxs("form", { onSubmit: addProduct, className: "product-form", children: [_jsxs("label", { children: ["Product Type", _jsxs("select", { value: selectedProductType, onChange: function (e) { return setSelectedProductType(e.target.value); }, required: true, children: [_jsx("option", { value: "", children: "Select type..." }), productTypes.map(function (type) { return (_jsx("option", { value: type, children: type }, type)); })] })] }), selectedProductType && (_jsxs(_Fragment, { children: [_jsx("input", { type: "text", placeholder: "Product name", value: name, onChange: function (e) { return setName(e.target.value); }, required: true }), _jsx("textarea", { placeholder: "Description", value: description, onChange: function (e) { return setDescription(e.target.value); } }), _jsx("input", { type: "text", placeholder: "Price (USD)", value: price, onChange: function (e) { return setPrice(e.target.value); }, required: true }), _jsx("input", { type: "file", accept: "image/*", onChange: handleFileChange }), _jsx("button", { type: "submit", children: "Add Product" })] }))] })] }), _jsxs("section", { className: "card products-section", children: [_jsx("h2", { children: "Your Products" }), products.length === 0 ? (_jsx("p", { className: "empty", children: "No products yet" })) : (_jsx("div", { className: "products-grid", children: products.map(function (product) { return (_jsxs("div", { className: "product-card", children: [_jsx("div", { className: "product-placeholder", children: product.name.charAt(0).toUpperCase() }), _jsx("div", { className: "product-name", children: product.name }), _jsx("div", { className: "product-description", children: product.description }), _jsxs("div", { className: "product-price", children: ["$", product.price] }), product.image && _jsx("img", { src: product.image, alt: product.name, className: "product-image" })] }, product.id)); }) }))] })] }));
}
