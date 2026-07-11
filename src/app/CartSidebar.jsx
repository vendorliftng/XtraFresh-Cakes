import React from 'react';
import { useCart } from './CartContext';
import { CONFIG } from './config';

export default function CartSidebar({ isOpen, onClose }) {
  const { cartItems, addItem, removeItem, updateQty, clearCart } = useCart();
  const whatsappNumber = CONFIG.WHATSAPP_NUMBER; // business number


  const generateMessage = () => {
    if (cartItems.length === 0) return '';
    let msg = 'Hi Biliqis, I would like to order:%0A';
    cartItems.forEach((item) => {
      msg += `- ${item.title} x${item.qty}%0A`;
    });
    msg += '%0APlease provide delivery details.';
    return encodeURIComponent(msg);
  };

  const handleCheckout = () => {
    const message = generateMessage();
    if (!message) return;
    const url = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(url, '_blank');
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        height: '100vh',
        width: isOpen ? '320px' : '0',
        background: 'rgba(255,255,255,0.95)',
        boxShadow: '-2px 0 8px rgba(0,0,0,0.2)',
        overflow: 'hidden',
        transition: 'width 0.3s ease-in-out',
        zIndex: 150,
      }}
    >
      {isOpen && (
        <div style={{ padding: '1rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <button
            onClick={onClose}
            aria-label="Close Cart"
            style={{ alignSelf: 'flex-end', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}
          >✕</button>
          <h2 style={{ marginBottom: '1rem' }}>Your Cart</h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {cartItems.map((item) => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span>{item.title}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <button onClick={() => updateQty(item.id, Math.max(1, item.qty - 1))} style={{ background: 'none', border: '1px solid #ccc', padding: '0 4px' }}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} style={{ background: 'none', border: '1px solid #ccc', padding: '0 4px' }}>+</button>
                    <button onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer' }}>🗑️</button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div style={{ marginTop: 'auto' }}>
            <button
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', cursor: cartItems.length ? 'pointer' : 'not-allowed' }}
            >Checkout via WhatsApp</button>
          </div>
        </div>
      )}
    </div>
  );
}
