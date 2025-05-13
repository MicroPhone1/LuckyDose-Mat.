'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !(menuRef.current as HTMLElement).contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    { label: 'หน้าหลัก', href: '/' },
    { label: 'คูปองของฉัน', href: '/coupons' },
    { label: 'ประวัติการสั่งซื้อ', href: '/orders' },
    { label: 'ติดต่อแอดมิน', href: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-lg shadow-md transition-all border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-3 grid grid-cols-3 items-center font-playfair">
        {/* ซ้าย: เว้นว่างไว้หรือใส่คอมโพเนนต์อื่น */}
        <div></div>

        {/* กลาง: โลโก้ */}
        <div className="flex justify-center">
          <Link href="/">
            <p className="text-2xl font-bold text-rose-600 tracking-wide hover:text-rose-700 transition cursor-pointer">
              Lucky Home
            </p>
          </Link>
        </div>

        {/* ขวา: เมนู */}
        <div className="flex justify-end items-center space-x-4" ref={menuRef}>
          <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-rose-600 transition">
            เข้าสู่ระบบ
          </Link>
          <button
            className="text-xl text-gray-800 hover:text-rose-600 transition duration-200"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute top-16 right-6 w-56 bg-white rounded-xl shadow-xl p-5 space-y-3 text-sm z-50 font-sans border border-gray-100"
            >
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={`block transition-colors duration-200 rounded-md px-3 py-2 font-medium ${
                    pathname === item.href
                      ? 'text-rose-600 bg-rose-50'
                      : 'text-gray-700 hover:text-rose-600 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
