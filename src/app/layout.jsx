import "./globals.css";

export const metadata = {
  title: "Xtra Fresh Cakes | Best Cakes in Lagos",
  description: "Lagos' most colorful and delicious cakes! We bake epic birthday cakes, dreamy wedding tiers, and everyday treats. Fast delivery in Lekki, VI, and Mainland.",
  keywords: ["cakes in Lagos", "birthday cake Lagos", "wedding cake Nigeria", "Xtra Fresh Cakes", "bakery in Lagos", "cake delivery Lagos", "Olaide Balikis Abdullateef"],
  openGraph: {
    title: "Xtra Fresh Cakes | Best Cakes in Lagos",
    description: "Lagos' most colorful and delicious cakes! We bake epic birthday cakes and dreamy wedding tiers.",
    url: "https://vendorliftng.github.io/XtraFresh-Cakes",
    siteName: "Xtra Fresh Cakes",
    images: [{ url: "https://vendorliftng.github.io/XtraFresh-Cakes/assets/hero_cake.png" }],
    type: "website",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ scrollBehavior: 'smooth' }}>
      <body>
        <nav style={{ position: 'fixed', top: 0, width: '100%', padding: 'clamp(0.8rem, 2vw, 1.5rem) 0', zIndex: 100, background: 'rgba(255, 245, 248, 0.9)', backdropFilter: 'blur(10px)', borderBottom: 'clamp(2px, 1vw, 4px) solid var(--color-border)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 clamp(0.5rem, 2vw, 2rem)', gap: '10px' }}>
          <div style={{ fontSize: 'clamp(1.5rem, 5vw, 2.6rem)', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', whiteSpace: 'nowrap' }}>XTRA FRESH<span style={{ color: 'var(--color-secondary)' }}>!</span></div>
          <div style={{ display: 'flex', gap: 'clamp(0.2rem, 1vw, 2rem)', alignItems: 'center' }}>
            <a href="#collections" style={{ fontWeight: 700, color: 'var(--color-text-main)', fontSize: 'clamp(0.6rem, 1.5vw, 1rem)' }}>Cakes</a>
            <a href="#promise" style={{ fontWeight: 700, color: 'var(--color-text-main)', fontSize: 'clamp(0.6rem, 1.5vw, 1rem)' }}>Our Promise</a>
            <a href="#quote" className="btn btn-primary" style={{ padding: 'clamp(0.2rem, 1vw, 0.6rem) clamp(0.5rem, 2vw, 1.5rem)', fontSize: 'clamp(0.6rem, 1.5vw, 1rem)' }}>Order Now</a>
          </div>
        </div>
      </nav>
        {children}
        <footer style={{ background: 'var(--color-primary)', color: 'white', padding: '4rem 0', textAlign: 'center' }}>
          <div className="container" itemScope itemType="https://schema.org/Bakery">
            <h2 itemProp="name" style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', color: '#FFF', marginBottom: '0.5rem' }}>XTRA FRESH CAKES</h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Every day should be a happy day.</p>
            
            <div style={{ marginBottom: '2.5rem', fontSize: '1.1rem', fontWeight: 600, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <p itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                <span itemProp="streetAddress">73 Clem Rd</span>, <span itemProp="addressLocality">Ifako-Ijaiye</span>, <span itemProp="addressRegion">Lagos</span>
              </p>
              <p itemProp="telephone">+234 802 134 2856</p>
            </div>

            <p style={{ opacity: 0.8 }}>© {new Date().getFullYear()} Xtra Fresh Cakes. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
