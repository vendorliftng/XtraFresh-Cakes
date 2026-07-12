"use client";

import { motion } from "framer-motion";
import { CONFIG } from "../../config";

export default function ProductClient({ cake }) {
  const basePath = process.env.NODE_ENV === 'production' ? '/XtraFresh-Cakes' : '';
  const handleOrder = () => {
    const text = `Hey Biliqis! I'm completely obsessed with the ${cake.title} and need to order one ASAP! 🤤`;
    const url = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <main className="container" style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
      >
        <img src={`${basePath}${cake.img}`} alt={cake.title} style={{ width: "100%", borderRadius: "12px" }} />
        <h1 style={{ fontSize: "clamp(2rem,6vw,3rem)", color: "var(--color-primary)" }}>{cake.title}</h1>
        <span style={{ fontSize: "0.9rem", fontWeight: 800, color: "var(--color-accent)", textTransform: "uppercase" }}>
          {cake.category}
        </span>
        {cake.description && (
          <p style={{ fontSize: "1rem", lineHeight: 1.6, color: "var(--color-text-main)" }}>{cake.description}</p>
        )}
        <button onClick={handleOrder} className="btn btn-primary" style={{ width: "100%", padding: "1rem", fontSize: "1rem" }}>
          Chat with Biliqis to order this cake
        </button>
      </motion.div>
    </main>
  );
}
