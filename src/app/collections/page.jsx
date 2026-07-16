"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CONFIG } from "../config";
import cakesData from "../../data/cakes.json";
import { Loader2 } from "lucide-react";

export default function CollectionsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const loadProducts = async () => {
      try {
        const { fetchData } = await import('../../lib/database');
        const data = await fetchData('Products');
        if (data && data.length > 0) {
          setProducts(data);
        } else {
          setProducts(cakesData);
        }
      } catch (err) {
        console.error(err);
        setProducts(cakesData);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const WHATSAPP_NUMBER = CONFIG.WHATSAPP_NUMBER;
  const basePath = process.env.NODE_ENV === 'production' ? '/XtraFresh-Cakes' : '';

  const handleOrder = (cake) => {
    const text = `Hey Biliqis! I'm completely obsessed with the ${cake.title} and need to order one ASAP! 🤤`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const displayCakes = products.length > 0 ? products : cakesData;

  return (
    <main className="container" style={{ padding: "2rem" }}>
      <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 5vw, 4rem)' }}>
        <h2 style={{ fontSize: "clamp(2.5rem,7vw,4rem)", color: "var(--color-primary)", margin: '0 0 1rem 0' }}>
          Browse our freshly baked beauties
        </h2>
        <p style={{ fontSize: 'clamp(1rem, 4vw, 1.2rem)', color: 'var(--color-text-muted)', fontWeight: 600 }}>See something that makes you hungry? Let's chat!</p>
      </div>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
          <Loader2 className="animate-spin" size={50} color="var(--color-primary)" />
        </div>
      ) : (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2.5rem" }}>
        {displayCakes.map((cake, i) => (
          <motion.div
            key={cake.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="fun-card"
            style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}
          >
            <div style={{ position: "relative", width: "100%", height: "280px", background: "var(--color-bg)" }}>
              <img src={`${basePath}${cake.img}`} alt={cake.title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
              <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--color-accent)", textTransform: "uppercase", marginBottom: "0.5rem", letterSpacing: "1px" }}>
                {cake.category}
              </span>
              <h3 style={{ fontSize: "clamp(1.4rem,4vw,1.8rem)", color: "var(--color-text-main)", margin: "0 0 0.5rem 0", lineHeight: 1.2 }}>
                {cake.title}
              </h3>
              <div style={{ marginTop: "auto" }}>
                <button onClick={() => handleOrder(cake)} className="btn btn-primary" style={{ width: "100%", fontSize: "1rem", padding: "1rem" }}>
                  Chat with Biliqis to order
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      )}
    </main>
  );
}
