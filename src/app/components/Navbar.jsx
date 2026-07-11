"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import CartBadge from "./CartBadge";
import CartSidebar from "../CartSidebar";

export default function Navbar() {
  const [showCart, setShowCart] = useState(false);

  const basePath = process.env.NODE_ENV === 'production' ? '/XtraFresh-Cakes' : '';

  return (
    <>
      <nav style={{ position: "fixed", top: 0, width: "100%", padding: "clamp(0.8rem, 2vw, 1.5rem) 0", zIndex: 100, background: "rgba(255, 245, 248, 0.9)", backdropFilter: "blur(10px)", borderBottom: "clamp(2px, 1vw, 4px) solid var(--color-border)" }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 clamp(0.5rem, 2vw, 2rem)", gap: "10px" }}>
          <a href={`${basePath}/`} style={{ textDecoration: 'none', fontSize: "clamp(1.2rem, 3.5vw, 1.8rem)", fontWeight: 800, fontFamily: "var(--font-heading)", color: "var(--color-primary)", whiteSpace: "nowrap" }}>
            XTRA FRESH<span style={{ color: "var(--color-secondary)" }}>!</span>
          </a>
          <div style={{ display: "flex", gap: "clamp(0.2rem, 1vw, 2rem)", alignItems: "center" }}>
            <a href={`${basePath}/#collections`} style={{ fontWeight: 700, color: "var(--color-text-main)", fontSize: "clamp(0.6rem, 1.5vw, 1rem)", textDecoration: 'none' }}>Cakes</a>
            <a href={`${basePath}/#promise`} style={{ fontWeight: 700, color: "var(--color-text-main)", fontSize: "clamp(0.6rem, 1.5vw, 1rem)", textDecoration: 'none' }}>Our Promise</a>
            <a href={`${basePath}/reviews`} style={{ fontWeight: 700, color: "var(--color-text-main)", fontSize: "clamp(0.6rem, 1.5vw, 1rem)", textDecoration: 'none' }}>Reviews</a>
            <a href={`${basePath}/#quote`} className="btn btn-primary" style={{ padding: "clamp(0.2rem, 1vw, 0.6rem) clamp(0.5rem, 2vw, 1.5rem)", fontSize: "clamp(0.6rem, 1.5vw, 1rem)" }}>Order Now</a>
            <button onClick={() => setShowCart(!showCart)} aria-label="Cart" style={{ background: "none", border: "none", position: "relative", cursor: "pointer" }}>
              <ShoppingCart size={24} color="var(--color-text-main)" />
              <CartBadge />
            </button>
          </div>
        </div>
      </nav>
      <CartSidebar isOpen={showCart} onClose={() => setShowCart(false)} />
    </>
  );
}
