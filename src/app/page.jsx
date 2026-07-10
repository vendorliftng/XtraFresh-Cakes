"use client";

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { Loader2, CheckCircle, Mail, MessageCircle } from 'lucide-react';

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300]);

  // Form State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // General Inquiry State
  const [isInquirySubmitting, setIsInquirySubmitting] = useState(false);
  const [isInquirySuccess, setIsInquirySuccess] = useState(false);

  const WHATSAPP_NUMBER = "2348021342856";

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        setIsSuccess(true);
        e.target.reset();
        
        // WhatsApp Redirect
        const whatsappMsg = `Hi Xtra Fresh Cakes! I'd like to commission a cake.\n\nName: ${data.firstName} ${data.lastName}\nEvent: ${data.eventType} on ${data.eventDate}\nZone: ${data.deliveryZone}\nGuests: ${data.guestCount}\nDetails: ${data.vision}`;
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMsg)}`;
        window.open(whatsappUrl, '_blank');
      }
    } catch (error) {
      console.error('Failed to submit quote:', error);
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
      // Simulate backend submission for inquiry (can wire to same API later)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsInquirySuccess(true);
      e.target.reset();
      
      // WhatsApp Redirect
      const whatsappMsg = `Hi Xtra Fresh Cakes! General Inquiry from ${data.name}:\n\n${data.message}`;
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMsg)}`;
      window.open(whatsappUrl, '_blank');
      
    } catch (error) {
      console.error(error);
    } finally {
      setIsInquirySubmitting(false);
    }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] } }
  };

  const categories = [
    { id: 'wedding', title: 'Luxury Weddings', desc: 'Grand, multi-tiered masterpieces for your special day.', price: 'Starts ₦150,000', img: '/assets/category_wedding.png' },
    { id: 'birthday', title: 'Elegant Birthdays', desc: 'Celebrate another year with sophistication and style.', price: 'Starts ₦45,000', img: '/assets/category_birthday.png' },
    { id: 'corporate', title: 'Corporate & VIP', desc: 'Premium branded cakes that reflect your company\'s excellence.', price: 'Custom Quote', img: '/assets/category_anniversary.png' },
    { id: 'engagement', title: 'Traditional Marriage', desc: 'Exquisite cultural designs to honor your rich heritage.', price: 'Starts ₦80,000', img: '/assets/category_wedding.png' },
    { id: 'kids', title: 'Children\'s Couture', desc: 'Whimsical yet elegant designs for unforgettable kids\' parties.', price: 'Starts ₦55,000', img: '/assets/category_birthday.png' },
    { id: 'everyday', title: 'Everyday Indulgence', desc: 'Because luxury should be enjoyed every single day.', price: 'Starts ₦20,000', img: '/assets/category_anniversary.png' }
  ];

  const galleryImages = [
    '/assets/hero_cake.png', '/assets/category_wedding.png', '/assets/category_birthday.png', 
    '/assets/category_anniversary.png', '/assets/hero_cake.png', '/assets/category_wedding.png'
  ];

  return (
    <div ref={containerRef} style={{ background: 'var(--color-bg)' }}>
      {/* Hero Section */}
      <section id="hero" style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', paddingTop: '80px' }}>
        <motion.div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("/assets/hero_cake.png")', backgroundSize: 'cover', backgroundPosition: 'center', y: y1 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(10, 10, 10, 0.75)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '25%', background: 'linear-gradient(to top, var(--color-bg) 0%, transparent 100%)' }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <motion.div variants={staggerContainer} initial="hidden" animate="show" style={{ maxWidth: '900px' }}>
            <motion.div variants={fadeInUp} style={{ display: 'inline-block', background: 'var(--color-primary)', color: '#FFF', padding: '0.4rem 1rem', borderRadius: '30px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              Lagos' Premier Cake Studio
            </motion.div>
            <motion.h1 variants={fadeInUp} style={{ fontSize: 'clamp(3.5rem, 9vw, 6.5rem)', lineHeight: 1, marginBottom: '2rem', letterSpacing: '-2px', color: '#FFF' }}>
              SPECTACULAR <br/><span style={{ color: 'var(--color-primary)', fontStyle: 'italic', fontFamily: 'var(--font-heading)' }}>Centerpieces</span>
            </motion.h1>
            <motion.p variants={fadeInUp} style={{ fontSize: '1.3rem', color: '#E0E0E0', marginBottom: '3rem', maxWidth: '700px', lineHeight: 1.6, fontWeight: 500 }}>
              Elevate your celebrations with uncompromised luxury. From exclusive Victoria Island galas to unforgettable Mainland weddings, we bake the most exquisite, show-stopping cakes in Lagos.
            </motion.p>
            <motion.div variants={fadeInUp} style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <a href="#collections" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1.1rem', fontWeight: 600 }}>Explore Our Collection</a>
              <a href="#quote" className="btn btn-outline" style={{ padding: '1.2rem 3rem', fontSize: '1.1rem', color: '#FFF', borderColor: '#FFF' }}>Commission A Cake</a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section id="story" className="py-section" style={{ position: 'relative', background: 'var(--color-bg)' }}>
        <div className="container">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div>
              <motion.h2 variants={fadeInUp} style={{ fontSize: '3.5rem', marginBottom: '2rem', color: 'var(--color-primary)', lineHeight: 1.1 }}>A TASTE OF <br/>TRUE LUXURY</motion.h2>
              <motion.p variants={fadeInUp} style={{ color: 'var(--color-text-main)', marginBottom: '1.5rem', fontSize: '1.2rem', fontWeight: 500 }}>
                At Xtra Fresh Cakes, we don't just bake; we craft edible masterpieces tailored to your highest standards.
              </motion.p>
              <motion.p variants={fadeInUp} style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>
                Whether it's a towering wedding cake or an elegant anniversary design, we blend premium ingredients with meticulous artistry to leave a lasting impression on your guests.
              </motion.p>
            </div>
            <motion.div variants={fadeInUp} className="glass" style={{ padding: '4rem', borderRadius: 'var(--border-radius)', position: 'relative', border: '1px solid var(--color-primary)' }}>
              <div style={{ position: 'absolute', top: '-30px', left: '-10px', fontSize: '6rem', color: 'var(--color-primary)', opacity: 0.2, lineHeight: 1 }}>"</div>
              <p style={{ fontSize: '1.6rem', fontStyle: 'italic', lineHeight: 1.5, marginBottom: '2rem', color: 'var(--color-text-main)' }}>
                Absolutely breathtaking. The design was flawless and the taste was unparalleled. The highlight of our Lagos wedding.
              </p>
              <p style={{ color: 'var(--color-secondary)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '1rem' }}>— Grace O., Ikoyi</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* The Founder's Story Section */}
      <section id="founder" className="py-section" style={{ background: 'var(--color-bg-alt)' }}>
        <div className="container">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <motion.div variants={fadeInUp} style={{ order: 2 }}>
              <motion.p variants={fadeInUp} style={{ color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>The Visionary</motion.p>
              <motion.h2 variants={fadeInUp} style={{ fontSize: '3.5rem', marginBottom: '2rem', color: 'var(--color-text-main)', lineHeight: 1.1 }}>Olaide Balikis <br/>Abdullateef</motion.h2>
              <motion.p variants={fadeInUp} style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontSize: '1.1rem', lineHeight: 1.8 }}>
                Her cake journey started in 1993, learning the fine art of confectionery. What began as baking for family and friends blossomed into a lifelong passion for making people happy with her hands.
              </motion.p>
              <motion.p variants={fadeInUp} style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.8 }}>
                Today, she runs a thriving bakery serving both bespoke luxury clients and bulk buyers. Yet, her core philosophy remains beautifully simple: <strong style={{ color: 'var(--color-text-main)' }}>Every day should be a happy day.</strong> You do not need a special occasion to treat yourself to a slice of joy.
              </motion.p>
            </motion.div>
            <motion.div variants={fadeInUp} style={{ order: 1, position: 'relative', height: '600px', borderRadius: 'var(--border-radius)', overflow: 'hidden' }}>
              <img src="/assets/hero_cake.png" alt="Founder" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%)' }} />
              <div style={{ position: 'absolute', bottom: '30px', left: '30px', color: '#FFF' }}>
                <p style={{ fontSize: '1.2rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>Since 1993</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio/Categories Section */}
      <section id="collections" className="py-section" style={{ background: 'var(--color-bg)' }}>
        <div className="container">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={staggerContainer} className="text-center" style={{ marginBottom: '5rem' }}>
            <motion.p variants={fadeInUp} style={{ color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>The Portfolio</motion.p>
            <motion.h2 variants={fadeInUp} style={{ fontSize: '4.5rem', color: 'var(--color-text-main)', textTransform: 'uppercase', letterSpacing: '-1px' }}>Masterpieces For<br/>Every Occasion</motion.h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {categories.map((cat, i) => (
              <motion.div key={cat.id} initial={{ opacity: 0, scale: 0.95, y: 30 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: (i % 3) * 0.15 }} className="glass" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', height: '250px', overflow: 'hidden' }}>
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 0.4, y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 } }} style={{ width: '100%', height: '100%', backgroundImage: `url(${cat.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                  <div style={{ position: 'absolute', bottom: '15px', right: '15px', background: 'var(--color-primary)', color: '#FFF', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700, boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>{cat.price}</div>
                </div>
                <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '1.6rem', marginBottom: '0.5rem', color: 'var(--color-primary)' }}>{cat.title}</h3>
                  <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', flex: 1 }}>{cat.desc}</p>
                  <a href="#quote" className="btn btn-outline" style={{ width: '100%', borderColor: 'var(--color-border)' }}>Order Now</a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Masterpiece Gallery */}
      <section id="gallery" className="py-section" style={{ background: 'var(--color-bg-alt)' }}>
        <div className="container">
           <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={staggerContainer} className="text-center" style={{ marginBottom: '4rem' }}>
            <motion.h2 variants={fadeInUp} style={{ fontSize: '3.5rem', color: 'var(--color-text-main)', textTransform: 'uppercase' }}>Gallery of Dreams</motion.h2>
          </motion.div>
          <div style={{ columnCount: 3, columnGap: '1.5rem' }}>
            {galleryImages.map((src, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ breakInside: 'avoid', marginBottom: '1.5rem', borderRadius: 'var(--border-radius)', overflow: 'hidden' }}>
                <img src={src} alt="Cake Masterpiece" style={{ width: '100%', display: 'block', borderRadius: 'var(--border-radius)' }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section id="quote" className="py-section" style={{ background: 'var(--color-bg)' }}>
        <div className="container">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={staggerContainer} className="text-center" style={{ marginBottom: '3rem' }}>
            <motion.h2 variants={fadeInUp} style={{ fontSize: '4rem', color: 'var(--color-secondary)', textTransform: 'uppercase' }}>COMMISSION YOUR CAKE</motion.h2>
            <motion.p variants={fadeInUp} style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto' }}>
              Share your vision with us below. We'll capture your details, and redirect you instantly to WhatsApp to chat with the team.
            </motion.p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="glass" style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem', borderRadius: 'var(--border-radius)', overflow: 'hidden', position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
            <AnimatePresence>
              {isSuccess ? (
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '4rem 2rem' }}>
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }} style={{ color: 'var(--color-primary)', marginBottom: '1.5rem' }}><CheckCircle size={80} strokeWidth={1.5} /></motion.div>
                  <h3 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-text-main)' }}>Opening WhatsApp...</h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', marginBottom: '2rem' }}>Your quote details have been saved. If WhatsApp didn't open automatically, click below.</p>
                  <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ padding: '1rem 3rem' }}>Open WhatsApp</a>
                </motion.div>
              ) : (
                <motion.form onSubmit={handleFormSubmit} initial={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative' }}>
                  {isSubmitting && (
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(4px)', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--border-radius)' }}>
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}><Loader2 size={40} color="var(--color-primary)" /></motion.div>
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    <div><label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>First Name *</label><input name="firstName" type="text" className="form-control" required /></div>
                    <div><label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>Last Name *</label><input name="lastName" type="text" className="form-control" required /></div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    <div><label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>Phone / WhatsApp *</label><input name="phone" type="tel" className="form-control" required /></div>
                    <div><label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>Email Address</label><input name="email" type="email" className="form-control" /></div>
                  </div>

                  <hr style={{ border: 0, borderTop: '1px solid var(--color-border)', margin: '1rem 0' }} />

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>Event Type *</label>
                      <select name="eventType" className="form-control" required style={{ appearance: 'none' }}>
                        <option value="">Select an occasion...</option>
                        <option value="wedding">Luxury Wedding</option>
                        <option value="birthday">Elegant Birthday</option>
                        <option value="corporate">Corporate Gala</option>
                        <option value="engagement">Traditional Marriage</option>
                        <option value="kids">Children's Couture</option>
                        <option value="everyday">Everyday Indulgence</option>
                      </select>
                    </div>
                    <div><label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>Event Date *</label><input name="eventDate" type="date" className="form-control" required /></div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>Delivery Zone *</label>
                      <select name="deliveryZone" className="form-control" required style={{ appearance: 'none' }}>
                        <option value="">Select area...</option>
                        <option value="island">Island (Lekki, VI, Ikoyi)</option>
                        <option value="mainland">Mainland Hubs</option>
                        <option value="pickup">I will Pick Up</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>Guest Count *</label>
                      <select name="guestCount" className="form-control" required style={{ appearance: 'none' }}>
                        <option value="">Select servings...</option>
                        <option value="small">Intimate (10-25)</option>
                        <option value="medium">Standard (30-60)</option>
                        <option value="large">Large (70-150)</option>
                        <option value="huge">Massive (150+)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>Design Vision & Flavors</label>
                    <textarea name="vision" className="form-control" rows="5" placeholder="Go wild! Tell us your theme, colors, and the flavor you want to taste..."></textarea>
                  </div>

                  <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <motion.button disabled={isSubmitting} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} type="submit" className="btn btn-primary" style={{ width: '100%', maxWidth: '400px', padding: '1.2rem', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 800, opacity: isSubmitting ? 0.7 : 1 }}>
                      {isSubmitting ? 'Baking your quote...' : 'Request Quote Now!'}
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* General Inquiry Section */}
      <section id="contact" className="py-section" style={{ background: 'var(--color-bg-alt)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', color: 'var(--color-text-main)', lineHeight: 1.1 }}>Have a <br/>General Question?</h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
                Not ready for a custom quote yet? No problem. Reach out to our team for general inquiries. We aim to respond within 24 hours.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                <a href="mailto:xtrafreshcakes@gmail.com,fataj001@gmail.com" className="glass" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem', textDecoration: 'none', color: 'var(--color-text-main)', borderRadius: 'var(--border-radius)' }}>
                  <Mail color="var(--color-primary)" />
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>Email Us</p>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>xtrafreshcakes@gmail.com</p>
                  </div>
                </a>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="glass" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem', textDecoration: 'none', color: 'var(--color-text-main)', borderRadius: 'var(--border-radius)' }}>
                  <MessageCircle color="#25D366" />
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>WhatsApp Us</p>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>+234 802 134 2856</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="glass" style={{ padding: '3rem', borderRadius: 'var(--border-radius)' }}>
              <AnimatePresence>
                {isInquirySuccess ? (
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '2rem' }}>
                     <CheckCircle size={50} color="var(--color-primary)" style={{ margin: '0 auto 1rem' }} />
                     <h3>Redirecting to WhatsApp...</h3>
                   </motion.div>
                ) : (
                  <form onSubmit={handleInquirySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <h3>Send a Quick Message</h3>
                    <div><input name="name" type="text" className="form-control" placeholder="Your Name" required /></div>
                    <div><textarea name="message" className="form-control" rows="4" placeholder="How can we help you today?" required></textarea></div>
                    <button type="submit" disabled={isInquirySubmitting} className="btn btn-primary" style={{ width: '100%', padding: '1rem', opacity: isInquirySubmitting ? 0.7 : 1 }}>
                      {isInquirySubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
