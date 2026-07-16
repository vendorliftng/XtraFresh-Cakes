"use client";

import { useState, useEffect } from 'react';
import { Loader2, Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-react';
import { fetchData, saveToSheet } from '../../../lib/database';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  
  const loadProducts = async () => {
    setLoading(true);
    const data = await fetchData('Products');
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageFile({
          data: reader.result,
          name: file.name,
          type: file.type
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      let imageUrl = '';
      
      // 1. Upload Image to Google Drive
      if (imageFile) {
        const url = process.env.NEXT_PUBLIC_SHEETS_WEBHOOK_URL;
        const uploadRes = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            action: "upload_image",
            fileData: imageFile.data,
            fileName: imageFile.name,
            mimeType: imageFile.type
          }),
          headers: { "Content-Type": "text/plain;charset=utf-8" }
        });
        const uploadData = await uploadRes.json();
        if (uploadData.success) {
          imageUrl = uploadData.url;
        } else {
          alert("Image upload failed: " + uploadData.error);
          setSubmitting(false);
          return;
        }
      }
      
      // 2. Save Product to Sheets
      const newId = "PROD_" + Date.now();
      const rowData = [newId, title, category, imageUrl, price, description];
      
      // Use the new standard action payload
      const sheetsUrl = process.env.NEXT_PUBLIC_SHEETS_WEBHOOK_URL;
      await fetch(sheetsUrl, {
        method: "POST",
        body: JSON.stringify({
          action: "create",
          sheet: "Products",
          row: rowData
        }),
        headers: { "Content-Type": "text/plain;charset=utf-8" }
      });
      
      // Reset & Reload
      setIsModalOpen(false);
      setTitle(''); setCategory(''); setPrice(''); setDescription(''); setImageFile(null);
      await loadProducts();
      
    } catch (err) {
      alert("An error occurred: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    
    try {
      const sheetsUrl = process.env.NEXT_PUBLIC_SHEETS_WEBHOOK_URL;
      await fetch(sheetsUrl, {
        method: "POST",
        body: JSON.stringify({
          action: "delete",
          sheet: "Products",
          id: id
        }),
        headers: { "Content-Type": "text/plain;charset=utf-8" }
      });
      await loadProducts();
    } catch (err) {
      alert("Delete failed: " + err.message);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--color-text-main)' }}>Manage Products</h1>
        <button onClick={() => setIsModalOpen(true)} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={20} /> Add Product
        </button>
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
                <th style={{ padding: '1rem', borderBottom: '2px solid #eee' }}>Image</th>
                <th style={{ padding: '1rem', borderBottom: '2px solid #eee' }}>Title</th>
                <th style={{ padding: '1rem', borderBottom: '2px solid #eee' }}>Category</th>
                <th style={{ padding: '1rem', borderBottom: '2px solid #eee' }}>Price</th>
                <th style={{ padding: '1rem', borderBottom: '2px solid #eee' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                    No products found in the sheet.
                  </td>
                </tr>
              )}
              {products.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '1rem' }}>
                    {p.img ? <img src={p.img} alt={p.title} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }} /> : <ImageIcon color="#ccc" />}
                  </td>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>{p.title}</td>
                  <td style={{ padding: '1rem' }}>{p.category}</td>
                  <td style={{ padding: '1rem' }}>₦{p.price}</td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => handleDelete(p.id)} style={{ background: '#ffebee', color: '#d32f2f', border: 'none', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Product Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', width: '90%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Add New Product</h2>
            <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Product Title</label>
                <input required className="form-control" value={title} onChange={e => setTitle(e.target.value)} />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Category</label>
                  <select required className="form-control" value={category} onChange={e => setCategory(e.target.value)}>
                    <option value="">Select...</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Pastries">Pastries</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Price (₦)</label>
                  <input type="number" required className="form-control" value={price} onChange={e => setPrice(e.target.value)} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Product Image</label>
                <input type="file" accept="image/*" required onChange={handleImageChange} style={{ padding: '0.5rem 0' }} />
                {imageFile && <p style={{ fontSize: '0.85rem', color: 'green' }}>✓ Image ready</p>}
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Description</label>
                <textarea rows={3} required className="form-control" value={description} onChange={e => setDescription(e.target.value)} />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary" style={{ flex: 1 }}>Cancel</button>
                <button type="submit" disabled={submitting} className="btn btn-primary" style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                  {submitting ? <Loader2 className="animate-spin" /> : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
