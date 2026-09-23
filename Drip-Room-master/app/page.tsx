import React from 'react';

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '0.1em', marginBottom: '0.5rem', color: '#e8dfcf' }}>
        DRIP ROOM<span style={{ color: '#c89547' }}>.</span>
      </h1>
      <p style={{ maxWidth: '600px', color: '#888', fontSize: '1.1rem', marginBottom: '2rem' }}>
        Headless High-Performance E-Commerce Engine for 1-of-1 Curated Vintage & Archive Outerwear.
      </p>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <a
          href="/index.html"
          style={{
            padding: '0.85rem 1.75rem',
            background: '#c89547',
            color: '#0c0d0e',
            fontWeight: 700,
            textDecoration: 'none',
            borderRadius: '6px',
            transition: 'opacity 0.2s',
          }}
        >
          View Storefront
        </a>
        <a
          href="/api/products"
          style={{
            padding: '0.85rem 1.75rem',
            background: '#1a1c1e',
            color: '#e8dfcf',
            border: '1px solid #333',
            fontWeight: 600,
            textDecoration: 'none',
            borderRadius: '6px',
          }}
        >
          Test /api/products
        </a>
      </div>

      <div style={{ marginTop: '4rem', padding: '1.5rem', background: '#121416', borderRadius: '8px', border: '1px solid #222', maxWidth: '650px', textAlign: 'left', fontSize: '0.85rem', color: '#aaa', lineHeight: 1.6 }}>
        <strong style={{ color: '#e8dfcf' }}>System Status:</strong>
        <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem' }}>
          <li>Supabase Database & RLS: Configured</li>
          <li>Stripe Concurrency-Safe Checkout: Active</li>
          <li>1-of-1 Atomic Inventory Locking: Enabled (15-min TTL)</li>
          <li>Default Currency: GBP (configurable via STORE_CURRENCY)</li>
        </ul>
      </div>
    </main>
  );
}
