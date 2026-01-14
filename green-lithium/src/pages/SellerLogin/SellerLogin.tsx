import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../../services/api";
import "./SellerLogin.css";

export default function SellerLogin() {
  const [identifier, setIdentifier] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await apiFetch("/api/seller/login/", {
        method: "POST",
        body: JSON.stringify({
          email_or_username: identifier,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const message =
          typeof data === "object"
            ? Object.values(data).flat().join(" ")
            : "Login failed";
        setError(message);
        return;
      }

      // ✅ store auth data
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      localStorage.setItem("user_id", String(data.user_id));

      navigate("/seller/dashboard");
    } catch (err) {
      console.error(err);
      setError("Unable to connect to server");
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
            Email / Username
            <input
              type="text"
              value={identifier}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setIdentifier(e.target.value)
              }
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              required
            />
          </label>

          {error && <p className="error">{error}</p>}

          <button type="submit">Sign In</button>
        </form>

        <div className="login-footer">
          <span>New seller?</span>
          <a href="/seller/signup">Create an account</a>
        </div>
      </div>
    </main>
  );
}
