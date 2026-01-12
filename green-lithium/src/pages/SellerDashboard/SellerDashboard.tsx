import {  useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./SellerDashboard.css";

type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  image?: string;
};

export default function SellerDashboard() {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [companyName, setCompanyName] = useState("");
  const [error, setError] = useState("");
  const [selectedProductType, setSelectedProductType] = useState("");

  const userId = localStorage.getItem("user_id");
  const token = localStorage.getItem("access_token");

  const productTypes = ["Battery", "Charger", "Accessory"]; // Example dropdown options

  // Handle file input
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const addProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !selectedProductType || !price || !userId || !token) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("type", selectedProductType);
    if (image) formData.append("image", image);

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
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
  };

  if (!userId || !token) {
    return (
      <main className="seller-dashboard">
        <p className="error">You must be logged in to access your dashboard.</p>
        <button className="login-button" onClick={() => navigate("/seller/login")}>
          Go to Login
        </button>
      </main>
    );
  }

  return (
    <main className="seller-dashboard">
      {companyName && <h1 className="dashboard-title">Welcome, {companyName}!</h1>}

      {error && <p className="error">{error}</p>}

      {/* Add Product Section */}
      <section className="card add-product-section">
        <h2>Add Product</h2>
        <form onSubmit={addProduct} className="product-form">
          <label>
            Product Type
            <select
              value={selectedProductType}
              onChange={(e) => setSelectedProductType(e.target.value)}
              required
            >
              <option value="">Select type...</option>
              {productTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>

          {selectedProductType && (
            <>
              <input
                type="text"
                placeholder="Product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="text"
                placeholder="Price (USD)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
              <input type="file" accept="image/*" onChange={handleFileChange} />
              <button type="submit">Add Product</button>
            </>
          )}
        </form>
      </section>

      {/* Products List */}
      <section className="card products-section">
        <h2>Your Products</h2>
        {products.length === 0 ? (
          <p className="empty">No products yet</p>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-placeholder">
                  {product.name.charAt(0).toUpperCase()}
                </div>
                <div className="product-name">{product.name}</div>
                <div className="product-description">{product.description}</div>
                <div className="product-price">${product.price}</div>
                {product.image && <img src={product.image} alt={product.name} className="product-image" />}
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
