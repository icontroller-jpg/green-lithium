import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Correct way
import { useState } from "react"; // regular import for runtime functions
export default function SellerSignup() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        company_name: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");
        try {
            const response = await fetch("http://127.0.0.1:8000/api/seller/signup/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.username, // backend expects email
                    password: formData.password,
                    company_name: formData.company_name,
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                const errorData = data;
                const firstError = typeof errorData === "string"
                    ? errorData
                    : Object.values(errorData)[0];
                throw new Error(Array.isArray(firstError) ? firstError[0] : String(firstError));
            }
            setSuccess("Account created successfully! You can now sign in.");
            setFormData({
                username: "",
                password: "",
                company_name: "",
            });
        }
        catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
            else {
                setError("Something went wrong. Please try again.");
            }
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("main", { className: "seller-signup", children: _jsxs("div", { className: "signup-card", children: [_jsx("h1", { children: "Create Seller Account" }), _jsx("p", { className: "subtitle", children: "Create an account to start listing and managing products" }), _jsxs("form", { className: "signup-form", onSubmit: handleSubmit, children: [_jsxs("label", { children: ["Email / Username", _jsx("input", { type: "email", name: "username", placeholder: "seller@example.com", value: formData.username, onChange: handleChange, required: true })] }), _jsxs("label", { children: ["Company Name", _jsx("input", { type: "text", name: "company_name", placeholder: "Your company (optional)", value: formData.company_name, onChange: handleChange })] }), _jsxs("label", { children: ["Password", _jsx("input", { type: "password", name: "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", value: formData.password, onChange: handleChange, required: true, minLength: 8 })] }), error && _jsx("p", { className: "error", children: error }), success && _jsx("p", { className: "success", children: success }), _jsx("button", { type: "submit", disabled: loading, children: loading ? "Creating account..." : "Create Account" })] }), _jsxs("div", { className: "signup-footer", children: [_jsx("span", { children: "Already a seller?" }), _jsx("a", { href: "/seller/login", children: "Sign in" })] })] }) }));
}
