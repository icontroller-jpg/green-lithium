import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SellerLogin.css";

export default function SellerLogin() {
  const [identifier, setIdentifier] = useState(""); // Email or username
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
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
        } else {
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
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <main className="seller-login">
      <div className="login-card">
        <h1>Seller Login</h1>
        <p className="subtitle">
          Access your dashboard to manage products and pricing
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            Email/Username
            <input
              type="text"
              placeholder="Email or Username"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <button type="submit">Sign In</button>
        </form>

        {error && <p className="error">{error}</p>}

        <div className="login-footer">
          <span>New seller?</span>
          <a href="/seller/signup">Create an account</a>
        </div>
      </div>
    </main>
  );
}
