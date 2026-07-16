"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Package, ShoppingCart, LogOut } from 'lucide-react';
import { logoutAction } from './actions';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  // Don't show sidebar on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await logoutAction();
    router.push('/admin/login');
  };

  const navItems = [
    { label: 'Products', href: '/admin/products', icon: <Package size={20} /> },
    { label: 'Orders', href: '/admin/orders', icon: <ShoppingCart size={20} /> },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-bg)' }}>
      {/* Sidebar */}
      <aside style={{ width: '250px', background: 'white', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', boxShadow: '2px 0 10px rgba(0,0,0,0.05)', zIndex: 10 }}>
        <div style={{ marginBottom: '3rem', padding: '0 1rem' }}>
          <h2 style={{ color: 'var(--color-primary)', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <LayoutDashboard /> Admin
          </h2>
        </div>

        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link 
                key={item.href} 
                href={item.href}
                style={{ 
                  display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', 
                  borderRadius: '8px', textDecoration: 'none', fontWeight: 600,
                  background: isActive ? 'var(--color-secondary)' : 'transparent',
                  color: isActive ? 'white' : 'var(--color-text-main)',
                  transition: 'all 0.2s'
                }}
              >
                {item.icon} {item.label}
              </Link>
            );
          })}
        </nav>

        <button 
          onClick={handleLogout}
          style={{ 
            display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', 
            borderRadius: '8px', border: 'none', background: '#ffebee', color: '#d32f2f', 
            fontWeight: 600, cursor: 'pointer', marginTop: 'auto' 
          }}
        >
          <LogOut size={20} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  );
}
