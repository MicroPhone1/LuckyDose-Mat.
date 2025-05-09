import './globals.css';
import '@fontsource/prompt/400.css';
import '@fontsource/prompt/700.css';

import { Geist, Geist_Mono, Playfair_Display } from 'next/font/google';
import Navbar from './components/Navbar';
import type { Metadata } from 'next';

// ✅ Font variables (Google Fonts through next/font)
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

// ✅ Metadata for SEO
export const metadata: Metadata = {
  title: 'Lucky Home',
  description: 'โชคลาภอยู่ที่ปลายนิ้วคุณ',
};

// ✅ Main layout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          ${playfair.variable} 
          font-sans antialiased bg-theme text-theme min-h-screen
        `}
      >
        <Navbar />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
