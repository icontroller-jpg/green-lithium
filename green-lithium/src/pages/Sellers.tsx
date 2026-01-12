import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sellers.css";

interface Seller {
  id: number;
  company_name: string;
}

export default function Sellers() {
  const [sellers, setSellers] = useState<Seller[]>([]);
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
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchSellers();
  }, []);

  return (
    <div className="sellers-container">
      <h2 className="sellers-title">Sellers</h2>
      <p className="sellers-subtitle">
        Discover verified lithium manufacturers and suppliers.
      </p>

      {loading && <p className="loading-text">Loading sellers...</p>}
      {error && <p className="error-text">{error}</p>}

      <div className="sellers-grid">
        {sellers.map((seller) => (
          <div
            key={seller.id}
            className="seller-card"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/seller/${seller.id}`)}
          >
            <div className="seller-avatar">
              {seller.company_name
                ? seller.company_name.charAt(0).toUpperCase()
                : "?"}
            </div>
            <h3 className="seller-name">
              {seller.company_name || "Unnamed Company"}
            </h3>
            <p className="seller-tagline">Verified Seller</p>
          </div>
        ))}

        {!loading && sellers.length === 0 && (
          <p className="error-text">No sellers found.</p>
        )}
      </div>
    </div>
  );
}
