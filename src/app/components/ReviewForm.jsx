"use client";

import React, { useState } from 'react';
import { Loader2, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const saveTestimonials = (testimonials) => {
  try {
    typeof window !== 'undefined' && localStorage.setItem('testimonials', JSON.stringify(testimonials));
  } catch (e) {
    console.error('Failed to save testimonials to localStorage', e);
  }
};

const loadTestimonials = () => {
  try {
    const data = typeof window !== 'undefined' && localStorage.getItem('testimonials');
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export default function ReviewForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [form, setForm] = useState({ name: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate network delay for effect
    setTimeout(() => {
      const testimonials = loadTestimonials();
      const newTestimonial = { id: Date.now(), name: form.name.trim(), message: form.message.trim() };
      const updated = [newTestimonial, ...testimonials];
      saveTestimonials(updated);
      
      setForm({ name: '', message: '' });
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1000);
  };

  return (
    <div className="fun-card" style={{ maxWidth: '600px', margin: '0 auto', position: 'relative', overflow: 'hidden' }}>
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0 }}
            style={{ textAlign: 'center', padding: '3rem 1rem' }}
          >
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5 }} style={{ color: 'var(--color-secondary)', marginBottom: '1.5rem', display: 'inline-block' }}>
              <CheckCircle size={80} fill="var(--color-primary)" color="white" />
            </motion.div>
            <h3 style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', color: 'var(--color-primary)', marginBottom: '1rem' }}>Thank You!</h3>
            <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)', fontWeight: 600, marginBottom: '2rem' }}>We appreciate your honest feedback.</p>
            <button onClick={() => setIsSuccess(false)} className="btn btn-secondary">Write Another Review</button>
          </motion.div>
        ) : (
          <motion.form 
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit} 
            style={{ position: 'relative' }}
          >
            {isSubmitting && (
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.8)', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Loader2 size={50} color="var(--color-primary)" className="animate-spin" />
              </div>
            )}
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <div>
                <label style={{ fontWeight: 700, marginBottom: '0.5rem', display: 'block' }}>Your Name</label>
                <input
                  name="name"
                  placeholder="What should we call you?"
                  className="form-control"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label style={{ fontWeight: 700, marginBottom: '0.5rem', display: 'block' }}>Your Honest Review</label>
                <textarea
                  name="message"
                  placeholder="What do you like about us? What would you like to change?"
                  className="form-control"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', fontSize: '1.1rem', padding: '1rem' }} disabled={isSubmitting}>
                Submit Review
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
