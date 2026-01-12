import { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="header">
        <div className="header-container">
          {/* Hamburger (LEFT) */}
          <button
            className="hamburger"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            ☰
          </button>

          {/* Logo (CENTER) */}
          <Link to="/" className="logo">
            GreenLithium
          </Link>

          {/* Desktop Navigation (RIGHT) */}
          <nav className="desktop-nav">
            <Link to="/marketplace">Marketplace</Link>
            <Link to="/sellers">Sellers</Link>
            <Link to="/sustainability">Sustainability</Link>
            <Link to="/pricing">Pricing</Link>
          </nav>
        </div>
      </header>

      {/* Overlay */}
      {open && (
        <div
          className="overlay"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Side Navigation */}
      <aside className={`side-nav ${open ? "open" : ""}`}>
        <button
          className="close-btn"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          ×
        </button>

        <div className="side-links">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/marketplace" onClick={() => setOpen(false)}>Marketplace</Link>
          <Link to="/sellers" onClick={() => setOpen(false)}>Sellers</Link>
          <Link to="/sustainability" onClick={() => setOpen(false)}>Sustainability</Link>
          <Link to="/pricing" onClick={() => setOpen(false)}>Pricing</Link>
          <Link to="/seller/dashboard" onClick={() => setOpen(false)}>Seller Dashboard</Link>


          <hr />

          <Link to="/seller/login" onClick={() => setOpen(false)}>Seller Login</Link>
          <Link to="/seller/signup" onClick={() => setOpen(false)}>Seller Signup</Link>

        </div>
      </aside>
    </>
  );
}
