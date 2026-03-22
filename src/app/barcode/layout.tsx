import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Barcode Generator - Create Code128, EAN-13, UPC Barcodes Online',
  description: 'Generate barcodes online — Code 128, Code 39, EAN-13, EAN-8, and UPC-A. Download as PNG or SVG. Free, client-side barcode maker for products, labels, and inventory.',
  keywords: [
    'barcode generator',
    'code 128 generator',
    'ean-13 barcode',
    'upc barcode',
    'barcode maker',
    'online barcode generator',
    'free barcode tool',
    'code 39 generator',
    'product barcode',
    'label barcode'
  ],
  openGraph: {
    title: 'Barcode Generator - Create Barcodes Online',
    description: 'Generate Code 128, EAN-13, UPC-A and more barcodes. Download as PNG/SVG. Free & client-side.',
    url: 'https://openkit.tools/barcode',
    siteName: 'OpenKit.tools',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Barcode Generator - OpenKit.tools',
    description: 'Generate Code 128, EAN-13, UPC barcodes online. Free, no signup.',
  },
  alternates: {
    canonical: 'https://openkit.tools/barcode',
  },
};

export default function BarcodeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
