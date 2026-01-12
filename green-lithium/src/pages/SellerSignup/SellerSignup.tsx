import { useState, ChangeEvent, FormEvent } from "react";
import "./SellerSignup.css";

interface SellerSignupForm {
  username: string;
  password: string;
  company_name: string;
}

interface ApiErrorResponse {
  [key: string]: string[] | string;
}

export default function SellerSignup() {
  const [formData, setFormData] = useState<SellerSignupForm>({
    username: "",
    password: "",
    company_name: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/seller/signup/",
        {
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
        }
      );

      const data = await response.json();

      if (!response.ok) {
        const errorData = data as ApiErrorResponse;

        const firstError =
          typeof errorData === "string"
            ? errorData
            : Object.values(errorData)[0];

        throw new Error(
          Array.isArray(firstError) ? firstError[0] : String(firstError)
        );
      }

      setSuccess("Account created successfully! You can now sign in.");
      setFormData({
        username: "",
        password: "",
        company_name: "",
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="seller-signup">
      <div className="signup-card">
        <h1>Create Seller Account</h1>
        <p className="subtitle">
          Create an account to start listing and managing products
        </p>

        <form className="signup-form" onSubmit={handleSubmit}>
          <label>
            Email / Username
            <input
              type="email"
              name="username"
              placeholder="seller@example.com"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Company Name
            <input
              type="text"
              name="company_name"
              placeholder="Your company (optional)"
              value={formData.company_name}
              onChange={handleChange}
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={8}
            />
          </label>

          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <div className="signup-footer">
          <span>Already a seller?</span>
          <a href="/seller/login">Sign in</a>
        </div>
      </div>
    </main>
  );
}
