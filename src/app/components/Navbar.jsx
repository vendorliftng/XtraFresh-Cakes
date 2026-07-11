"use client";

import { useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import CartBadge from "./CartBadge";
import CartSidebar from "../CartSidebar";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [showCart, setShowCart] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const basePath = process.env.NODE_ENV === 'production' ? '/XtraFresh-Cakes' : '';

  return (
    <>
      <nav style={{ position: "fixed", top: 0, width: "100%", padding: "clamp(0.8rem, 2vw, 1.5rem) 0", zIndex: 100, background: "rgba(255, 245, 248, 0.9)", backdropFilter: "blur(10px)", borderBottom: "clamp(2px, 1vw, 4px) solid var(--color-border)" }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 clamp(0.5rem, 2vw, 2rem)", gap: "10px" }}>
          <a href={`${basePath}/`} style={{ textDecoration: 'none', fontSize: "clamp(1.2rem, 3.5vw, 1.8rem)", fontWeight: 800, fontFamily: "var(--font-heading)", color: "var(--color-primary)", whiteSpace: "nowrap" }}>
            XTRA FRESH<span style={{ color: "var(--color-secondary)" }}>!</span>
          </a>
          <div className="desktop-nav-links" style={{ display: "flex", gap: "clamp(0.2rem, 1vw, 2rem)", alignItems: "center" }}>
            <a href={`${basePath}/#collections`} className="nav-link-item" style={{ fontWeight: 700, color: "var(--color-text-main)", fontSize: "clamp(0.6rem, 1.5vw, 1rem)", textDecoration: 'none' }}>Cakes</a>
            <a href={`${basePath}/#promise`} className="nav-link-item" style={{ fontWeight: 700, color: "var(--color-text-main)", fontSize: "clamp(0.6rem, 1.5vw, 1rem)", textDecoration: 'none' }}>Our Promise</a>
            <a href={`${basePath}/reviews`} className="nav-link-item" style={{ fontWeight: 700, color: "var(--color-text-main)", fontSize: "clamp(0.6rem, 1.5vw, 1rem)", textDecoration: 'none' }}>Reviews</a>
            
            <a href={`${basePath}/#quote`} className="btn btn-primary" style={{ padding: "clamp(0.2rem, 1vw, 0.6rem) clamp(0.5rem, 2vw, 1.5rem)", fontSize: "clamp(0.6rem, 1.5vw, 1rem)" }}>Order Now</a>
            <button onClick={() => setShowCart(!showCart)} aria-label="Cart" style={{ background: "none", border: "none", position: "relative", cursor: "pointer" }}>
              <ShoppingCart size={24} color="var(--color-text-main)" />
              <CartBadge />
            </button>
            <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ position: 'fixed', top: '75px', left: 0, right: 0, background: 'var(--color-bg)', borderBottom: '2px solid var(--color-border)', zIndex: 99, padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
          >
            <a onClick={() => setIsMobileMenuOpen(false)} href={`${basePath}/#collections`} style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--color-text-main)', textDecoration: 'none' }}>Cakes</a>
            <a onClick={() => setIsMobileMenuOpen(false)} href={`${basePath}/#promise`} style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--color-text-main)', textDecoration: 'none' }}>Our Promise</a>
            <a onClick={() => setIsMobileMenuOpen(false)} href={`${basePath}/reviews`} style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--color-text-main)', textDecoration: 'none' }}>Reviews</a>
          </motion.div>
        )}
      </AnimatePresence>

      <CartSidebar isOpen={showCart} onClose={() => setShowCart(false)} />
    </>
  );
}
