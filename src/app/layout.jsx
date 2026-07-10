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
    images: [{ url: "/assets/hero_cake.png" }],
    type: "website",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ scrollBehavior: 'smooth' }}>
      <body>
        <nav style={{ position: 'fixed', top: 0, width: '100%', padding: '1.5rem 0', zIndex: 100, background: 'rgba(255, 245, 248, 0.9)', backdropFilter: 'blur(10px)', borderBottom: '4px solid var(--color-border)' }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
              XTRA FRESH<span style={{ color: 'var(--color-secondary)' }}>!</span>
            </div>
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
              <a href="#collections" style={{ fontWeight: 700, color: 'var(--color-text-main)' }}>Cakes</a>
              <a href="#founder" style={{ fontWeight: 700, color: 'var(--color-text-main)' }}>Our Story</a>
              <a href="#quote" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '1rem' }}>Order Now</a>
            </div>
          </div>
        </nav>
        {children}
        <footer style={{ background: 'var(--color-primary)', color: 'white', padding: '4rem 0', textAlign: 'center' }}>
          <div className="container">
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', color: '#FFF', marginBottom: '1rem' }}>XTRA FRESH CAKES</h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Every day should be a happy day! 🎂</p>
            <p style={{ opacity: 0.8 }}>© {new Date().getFullYear()} Xtra Fresh Cakes. Lagos, Nigeria.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
