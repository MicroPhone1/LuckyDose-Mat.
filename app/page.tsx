'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const langRef = useRef(null);
  const menuRef = useRef(null);

  const sections = [
    {
      title: 'ลักษณ์มีกฤชณะ',
      description: 'รักแท้และโชคลาภอันไม่มีที่สิ้นสุด',
      image: '/images/hero-full.png',
    },
    {
      title: 'เทพแห่งความมั่งคั่ง',
      description: 'เสริมพลังแห่งโชคลาภ ความร่ำรวย',
      image: '/images/hero-wealth.png',
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !(langRef.current as HTMLElement).contains(event.target as Node)) {
        setLanguageOpen(false);
      }
      if (menuRef.current && !(menuRef.current as HTMLElement).contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <main className="bg-[#FAF7F5] font-sans min-h-screen">
      {/* ✅ Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-md shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-3 items-center font-playfair">
          
          {/* ซ้าย: ภาษา (Dropdown) */}
          <div className="relative" ref={langRef}>
  <button
    onClick={() => setLanguageOpen(!languageOpen)}
    className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-red-500 transition-colors duration-200 px-3 py-1.5 rounded-md hover:bg-gray-100"
  >
    🇹🇭 ไทย
    <svg className="w-3 h-3 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </button>

  {languageOpen && (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.2 }}
      className="absolute left-0 mt-2 w-36 bg-white shadow-lg ring-1 ring-black/10 rounded-xl z-50"
    >
      <ul className="py-2 text-sm text-gray-700">
        <li>
          <a
            href="/th"
            onClick={() => setLanguageOpen(false)}
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 hover:text-red-500 transition rounded-md"
          >
            🇹🇭 ไทย
          </a>
        </li>
        <li>
          <a
            href="/en"
            onClick={() => setLanguageOpen(false)}
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 hover:text-red-500 transition rounded-md"
          >
            🇬🇧 English
          </a>
        </li>
      </ul>
    </motion.div>
  )}
</div>


          {/* กลาง: โลโก้ (ข้อความหรือเปลี่ยนเป็นรูป Image ก็ได้) */}
          <div className="flex justify-center">
            <p className="text-xl font-semibold text-black tracking-wide">Lucky Home</p>
          </div>

          {/* ขวา: เข้าสู่ระบบ + เมนู */}
          <div className="flex justify-end items-center space-x-4" ref={menuRef}>
            <a href="#" className="text-sm text-gray-700 hover:text-red-500 transition">เข้าสู่ระบบ</a>
            <button
              className="text-2xl text-gray-800 hover:text-red-500 transition duration-200"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              ☰
            </button>
          </div>

          {/* เมนู Dropdown */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-16 right-6 w-56 bg-white rounded-xl shadow-xl p-5 space-y-3 text-sm z-50 font-sans"
            >
              {['หน้าหลัก', 'ดูของของฉัน', 'ประวัติการสั่งซื้อ', 'ติดต่อแอดมิน'].map((item, index) => (
                <a
                  href="#"
                  key={index}
                  className="block text-gray-700 hover:text-red-500 transition-colors duration-200"
                >
                  {item}
                </a>
              ))}
            </motion.div>
          )}
        </div>
      </header>

      {/* ✅ Main Sections */}
      <div className="pt-24 px-4">
        <div className="space-y-24 max-w-7xl mx-auto">
          {sections.map((section, i) => (
            <motion.section
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`relative flex justify-center items-center ${i === 0 ? 'mb-8' : ''}`}
            >
              <div className="relative w-full h-[600px] rounded-[40px] overflow-hidden shadow-2xl">
                <Image
                  src={section.image}
                  alt={section.title}
                  layout="fill"
                  objectFit="cover"
                  className="absolute inset-0"
                />
                <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" />
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 space-y-6">
                  <h2 className="text-4xl md:text-5xl font-semibold text-black tracking-tight drop-shadow-sm">
                    {section.title}
                  </h2>
                  <p className="text-lg md:text-xl text-gray-800 drop-shadow-sm max-w-2xl">
                    {section.description}
                  </p>
                  <button className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-10 py-3 rounded-full text-lg font-medium shadow-md hover:scale-105 hover:brightness-110 transition duration-300">
                    สั่งซื้อ
                  </button>
                </div>
              </div>
            </motion.section>
          ))}
        </div>
      </div>

      {/* ✅ Footer */}
      <footer className="bg-white shadow-inner mt-24 py-6">
        <div className="text-center text-sm text-gray-600">
          &copy; {new Date().getFullYear()} LUCKYHOME. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
