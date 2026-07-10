"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Loader2, CheckCircle, Mail, MessageCircle, Heart, Star, Sparkles } from 'lucide-react';

export default function Home() {
  // Form State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isInquirySubmitting, setIsInquirySubmitting] = useState(false);
  const [isInquirySuccess, setIsInquirySuccess] = useState(false);

  const WHATSAPP_NUMBER = "2348021342856";

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
      
      const whatsappMsg = `Hi Xtra Fresh Cakes! 🎂 I'd like to order a cake!\n\nName: ${data.firstName} ${data.lastName}\nEvent: ${data.eventType} on ${data.eventDate}\nZone: ${data.deliveryZone}\nGuests: ${data.guestCount}\nDetails: ${data.vision}`;
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
      
      const whatsappMsg = `Hi Xtra Fresh Cakes! 🌟 Question from ${data.name}:\n\n${data.message}`;
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
      {/* Super Fun Hero Section */}
      <section style={{ minHeight: '100vh', paddingTop: '120px', paddingBottom: '4rem', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
        
        {/* Colorful Blobs Background */}
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }} className="blob-shape" style={{ position: 'absolute', top: '-10%', left: '-10%', width: '500px', height: '500px', background: 'var(--color-secondary)', opacity: 0.3, zIndex: -1 }} />
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} className="blob-shape" style={{ position: 'absolute', bottom: '-20%', right: '-5%', width: '600px', height: '600px', background: 'var(--color-primary)', opacity: 0.2, zIndex: -1 }} />
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="blob-shape" style={{ position: 'absolute', top: '20%', right: '15%', width: '300px', height: '300px', background: 'var(--color-accent)', opacity: 0.3, zIndex: -1 }} />

        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'center' }}>
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, type: 'spring' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'white', border: '3px solid var(--color-border)', padding: '0.5rem 1.2rem', borderRadius: '50px', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '1.5rem' }}>
                <Sparkles size={20} /> LAGOS' HAPPIEST CAKES!
              </div>
              <h1 style={{ fontSize: 'clamp(3.5rem, 8vw, 6rem)', lineHeight: 1.1, color: 'var(--color-text-main)', marginBottom: '1.5rem' }}>
                Baking <span style={{ color: 'var(--color-primary)', display: 'inline-block', position: 'relative' }}>Smiles<svg style={{ position: 'absolute', bottom: '-10px', left: 0, width: '100%', height: '20px' }} viewBox="0 0 100 20"><path d="M0 10 Q 50 20 100 10" stroke="var(--color-secondary)" strokeWidth="6" fill="transparent"/></svg></span><br/>Every Single Day.
              </h1>
              <p style={{ fontSize: '1.3rem', color: 'var(--color-text-muted)', marginBottom: '2.5rem', fontWeight: 600, maxWidth: '500px' }}>
                From spectacular birthday bashes to everyday treats, we bake the most colorful, delicious, and fun cakes in all of Lagos!
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a href="#collections" className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '1.2rem 2.5rem' }}>See The Cakes!</a>
                <a href="#quote" className="btn btn-secondary" style={{ fontSize: '1.2rem', padding: '1.2rem 2.5rem' }}>Order Yours</a>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.8, type: 'spring' }}
              style={{ position: 'relative', height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              {/* Fun Hero Image Wrapper */}
              <motion.div animate={{ y: [-15, 15] }} transition={bounceAnimation} style={{ position: 'relative', zIndex: 10 }}>
                 <img src="/assets/hero_cake.png" alt="Delicious Fun Cake" style={{ width: '100%', maxWidth: '450px', borderRadius: '40px', border: '10px solid white', boxShadow: '0 20px 50px rgba(255, 51, 102, 0.2)', transform: 'rotate(3deg)' }} />
              </motion.div>
              
              {/* Floating Embellishments */}
              <motion.div animate={{ y: [-10, 10], rotate: [0, 10, 0] }} transition={{ ...bounceAnimation, delay: 0.5 }} style={{ position: 'absolute', top: '10%', right: '10%', background: 'white', padding: '1rem', borderRadius: '50%', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', zIndex: 20 }}>
                <Star color="var(--color-secondary)" fill="var(--color-secondary)" size={40} />
              </motion.div>
              <motion.div animate={{ y: [10, -10], rotate: [0, -10, 0] }} transition={{ ...bounceAnimation, delay: 1 }} style={{ position: 'absolute', bottom: '20%', left: '0%', background: 'white', padding: '1rem', borderRadius: '50%', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', zIndex: 20 }}>
                <Heart color="var(--color-primary)" fill="var(--color-primary)" size={40} />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Visionary Section */}
      <section id="founder" className="py-section" style={{ background: 'var(--color-primary)', color: 'white', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-50px', left: 0, right: 0, height: '100px', background: 'var(--color-bg)', borderRadius: '0 0 50% 50%' }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 10, marginTop: '2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div style={{ order: 2 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.2)', padding: '0.5rem 1.2rem', borderRadius: '50px', fontWeight: 800, marginBottom: '1.5rem' }}>
                👑 MEET THE BAKER
              </div>
              <h2 style={{ fontSize: '3.5rem', color: 'white', marginBottom: '1.5rem' }}>Olaide Balikis Abdullateef</h2>
              <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem', fontWeight: 600, lineHeight: 1.8 }}>
                Her cake journey started all the way back in 1993. What began as baking sweet treats for family and friends blossomed into a lifelong passion for making people happy with her own hands!
              </p>
              <p style={{ fontSize: '1.2rem', marginBottom: '2rem', fontWeight: 600, lineHeight: 1.8 }}>
                Today, she runs a thriving bakery. But her core philosophy remains beautifully simple: <span style={{ color: 'var(--color-secondary)', fontWeight: 800 }}>Every day should be a happy day.</span> You do not need a special occasion to treat yourself to a slice of joy!
              </p>
            </div>
            <div style={{ order: 1 }}>
              <img src="/assets/hero_cake.png" alt="Founder Olaide Balikis Abdullateef" loading="lazy" style={{ width: '100%', borderRadius: '40px', border: '8px solid white', transform: 'rotate(-3deg)' }} />
            </div>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: '-50px', left: 0, right: 0, height: '100px', background: 'white', borderRadius: '50% 50% 0 0' }}></div>
      </section>

      {/* Colorful Collections Section */}
      <section id="collections" className="py-section" style={{ background: 'white' }}>
        <div className="container">
          <div className="text-center" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '4rem', color: 'var(--color-primary)' }}>Pick Your Flavor!</h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>We have something magical for every single occasion.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
            {[
              { id: 'birthday', title: 'Epic Birthdays', desc: 'Bright, loud, and totally unforgettable birthday cakes!', color: 'var(--color-primary)', img: '/assets/category_birthday.png' },
              { id: 'wedding', title: 'Dreamy Weddings', desc: 'Beautiful, towering tiers of pure love and sweetness.', color: 'var(--color-accent)', img: '/assets/category_wedding.png' },
              { id: 'everyday', title: 'Just Because', desc: 'Treat yourself! You deserve a slice of happiness today.', color: 'var(--color-secondary)', img: '/assets/category_anniversary.png' }
            ].map((cat, i) => (
              <div key={cat.id} className="fun-card" style={{ padding: '2rem', textAlign: 'center' }}>
                <motion.div whileHover={{ scale: 1.05, rotate: 5 }} style={{ width: '200px', height: '200px', margin: '0 auto 1.5rem', borderRadius: '50%', border: `6px solid ${cat.color}`, overflow: 'hidden' }}>
                  <img src={cat.img} alt={cat.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </motion.div>
                <h3 style={{ fontSize: '2rem', color: cat.color }}>{cat.title}</h3>
                <p style={{ color: 'var(--color-text-muted)', fontWeight: 600, marginBottom: '1.5rem' }}>{cat.desc}</p>
                <a href="#quote" className="btn" style={{ background: cat.color, color: 'white', width: '100%' }}>I Want This!</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section id="quote" className="py-section" style={{ background: 'var(--color-bg)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '4rem', color: 'var(--color-text-main)' }}>Let's Bake Magic! ✨</h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Fill out the fun form below and we'll chat on WhatsApp instantly.</p>
          </div>

          <div className="fun-card" style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem', position: 'relative' }}>
            <AnimatePresence>
              {isSuccess ? (
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                  <motion.div animate={{ rotate: [0, -10, 10, -10, 10, 0] }} transition={{ duration: 1 }} style={{ color: 'var(--color-secondary)', marginBottom: '1.5rem', display: 'inline-block' }}>
                    <CheckCircle size={100} fill="var(--color-primary)" color="white" />
                  </motion.div>
                  <h3 style={{ fontSize: '3rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>Woohoo! Captured!</h3>
                  <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', fontWeight: 600, marginBottom: '2rem' }}>Redirecting you to WhatsApp to finish the magic...</p>
                  <button onClick={() => setIsSuccess(false)} className="btn btn-secondary">Order Another One</button>
                </motion.div>
              ) : (
                <motion.form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {isSubmitting && (
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.8)', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '16px' }}>
                      <Loader2 size={60} color="var(--color-primary)" className="animate-spin" />
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    <div><label style={{ fontWeight: 700, marginBottom: '0.5rem', display: 'block' }}>First Name 🥳</label><input name="firstName" className="form-control" required /></div>
                    <div><label style={{ fontWeight: 700, marginBottom: '0.5rem', display: 'block' }}>Last Name</label><input name="lastName" className="form-control" required /></div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    <div><label style={{ fontWeight: 700, marginBottom: '0.5rem', display: 'block' }}>WhatsApp Number 📱</label><input name="phone" type="tel" className="form-control" required /></div>
                    <div><label style={{ fontWeight: 700, marginBottom: '0.5rem', display: 'block' }}>Email Address 📧</label><input name="email" type="email" className="form-control" /></div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    <div>
                      <label style={{ fontWeight: 700, marginBottom: '0.5rem', display: 'block' }}>What are we celebrating? 🎊</label>
                      <select name="eventType" className="form-control" required>
                        <option value="">Pick a party...</option>
                        <option value="birthday">Epic Birthday</option>
                        <option value="wedding">Dreamy Wedding</option>
                        <option value="anniversary">Sweet Anniversary</option>
                        <option value="everyday">Just Because I Want Cake!</option>
                      </select>
                    </div>
                    <div><label style={{ fontWeight: 700, marginBottom: '0.5rem', display: 'block' }}>Date of the Party 🗓️</label><input name="eventDate" type="date" className="form-control" required /></div>
                  </div>

                  <div>
                    <label style={{ fontWeight: 700, marginBottom: '0.5rem', display: 'block' }}>Tell us your wildest cake dreams! 💭</label>
                    <textarea name="vision" className="form-control" rows="4" placeholder="Colors, flavors, themes... go crazy!" required></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%', fontSize: '1.3rem', padding: '1.5rem' }}>SEND TO WHATSAPP 🚀</button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </main>
  );
}
