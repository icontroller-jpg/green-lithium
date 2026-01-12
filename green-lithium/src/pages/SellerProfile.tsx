import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SellerProfile.css";

interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  image?: string | null;
}

interface SellerProfileData {
  id: number;
  company_name: string;
  products: Product[];
}

export default function SellerProfile() {
  const { sellerId } = useParams<{ sellerId: string }>();
  const [seller, setSeller] = useState<SellerProfileData | null>(null);
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
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchSeller();
  }, [sellerId]);

  if (loading) return <p className="loading-text">Loading seller...</p>;
  if (error) return <p className="error-text">{error}</p>;
  if (!seller) return <p className="error-text">Seller not found</p>;

  return (
    <div className="seller-profile-container">
      <h2 className="company-name">{seller.company_name}</h2>

      <h3 className="products-title">Products</h3>
      <div className="products-grid">
        {seller.products.length === 0 && <p>No products found</p>}
        {seller.products.map((product) => (
          <div key={product.id} className="product-card">
            {product.image ? (
              <img src={product.image} alt={product.name} className="product-image" />
            ) : (
              <div className="product-placeholder">{product.name.charAt(0)}</div>
            )}
            <h4 className="product-name">{product.name}</h4>
            <p className="product-price">${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
