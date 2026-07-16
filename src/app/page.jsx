"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Loader2, CheckCircle, Sparkles, MessageCircle, Phone, Heart, Star, Clock } from 'lucide-react';

import { CONFIG } from './config';
import cakesData from '../data/cakes.json';
import TestimonialCarousel from './components/TestimonialCarousel';

export default function Home() {
  const basePath = process.env.NODE_ENV === 'production' ? '/XtraFresh-Cakes' : '';

  // Form State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isInquirySubmitting, setIsInquirySubmitting] = useState(false);
  const [isInquirySuccess, setIsInquirySuccess] = useState(false);
  
  // Preloader State
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const WHATSAPP_NUMBER = CONFIG.WHATSAPP_NUMBER;
  const CALL_NUMBER_1 = CONFIG.CALL_NUMBER;

  const CAKES = cakesData;

  const handleOrderCake = (cake) => {
    const text = `Hey Biliqis! I'm completely obsessed with the ${cake.title} and need to order one ASAP! 🤤`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL;
      if (scriptUrl) {
        await fetch(scriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
          mode: 'no-cors'
        });
      } else {
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
      
      setIsSuccess(true);
      e.target.reset();
      
      const whatsappMsg = `Hey Biliqis! I've got a big event coming up and I need a custom cake that'll steal the show! ✨\n\nName: ${data.firstName} ${data.lastName}\nEvent: ${data.eventType} on ${data.eventDate}\nWhatsApp: ${data.phone}\nMy Vision: ${data.vision}`;
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMsg)}`;
      window.open(whatsappUrl, '_blank');
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setIsInquirySubmitting(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsInquirySuccess(true);
      e.target.reset();
      
      const whatsappMsg = `Hey there! Quick question about your awesome cakes... 🍰\n\nFrom: ${data.name}\n\nMessage:\n${data.message}`;
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMsg)}`;
      window.open(whatsappUrl, '_blank');
    } catch (error) {
      console.error(error);
    } finally {
      setIsInquirySubmitting(false);
    }
  }

  const bounceAnimation = {
    y: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  };

  return (
    <main>
      {/* Fun Animated Preloader */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ y: 0 }} 
            exit={{ y: '-100%', opacity: 0 }} 
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            style={{ position: 'fixed', inset: 0, background: 'var(--color-bg)', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
          >
            <motion.div 
              animate={{ rotate: 360, scale: [1, 1.2, 1] }} 
              transition={{ rotate: { duration: 3, repeat: Infinity, ease: 'linear' }, scale: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' } }}
            >
              <div className="blob-shape" style={{ width: '150px', height: '150px', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(255, 51, 102, 0.3)' }}>
                <Sparkles color="white" size={60} />
              </div>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.5 }}
              style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', color: 'var(--color-text-main)', marginTop: '2.5rem', fontFamily: 'var(--font-heading)' }}
            >
              Xtra Fresh Cakes
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Sticky Chat Widget */}
      <div style={{ position: 'fixed', bottom: '2rem', right: 'clamp(1rem, 5vw, 2rem)', zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.8 }} 
          animate={{ opacity: 1, y: 0, scale: 1 }} 
          transition={{ delay: 3, type: 'spring' }} 
          style={{ background: 'white', padding: '1rem', borderRadius: '20px 20px 0 20px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)', maxWidth: '220px', border: '2px solid var(--color-border)', transformOrigin: 'bottom right' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <div style={{ width: '30px', height: '30px', background: 'var(--color-primary)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontWeight: 'bold', fontSize: '0.8rem' }}>B</div>
            <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--color-text-main)' }}>Biliqis</span>
          </div>
          <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.4 }}>Hi 👋, need help with your order? We reply very fast!</p>
        </motion.div>
        <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hey! I'm craving something sweet and Xtra Fresh! Can you help me pick the perfect cake? 🎂✨")}`} target="_blank" rel="noopener noreferrer" className="btn" style={{ background: '#25D366', color: 'white', width: '65px', height: '65px', borderRadius: '50%', padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 10px 25px rgba(37,211,102,0.4)', border: 'none' }}>
          <MessageCircle size={32} />
        </a>
      </div>

      {/* Hero Section */}
      <section style={{ minHeight: '90vh', paddingTop: '120px', paddingBottom: '4rem', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
        
        {/* Colorful Blobs Background */}
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }} className="blob-shape" style={{ position: 'absolute', top: '-10%', left: '-10%', width: '500px', height: '500px', background: 'var(--color-secondary)', opacity: 0.3, zIndex: -1 }} />
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} className="blob-shape" style={{ position: 'absolute', bottom: '-20%', right: '-5%', width: '600px', height: '600px', background: 'var(--color-primary)', opacity: 0.2, zIndex: -1 }} />
        
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'center' }}>
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, type: 'spring' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'white', border: '3px solid var(--color-border)', padding: '0.5rem 1.2rem', borderRadius: '50px', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '1.5rem', fontSize: 'clamp(0.8rem, 3vw, 1rem)' }}>
                LAGOS' FINEST BAKERY
              </div>
              <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', lineHeight: 1.1, color: 'var(--color-text-main)', margin: '0 0 1rem 0' }}>
                Premium Cakes for <br/>Your <span style={{ color: 'var(--color-primary)', display: 'inline-block', position: 'relative' }}>Owambe & Celebrations<svg style={{ position: 'absolute', bottom: '-10px', left: 0, width: '100%', height: '20px' }} viewBox="0 0 100 20"><path d="M0 10 Q 50 20 100 10" stroke="var(--color-secondary)" strokeWidth="6" fill="transparent"/></svg></span>
              </h1>
              <p style={{ fontSize: 'clamp(1rem, 4vw, 1.25rem)', color: 'var(--color-text-muted)', marginBottom: '2.5rem', fontWeight: 600, maxWidth: '520px', lineHeight: 1.6 }}>
                Whether it's a small get-together or a massive party, we bring the sweetness to your doorstep. Freshly baked with love, delivered fast anywhere in Lagos!
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a href="#collections" className="btn btn-primary" style={{ padding: 'clamp(0.8rem, 3vw, 1.2rem) clamp(1.5rem, 5vw, 2.5rem)', fontSize: 'clamp(1rem, 3vw, 1.2rem)' }}>Order Now</a>
                <a href="#quote" className="btn btn-secondary" style={{ padding: 'clamp(0.8rem, 3vw, 1.2rem) clamp(1.5rem, 5vw, 2.5rem)', fontSize: 'clamp(1rem, 3vw, 1.2rem)' }}>Custom Cake?</a>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.8, type: 'spring' }}
              style={{ position: 'relative', minHeight: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              <motion.div animate={{ y: [-15, 15] }} transition={bounceAnimation} style={{ position: 'relative', zIndex: 10, width: '100%', display: 'flex', justifyContent: 'center' }}>
                 <img src={`${basePath}/assets/hero_cake.png`} alt="Delicious Masterpiece Cake" style={{ width: '90%', maxWidth: '450px', borderRadius: '40px', border: 'clamp(5px, 2vw, 10px) solid white', boxShadow: '0 20px 50px rgba(255, 51, 102, 0.2)', transform: 'rotate(3deg)' }} />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Promise Section */}
      <section id="promise" className="py-section" style={{ background: 'var(--color-primary)', color: 'white', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-50px', left: 0, right: 0, height: '100px', background: 'var(--color-bg)', borderRadius: '0 0 50% 50%' }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 10, marginTop: '2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', color: 'white', margin: '0 0 1rem 0' }}>Why you'll absolutely love our cakes</h2>
            <p style={{ fontSize: 'clamp(1rem, 3.5vw, 1.2rem)', fontWeight: 600, opacity: 0.9 }}>We put our heart into every bake, and it shows.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div className="fun-card" style={{ background: 'rgba(255,255,255,0.1)', border: '2px solid rgba(255,255,255,0.2)', padding: '2rem', textAlign: 'center', color: 'white', boxShadow: 'none' }}>
              <div style={{ width: '70px', height: '70px', background: 'white', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 1.5rem', color: 'var(--color-primary)' }}>
                <Heart size={35} />
              </div>
              <h3 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Premium Ingredients</h3>
              <p style={{ opacity: 0.9, fontWeight: 600, fontSize: '0.95rem' }}>We don't cut corners. Your cake gets only the finest butter, imported chocolate, and fresh extracts.</p>
            </div>
            
            <div className="fun-card" style={{ background: 'rgba(255,255,255,0.1)', border: '2px solid rgba(255,255,255,0.2)', padding: '2rem', textAlign: 'center', color: 'white', boxShadow: 'none' }}>
              <div style={{ width: '70px', height: '70px', background: 'white', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 1.5rem', color: 'var(--color-secondary)' }}>
                <Clock size={35} />
              </div>
              <h3 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Lightning Delivery</h3>
              <p style={{ opacity: 0.9, fontWeight: 600, fontSize: '0.95rem' }}>Your cake arrives on time and perfectly intact, anywhere in Lagos. No stories, no excuses!</p>
            </div>
            
            <div className="fun-card" style={{ background: 'rgba(255,255,255,0.1)', border: '2px solid rgba(255,255,255,0.2)', padding: '2rem', textAlign: 'center', color: 'white', boxShadow: 'none' }}>
              <div style={{ width: '70px', height: '70px', background: 'white', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 1.5rem', color: 'var(--color-accent)' }}>
                <Star size={35} />
              </div>
              <h3 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Impeccable Decor</h3>
              <p style={{ opacity: 0.9, fontWeight: 600, fontSize: '0.95rem' }}>Our decorators are true artists. We craft centerpieces that'll have everyone asking, "Where did you get this cake?"</p>
            </div>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: '-50px', left: 0, right: 0, height: '100px', background: 'white', borderRadius: '50% 50% 0 0' }}></div>
      </section>

      {/* Product Catalog Grid */}
      <section id="collections" className="py-section" style={{ background: 'white' }}>
        <div className="container">
          <div className="text-center" style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 5vw, 4rem)' }}>
            <h2 style={{ fontSize: 'clamp(2.5rem, 7vw, 4rem)', color: 'var(--color-primary)', margin: '0 0 1rem 0' }}>Cakes you're currently crushing on</h2>
            <p style={{ fontSize: 'clamp(1rem, 4vw, 1.2rem)', color: 'var(--color-text-muted)', fontWeight: 600 }}>See something you like? Tap to chat with us and order instantly.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
            {CAKES.slice(0, 12).map((cake, i) => (
              <motion.div key={cake.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="fun-card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div style={{ position: 'relative', width: '100%', height: '280px', background: 'var(--color-bg)' }}>
                  <img src={`${basePath}${cake.img}`} alt={cake.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-accent)', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '1px' }}>{cake.category}</span>
                  <h3 style={{ fontSize: 'clamp(1.4rem, 4vw, 1.8rem)', color: 'var(--color-text-main)', margin: '0 0 0.5rem 0', lineHeight: 1.2 }}>{cake.title}</h3>
                  
                  
                  <div style={{ marginTop: 'auto' }}>
                    <button onClick={() => handleOrderCake(cake)} className="btn btn-primary" style={{ width: '100%', display: 'flex', gap: '0.5rem', justifyContent: 'center', fontSize: '1rem', padding: '1rem' }}>
                      Order via WhatsApp
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialCarousel />

      {/* Quote Form Section */}
      <section id="quote" className="py-section" style={{ background: 'var(--color-bg)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 5vw, 3rem)' }}>
            <h2 style={{ fontSize: 'clamp(2.5rem, 7vw, 4rem)', color: 'var(--color-text-main)', margin: '0 0 1rem 0' }}>Let's design your dream cake!</h2>
            <p style={{ fontSize: 'clamp(1rem, 4vw, 1.2rem)', color: 'var(--color-text-muted)', fontWeight: 600, maxWidth: '600px', margin: '0 auto' }}>Can't find exactly what you're looking for? Tell us what you have in mind and we'll bring it to life.</p>
          </div>

          <div className="fun-card" style={{ maxWidth: '800px', margin: '0 auto', padding: 'clamp(1.5rem, 5vw, 3rem)', position: 'relative' }}>
            <AnimatePresence>
              {isSuccess ? (
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                  <motion.div animate={{ rotate: [0, -10, 10, -10, 10, 0] }} transition={{ duration: 1 }} style={{ color: 'var(--color-secondary)', marginBottom: '1.5rem', display: 'inline-block' }}>
                    <CheckCircle size={100} fill="var(--color-primary)" color="white" />
                  </motion.div>
                  <h3 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--color-primary)', marginBottom: '1rem' }}>Details Received</h3>
                  <p style={{ fontSize: 'clamp(1rem, 3.5vw, 1.2rem)', color: 'var(--color-text-muted)', fontWeight: 600, marginBottom: '2rem' }}>Redirecting you to WhatsApp to connect with Biliqis...</p>
                  <button onClick={() => setIsSuccess(false)} className="btn btn-secondary">Commission Another Cake</button>
                </motion.div>
              ) : (
                <motion.form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {isSubmitting && (
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.8)', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '16px' }}>
                      <Loader2 size={60} color="var(--color-primary)" className="animate-spin" />
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                    <div><label style={{ fontWeight: 700, marginBottom: '0.5rem', display: 'block' }}>First Name</label><input name="firstName" className="form-control" required /></div>
                    <div><label style={{ fontWeight: 700, marginBottom: '0.5rem', display: 'block' }}>Last Name</label><input name="lastName" className="form-control" required /></div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                    <div><label style={{ fontWeight: 700, marginBottom: '0.5rem', display: 'block' }}>WhatsApp Number</label><input name="phone" type="tel" className="form-control" required /></div>
                    <div><label style={{ fontWeight: 700, marginBottom: '0.5rem', display: 'block' }}>Email Address</label><input name="email" type="email" className="form-control" /></div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                    <div>
                      <label style={{ fontWeight: 700, marginBottom: '0.5rem', display: 'block' }}>Event Type</label>
                      <select name="eventType" className="form-control" required>
                        <option value="">Select an event...</option>
                        <option value="birthday">Birthday Celebration</option>
                        <option value="wedding">Wedding Ceremony</option>
                        <option value="anniversary">Anniversary</option>
                        <option value="corporate">Corporate Event</option>
                        <option value="everyday">Everyday Indulgence</option>
                      </select>
                    </div>
                    <div><label style={{ fontWeight: 700, marginBottom: '0.5rem', display: 'block' }}>Event Date</label><input name="eventDate" type="date" className="form-control" required /></div>
                  </div>

                  <div>
                    <label style={{ fontWeight: 700, marginBottom: '0.5rem', display: 'block' }}>Describe Your Vision</label>
                    <textarea name="vision" className="form-control" rows="4" placeholder="Colors, flavors, sizing, and design preferences..." required></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%', fontSize: 'clamp(1.1rem, 4vw, 1.3rem)', padding: 'clamp(1.2rem, 4vw, 1.5rem)' }}>CONNECT VIA WHATSAPP</button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* General Inquiry Section */}
      <section id="contact" className="py-section" style={{ background: 'white' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 5vw, 3rem)' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', color: 'var(--color-primary)', margin: '0 0 1rem 0' }}>Got a question? We're all ears!</h2>
            <p style={{ fontSize: 'clamp(0.95rem, 3.5vw, 1.1rem)', color: 'var(--color-text-muted)', fontWeight: 600 }}>Say hi on WhatsApp or drop us a quick message.</p>
          </div>

          <div className="fun-card" style={{ padding: 'clamp(1.5rem, 5vw, 2.5rem)', position: 'relative' }}>
             
             <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <p style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '1.5rem' }}>Contact us instantly via:</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
                  <a href={`tel:${CALL_NUMBER_1}`} className="btn" style={{ background: 'var(--color-primary)', color: 'white', padding: '0.8rem 1.5rem', borderRadius: '20px', fontSize: 'clamp(0.9rem, 3vw, 1rem)' }}>
                    <Phone size={18} style={{ marginRight: '8px' }} /> Call: 0802 134 2856
                  </a>
                  <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="btn" style={{ background: '#25D366', color: 'white', padding: '0.8rem 1.5rem', borderRadius: '20px', fontSize: 'clamp(0.9rem, 3vw, 1rem)' }}>
                    <MessageCircle size={18} style={{ marginRight: '8px' }} /> WhatsApp / Call: 0906 000 9541
                  </a>
                </div>
             </div>

             <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '2px dashed var(--color-border)' }}>
               <h3 style={{ fontSize: '1.2rem', color: 'var(--color-text-main)', textAlign: 'center', marginBottom: '1rem' }}>Or send a quick message:</h3>
               <AnimatePresence>
                {isInquirySuccess ? (
                   <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5 }} style={{ color: 'var(--color-secondary)', marginBottom: '1rem', display: 'inline-block' }}>
                      <CheckCircle size={80} fill="var(--color-primary)" color="white" />
                    </motion.div>
                    <h3 style={{ fontSize: 'clamp(1.8rem, 5vw, 2rem)', color: 'var(--color-primary)', marginBottom: '1rem' }}>Redirecting...</h3>
                    <p style={{ fontSize: 'clamp(1rem, 3.5vw, 1.1rem)', color: 'var(--color-text-muted)', fontWeight: 600, marginBottom: '2rem' }}>Opening WhatsApp to send your inquiry.</p>
                    <button onClick={() => setIsInquirySuccess(false)} className="btn btn-secondary">Send Another Message</button>
                  </motion.div>
                ) : (
                  <motion.form onSubmit={handleInquirySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {isInquirySubmitting && (
                      <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.8)', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '16px' }}>
                        <Loader2 size={50} color="var(--color-primary)" className="animate-spin" />
                      </div>
                    )}
                    
                    <div>
                      <label style={{ fontWeight: 700, marginBottom: '0.5rem', display: 'block' }}>Your Name</label>
                      <input name="name" className="form-control" required />
                    </div>
                    <div>
                      <label style={{ fontWeight: 700, marginBottom: '0.5rem', display: 'block' }}>Your Message</label>
                      <textarea name="message" className="form-control" rows="4" required placeholder="How can we help you today?"></textarea>
                    </div>
                    
                    <button type="submit" className="btn btn-secondary" style={{ width: '100%', fontSize: 'clamp(1rem, 4vw, 1.2rem)', padding: 'clamp(1rem, 4vw, 1.2rem)' }}>SEND TO WHATSAPP</button>
                  </motion.form>
                )}
               </AnimatePresence>
             </div>
          </div>
        </div>
      </section>
    </main>
  );
}
