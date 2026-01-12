import "./Home.css";

export default function Home() {
  return (
    <main className="home">
      {/* Hero */}
      <section className="hero">
        <h1 className="home-title">
          Global Green Lithium Marketplace
        </h1>

        <p className="home-subtitle">
          Verified sellers • Sustainable lithium products • Transparent pricing
        </p>


      </section>

      {/* Featured Products */}
      <section className="section">
        <h2 className="section-title">Featured Products</h2>

        <div className="product-grid">
          <div className="product-card">
            <h3>Lithium-Ion Battery Cells</h3>
            <p>High-density cells from verified suppliers.</p>
          </div>

          <div className="product-card">
            <h3>Lithium Carbonate</h3>
            <p>Battery-grade lithium for industrial use.</p>
          </div>

          <div className="product-card">
            <h3>EV Battery Packs</h3>
            <p>Ready-to-deploy battery solutions.</p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section">
        <h2 className="section-title">Browse by Category</h2>

        <div className="category-grid">
          <div className="category-card">Raw Materials</div>
          <div className="category-card">Battery Cells</div>
          <div className="category-card">Energy Storage</div>
          <div className="category-card">EV Components</div>
        </div>
      </section>
    </main>
  );
}
