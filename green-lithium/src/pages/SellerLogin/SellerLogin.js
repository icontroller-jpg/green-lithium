import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SellerLogin.css";
export default function SellerLogin() {
    const [identifier, setIdentifier] = useState(""); // Email or username
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const response = await fetch("http://127.0.0.1:8000/api/seller/login/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email_or_username: identifier, // ✅ matches DRF serializer
                    password,
                }),
            });
            const data = await response.json();
            console.log("Login response:", data); // useful for debugging
            if (!response.ok) {
                // Flatten backend errors
                let errorMsg = "";
                if (typeof data === "object") {
                    errorMsg = Object.values(data)
                        .flat()
                        .join(" ");
                }
                else {
                    errorMsg = "Login failed.";
                }
                setError(errorMsg);
                return;
            }
            // ✅ Store JWT tokens and user ID for dashboard
            localStorage.setItem("access_token", data.access);
            localStorage.setItem("refresh_token", data.refresh);
            localStorage.setItem("user_id", data.user_id.toString());
            // Redirect to seller dashboard
            navigate("/seller/dashboard");
        }
        catch (err) {
            console.error(err);
            setError("An error occurred. Please try again.");
        }
    };
    return (_jsx("main", { className: "seller-login", children: _jsxs("div", { className: "login-card", children: [_jsx("h1", { children: "Seller Login" }), _jsx("p", { className: "subtitle", children: "Access your dashboard to manage products and pricing" }), _jsxs("form", { className: "login-form", onSubmit: handleSubmit, children: [_jsxs("label", { children: ["Email/Username", _jsx("input", { type: "text", placeholder: "Email or Username", value: identifier, onChange: (e) => setIdentifier(e.target.value), required: true })] }), _jsxs("label", { children: ["Password", _jsx("input", { type: "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", value: password, onChange: (e) => setPassword(e.target.value), required: true })] }), _jsx("button", { type: "submit", children: "Sign In" })] }), error && _jsx("p", { className: "error", children: error }), _jsxs("div", { className: "login-footer", children: [_jsx("span", { children: "New seller?" }), _jsx("a", { href: "/seller/signup", children: "Create an account" })] })] }) }));
}
