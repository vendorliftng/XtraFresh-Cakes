"use client";

import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { fetchData } from '../../../lib/database';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const loadOrders = async () => {
    setLoading(true);
    const data = await fetchData('Orders');
    setOrders(data.reverse()); // Show newest first
    setLoading(false);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--color-text-main)' }}>Recent Orders</h1>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
          <Loader2 className="animate-spin" size={40} color="var(--color-primary)" />
        </div>
      ) : (
        <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ background: 'var(--color-bg)' }}>
              <tr>
                <th style={{ padding: '1rem', borderBottom: '2px solid #eee' }}>Date</th>
                <th style={{ padding: '1rem', borderBottom: '2px solid #eee' }}>Customer</th>
                <th style={{ padding: '1rem', borderBottom: '2px solid #eee' }}>Phone</th>
                <th style={{ padding: '1rem', borderBottom: '2px solid #eee' }}>Items</th>
                <th style={{ padding: '1rem', borderBottom: '2px solid #eee' }}>Total (₦)</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                    No orders found.
                  </td>
                </tr>
              )}
              {orders.map((o, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '1rem', color: 'var(--color-text-muted)' }}>{o.date}</td>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>{o.customerName}</td>
                  <td style={{ padding: '1rem' }}><a href={`tel:${o.phone}`} style={{ color: 'var(--color-primary)' }}>{o.phone}</a></td>
                  <td style={{ padding: '1rem' }}>{o.items}</td>
                  <td style={{ padding: '1rem', fontWeight: 800 }}>{o.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
