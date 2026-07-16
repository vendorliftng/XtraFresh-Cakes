import React, { useState } from 'react';
import { useCart } from './CartContext';
import { CONFIG } from './config';
import { saveToSheet } from '../lib/database';
import { Loader2 } from 'lucide-react';

export default function CartSidebar({ isOpen, onClose }) {
  const { cartItems, addItem, removeItem, updateQty, clearCart } = useCart();
  const whatsappNumber = CONFIG.WHATSAPP_NUMBER; // business number
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const generateMessage = () => {
    if (cartItems.length === 0) return '';
    let msg = `Hey Biliqis! I'm ready to treat myself to some Xtra Fresh goodness.\n\nFrom: ${name} (${phone})\n\nHere is my order:\n`;
    cartItems.forEach((item) => {
      msg += `- ${item.title} x${item.qty}\n`;
    });
    msg += '\nPlease provide delivery details.';
    return encodeURIComponent(msg);
  };

  const handleCheckout = async () => {
    if (!name.trim() || !phone.trim()) {
      alert("Please enter your name and phone number to proceed.");
      return;
    }
    
    setIsSubmitting(true);
    
    const itemsString = cartItems.map(i => `${i.title} (x${i.qty})`).join(', ');
    const total = cartItems.reduce((sum, i) => sum + (i.price || 0) * i.qty, 0); // Assuming price exists if provided
    const date = new Date().toISOString().split('T')[0];
    
    const rowData = [date, name.trim(), phone.trim(), itemsString, total, "Pending"];
    
    // Save to CRM Orders Sheet
    await saveToSheet('Orders', rowData);
    
    setIsSubmitting(false);

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
              
              <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--color-bg)', borderRadius: '12px' }}>
                <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Your Details</h3>
                <input 
                  placeholder="Your Name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="form-control"
                  style={{ marginBottom: '0.5rem', width: '100%' }}
                  required
                />
                <input 
                  placeholder="Phone Number" 
                  type="tel"
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  className="form-control"
                  style={{ width: '100%' }}
                  required
                />
              </div>
            </div>
          )}
          <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
            <button
              onClick={handleCheckout}
              disabled={cartItems.length === 0 || isSubmitting}
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', cursor: (cartItems.length && !isSubmitting) ? 'pointer' : 'not-allowed', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}
            >
              {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : "Checkout via WhatsApp"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
