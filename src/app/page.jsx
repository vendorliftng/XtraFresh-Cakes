"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Loader2, CheckCircle, Mail, MessageCircle, Heart, Star, Sparkles } from 'lucide-react';

export default function Home() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

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
      
      const whatsappMsg = `Hello Xtra Fresh Cakes. I would like to commission a cake.\n\nName: ${data.firstName} ${data.lastName}\nEvent: ${data.eventType} on ${data.eventDate}\nZone: ${data.deliveryZone}\nGuests: ${data.guestCount}\nDetails: ${data.vision}`;
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
      
      const whatsappMsg = `Hello Xtra Fresh Cakes. I have a general inquiry.\n\nFrom: ${data.name}\n\nMessage:\n${data.message}`;
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
      {/* Hero Section */}
      <section style={{ minHeight: '100vh', paddingTop: '120px', paddingBottom: '4rem', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
        
        {/* Colorful Blobs Background */}
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }} className="blob-shape" style={{ position: 'absolute', top: '-10%', left: '-10%', width: '500px', height: '500px', background: 'var(--color-secondary)', opacity: 0.3, zIndex: -1 }} />
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} className="blob-shape" style={{ position: 'absolute', bottom: '-20%', right: '-5%', width: '600px', height: '600px', background: 'var(--color-primary)', opacity: 0.2, zIndex: -1 }} />
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="blob-shape" style={{ position: 'absolute', top: '20%', right: '15%', width: '300px', height: '300px', background: 'var(--color-accent)', opacity: 0.3, zIndex: -1 }} />

        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'center' }}>
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, type: 'spring' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'white', border: '3px solid var(--color-border)', padding: '0.5rem 1.2rem', borderRadius: '50px', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '1.5rem' }}>
                THE PREMIER LAGOS CAKE STUDIO
              </div>
              <h1 style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)', lineHeight: 1.1, color: 'var(--color-text-main)', marginBottom: '1.5rem' }}>
                Baking <span style={{ color: 'var(--color-primary)', display: 'inline-block', position: 'relative' }}>Masterpieces<svg style={{ position: 'absolute', bottom: '-10px', left: 0, width: '100%', height: '20px' }} viewBox="0 0 100 20"><path d="M0 10 Q 50 20 100 10" stroke="var(--color-secondary)" strokeWidth="6" fill="transparent"/></svg></span><br/>For Your Greatest Moments.
              </h1>
              <p style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)', marginBottom: '2.5rem', fontWeight: 600, maxWidth: '520px', lineHeight: 1.6 }}>
                Welcome to Xtra Fresh Cakes. We don't just bake; we craft spectacular, conversation-starting centerpieces that taste even better than they look. Whether it is an intimate celebration or a massive luxury wedding, we deliver perfection every single time.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a href="#collections" className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '1.2rem 2.5rem' }}>View the Collections</a>
                <a href="#quote" className="btn btn-secondary" style={{ fontSize: '1.2rem', padding: '1.2rem 2.5rem' }}>Commission a Cake</a>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.8, type: 'spring' }}
              style={{ position: 'relative', height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              {/* Hero Image Wrapper */}
              <motion.div animate={{ y: [-15, 15] }} transition={bounceAnimation} style={{ position: 'relative', zIndex: 10 }}>
                 <img src={`${basePath}/assets/hero_cake.png`} alt="Delicious Masterpiece Cake" style={{ width: '100%', maxWidth: '450px', borderRadius: '40px', border: '10px solid white', boxShadow: '0 20px 50px rgba(255, 51, 102, 0.2)', transform: 'rotate(3deg)' }} />
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
                MEET THE VISIONARY
              </div>
              <h2 style={{ fontSize: '3.5rem', color: 'white', marginBottom: '1.5rem' }}>Olaide Balikis Abdullateef</h2>
              
              <div style={{ fontSize: '1.15rem', fontWeight: 600, lineHeight: 1.8 }}>
                <p style={{ marginBottom: '1.5rem' }}>
                  The story of Xtra Fresh Cakes does not begin in a massive commercial kitchen. It begins in 1993, driven by a pure, undeniable passion for the craft of baking.
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  Olaide spent years mastering the intricate art of confectionery, starting out by baking strictly for her closest family and friends. Word quickly spread about the extraordinary taste and meticulous design of her cakes, transforming a personal passion into a highly sought-after brand.
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                  Today, Olaide is at the helm of a premier bakery that not only delivers Lagos' most luxurious custom cakes, but also produces bread at scale for bulk buyers across the city. Her relentless commitment to quality has earned Xtra Fresh Cakes a reputation that speaks for itself.
                </p>
                <p style={{ marginBottom: '2rem' }}>
                  Despite the massive growth, Olaide's philosophy remains intimately personal: <span style={{ color: 'var(--color-secondary)', fontWeight: 800 }}>"Every day should be a happy day."</span> She believes that you do not need a grand occasion to treat yourself to exceptional quality. Every slice leaving her kitchen is a testament to decades of passion, crafted to make your day just a little bit brighter.
                </p>
              </div>
            </div>
            <div style={{ order: 1 }}>
              <img src={`${basePath}/assets/hero_cake.png`} alt="Founder Olaide Balikis Abdullateef" loading="lazy" style={{ width: '100%', borderRadius: '40px', border: '8px solid white', transform: 'rotate(-3deg)' }} />
            </div>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: '-50px', left: 0, right: 0, height: '100px', background: 'white', borderRadius: '50% 50% 0 0' }}></div>
      </section>

      {/* Colorful Collections Section */}
      <section id="collections" className="py-section" style={{ background: 'white' }}>
        <div className="container">
          <div className="text-center" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '4rem', color: 'var(--color-primary)' }}>Signature Collections</h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Crafted for those who demand excellence in taste and design.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
            {[
              { id: 'birthday', title: 'Epic Birthdays', desc: 'Unforgettable, towering centerpieces designed specifically to make your day extraordinary.', color: 'var(--color-primary)', img: `${basePath}/assets/category_birthday.png` },
              { id: 'wedding', title: 'Dreamy Weddings', desc: 'Elegant, multi-tiered masterpieces that embody pure romance and luxury.', color: 'var(--color-accent)', img: `${basePath}/assets/category_wedding.png` },
              { id: 'everyday', title: 'Just Because', desc: 'Because you never need an excuse to indulge in the finest cakes in Lagos.', color: 'var(--color-secondary)', img: `${basePath}/assets/category_anniversary.png` }
            ].map((cat, i) => (
              <div key={cat.id} className="fun-card" style={{ padding: '2rem', textAlign: 'center' }}>
                <motion.div whileHover={{ scale: 1.05, rotate: 5 }} style={{ width: '200px', height: '200px', margin: '0 auto 1.5rem', borderRadius: '50%', border: `6px solid ${cat.color}`, overflow: 'hidden' }}>
                  <img src={cat.img} alt={cat.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </motion.div>
                <h3 style={{ fontSize: '2.2rem', color: cat.color }}>{cat.title}</h3>
                <p style={{ color: 'var(--color-text-muted)', fontWeight: 600, marginBottom: '1.5rem' }}>{cat.desc}</p>
                <a href="#quote" className="btn" style={{ background: cat.color, color: 'white', width: '100%' }}>Commission This</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-section" style={{ background: 'var(--color-bg-alt)' }}>
        <div className="container">
           <div className="text-center" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '3.5rem', color: 'var(--color-text-main)' }}>Our Masterpieces</h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>A closer look at the exceptional quality we deliver every day.</p>
          </div>
          <div style={{ columnCount: 3, columnGap: '1.5rem' }}>
            {[
              `${basePath}/assets/hero_cake.png`, `${basePath}/assets/category_wedding.png`, `${basePath}/assets/category_birthday.png`, 
              `${basePath}/assets/category_anniversary.png`, `${basePath}/assets/hero_cake.png`, `${basePath}/assets/category_wedding.png`
            ].map((src, i) => (
              <motion.div key={i} whileHover={{ scale: 1.02, rotate: i % 2 === 0 ? 2 : -2 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ breakInside: 'avoid', marginBottom: '1.5rem', borderRadius: 'var(--border-radius)', overflow: 'hidden', border: '4px solid var(--color-border)', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}>
                <img src={src} alt="Cake Masterpiece" loading="lazy" style={{ width: '100%', display: 'block', borderRadius: 'calc(var(--border-radius) - 4px)' }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section id="quote" className="py-section" style={{ background: 'var(--color-bg)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '4rem', color: 'var(--color-text-main)' }}>Let's Create Magic</h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', fontWeight: 600, maxWidth: '600px', margin: '0 auto' }}>Submit your details below and we will connect with you immediately via WhatsApp to finalize your order.</p>
          </div>

          <div className="fun-card" style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem', position: 'relative' }}>
            <AnimatePresence>
              {isSuccess ? (
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                  <motion.div animate={{ rotate: [0, -10, 10, -10, 10, 0] }} transition={{ duration: 1 }} style={{ color: 'var(--color-secondary)', marginBottom: '1.5rem', display: 'inline-block' }}>
                    <CheckCircle size={100} fill="var(--color-primary)" color="white" />
                  </motion.div>
                  <h3 style={{ fontSize: '3rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>Details Received</h3>
                  <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', fontWeight: 600, marginBottom: '2rem' }}>Redirecting you to WhatsApp to connect with our team...</p>
                  <button onClick={() => setIsSuccess(false)} className="btn btn-secondary">Commission Another Cake</button>
                </motion.div>
              ) : (
                <motion.form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {isSubmitting && (
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.8)', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '16px' }}>
                      <Loader2 size={60} color="var(--color-primary)" className="animate-spin" />
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    <div><label style={{ fontWeight: 700, marginBottom: '0.5rem', display: 'block' }}>First Name</label><input name="firstName" className="form-control" required /></div>
                    <div><label style={{ fontWeight: 700, marginBottom: '0.5rem', display: 'block' }}>Last Name</label><input name="lastName" className="form-control" required /></div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    <div><label style={{ fontWeight: 700, marginBottom: '0.5rem', display: 'block' }}>WhatsApp Number</label><input name="phone" type="tel" className="form-control" required /></div>
                    <div><label style={{ fontWeight: 700, marginBottom: '0.5rem', display: 'block' }}>Email Address</label><input name="email" type="email" className="form-control" /></div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
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

                  <button type="submit" className="btn btn-primary" style={{ width: '100%', fontSize: '1.3rem', padding: '1.5rem' }}>CONNECT VIA WHATSAPP</button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* General Inquiry Section */}
      <section id="contact" className="py-section" style={{ background: 'white' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '3rem', color: 'var(--color-primary)' }}>General Inquiries</h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Not quite ready to order? Reach out with any general questions and our team will be happy to assist.</p>
          </div>

          <div className="fun-card" style={{ padding: '2.5rem', position: 'relative' }}>
             <AnimatePresence>
              {isInquirySuccess ? (
                 <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5 }} style={{ color: 'var(--color-secondary)', marginBottom: '1rem', display: 'inline-block' }}>
                    <CheckCircle size={80} fill="var(--color-primary)" color="white" />
                  </motion.div>
                  <h3 style={{ fontSize: '2rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>Redirecting...</h3>
                  <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', fontWeight: 600, marginBottom: '2rem' }}>Opening WhatsApp to send your inquiry.</p>
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
                  
                  <button type="submit" className="btn btn-secondary" style={{ width: '100%', fontSize: '1.2rem', padding: '1.2rem' }}>SEND TO WHATSAPP</button>
                </motion.form>
              )}
             </AnimatePresence>
             
             <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '2px dashed var(--color-border)', textAlign: 'center' }}>
               <p style={{ fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '1rem' }}>Or contact us directly:</p>
               <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
                 <a href="mailto:xtrafreshcakes@gmail.com" className="btn" style={{ background: 'var(--color-bg)', border: '2px solid var(--color-border)', color: 'var(--color-text-main)', padding: '0.8rem 1.5rem', borderRadius: '20px' }}>
                   xtrafreshcakes@gmail.com
                 </a>
                 <a href="mailto:fataj001@gmail.com" className="btn" style={{ background: 'var(--color-bg)', border: '2px solid var(--color-border)', color: 'var(--color-text-main)', padding: '0.8rem 1.5rem', borderRadius: '20px' }}>
                   fataj001@gmail.com
                 </a>
               </div>
             </div>
          </div>
        </div>
      </section>
    </main>
  );
}
