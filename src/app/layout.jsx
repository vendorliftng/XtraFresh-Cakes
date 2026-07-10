"use client";

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import './globals.css';

export default function RootLayout({ children }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <html lang="en">
      <body>
        <header
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            transition: 'all 0.3s ease',
            background: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
            backdropFilter: isScrolled ? 'blur(12px)' : 'none',
            borderBottom: isScrolled ? '1px solid rgba(0,0,0,0.05)' : '1px solid transparent',
            padding: isScrolled ? '1rem 0' : '1.5rem 0'
          }}
        >
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="#hero" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, color: isScrolled ? 'var(--color-text-main)' : '#FFF', letterSpacing: '1px', transition: 'color 0.3s ease' }}>
              XTRA FRESH CAKES
            </Link>

            {/* Desktop Nav */}
            <nav style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }} className="desktop-nav">
              <Link href="#collections" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', color: isScrolled ? 'var(--color-text-main)' : '#FFF', transition: 'color 0.3s ease' }}>Collections</Link>
              <Link href="#delivery" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', color: isScrolled ? 'var(--color-text-main)' : '#FFF', transition: 'color 0.3s ease' }}>Lagos Delivery</Link>
              <Link href="#quote" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.8rem' }}>Request Quote</Link>
            </nav>

            {/* Mobile Nav Toggle */}
            <button 
              className="mobile-toggle" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ background: 'none', border: 'none', color: isScrolled ? 'var(--color-text-main)' : '#FFF', cursor: 'pointer', display: 'none', transition: 'color 0.3s ease' }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </header>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{
                position: 'fixed',
                top: '70px',
                left: 0,
                right: 0,
                background: 'rgba(255, 255, 255, 0.98)',
                backdropFilter: 'blur(20px)',
                zIndex: 99,
                padding: '2rem',
                borderBottom: '1px solid rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                alignItems: 'center'
              }}
            >
              <Link href="#collections" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-text-main)' }}>Collections</Link>
              <Link href="#delivery" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-text-main)' }}>Lagos Delivery</Link>
              <Link href="#quote" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Request Quote</Link>
            </motion.div>
          )}
        </AnimatePresence>

        <style dangerouslySetInnerHTML={{__html: `
          @media (max-width: 768px) {
            .desktop-nav { display: none !important; }
            .mobile-toggle { display: block !important; }
          }
        `}} />

        <main style={{ minHeight: '100vh', paddingTop: '0px' }}>
          {children}
        </main>

        <footer style={{ background: 'linear-gradient(to bottom, #FAFAFA, #E2E2E2)', borderTop: '1px solid rgba(0,0,0,0.05)', padding: '6rem 0 2rem' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', marginBottom: '1.5rem', letterSpacing: '1px', color: 'var(--color-text-main)' }}>XTRA FRESH CAKES</h3>
                <p style={{ color: 'var(--color-text-muted)' }}>IGNITE YOUR SENSES. Spectacular centerpieces that steal the show across Lagos. Taste the magic in every bite.</p>
              </div>
              <div>
                <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem', color: 'var(--color-text-main)' }}>Explore</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <Link href="#collections" style={{ color: 'var(--color-text-muted)' }}>Collections</Link>
                  <Link href="#delivery" style={{ color: 'var(--color-text-muted)' }}>Lagos Delivery</Link>
                  <Link href="#quote" style={{ color: 'var(--color-text-muted)' }}>Get a Quote</Link>
                </div>
              </div>
              <div>
                <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem', color: 'var(--color-text-main)' }}>Contact</h4>
                <p style={{ color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>WhatsApp: +234 XXX XXX XXXX</p>
                <p style={{ color: 'var(--color-text-muted)' }}>hello@xtrafreshcakes.com</p>
              </div>
            </div>
            <div style={{ textAlign: 'center', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '2rem', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
              &copy; {new Date().getFullYear()} Xtra Fresh Cakes. Taste The Magic.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
