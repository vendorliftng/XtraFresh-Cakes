"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Helper to get testimonials from localStorage
const loadTestimonials = () => {
  try {
    const data = typeof window !== 'undefined' && localStorage.getItem('testimonials');
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to parse testimonials from localStorage', e);
    return [];
  }
};

const saveTestimonials = (testimonials) => {
  try {
    typeof window !== 'undefined' && localStorage.setItem('testimonials', JSON.stringify(testimonials));
  } catch (e) {
    console.error('Failed to save testimonials to localStorage', e);
  }
};

export default function TestimonialCarousel() {
  const [testimonials, setTestimonials] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    setTestimonials(loadTestimonials());
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-section" style={{ background: 'var(--color-bg)', position: 'relative' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--color-primary)', fontSize: 'clamp(2rem,6vw,3rem)' }}>
          What Our Customers Say
        </h2>
        {/* Carousel */}
        {testimonials.length > 0 ? (
          <div style={{ position: 'relative' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonials[current].id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                style={{ background: 'rgba(255,255,255,0.9)', padding: '2rem', borderRadius: '12px', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}
              >
                <p style={{ fontStyle: 'italic', marginBottom: '1rem' }}>"{testimonials[current].message}"</p>
                <p style={{ textAlign: 'right', fontWeight: 600 }}>- {testimonials[current].name}</p>
              </motion.div>
            </AnimatePresence>
            {/* Navigation */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem', gap: '1rem' }}>
              <button onClick={prev} className="btn btn-secondary" disabled={testimonials.length < 2}>← Prev</button>
              <button onClick={next} className="btn btn-secondary" disabled={testimonials.length < 2}>Next →</button>
            </div>
          </div>
        ) : (
          <p style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>No reviews yet. Be the first to share your experience!</p>
        )}
      </div>
    </section>
  );
}
