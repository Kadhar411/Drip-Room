import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Drip Room | Curated Archive & Vintage Jackets API',
  description: 'Production backend and headless API engine for Drip Room thrift fashion.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#0c0d0e', color: '#e8dfcf', fontFamily: 'system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
