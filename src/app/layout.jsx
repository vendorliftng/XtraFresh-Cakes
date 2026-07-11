import "./globals.css";
import { CartProvider } from "./CartContext";
import Navbar from "./components/Navbar";

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
  },
};


export default function RootLayout({ children }) {
  return (
    <CartProvider>
      <html lang="en" style={{ scrollBehavior: "smooth" }}>
        <body>
          <Navbar />
          {children}
          <footer style={{ background: 'var(--color-text-main)', color: 'white', padding: '3rem 0', textAlign: 'center' }}>
          <div className="container">
            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: 'var(--color-primary)', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>XTRA FRESH!</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>Baking happiness into every single day.</p>
              <div style={{ marginBottom: "2.5rem", fontSize: "1.1rem", fontWeight: 600, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
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
    </CartProvider>
  );
}
