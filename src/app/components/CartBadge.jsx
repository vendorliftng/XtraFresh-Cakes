"use client"

import { useCart } from "../CartContext";

export default function CartBadge() {
  const { cartItems } = useCart();
  const count = cartItems.reduce((sum, i) => sum + i.qty, 0);
  if (!count) return null;
  return (
    <span style={{ position: "absolute", top: "-4px", right: "-6px", background: "var(--color-primary)", color: "white", borderRadius: "50%", padding: "2px 5px", fontSize: "0.75rem" }}>{count}</span>
  );
}
