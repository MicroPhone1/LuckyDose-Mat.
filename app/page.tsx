'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const sections = [
    {
      title: 'ลักษณ์มีกฤชณะ',
      description: 'รักแท้และโชคลาภอันไม่มีที่สิ้นสุด',
      image: '/images/hero-full.png',
      slug: 'lakmigritchana',
    },
    {
      title: 'เทพแห่งความมั่งคั่ง',
      description: 'เสริมพลังแห่งโชคลาภ ความร่ำรวย',
      image: '/images/hero-wealth.png',
      slug: 'wealthgod',
    },
  ];

  return (
    <main className="bg-[#FAF7F5] font-sans min-h-screen">
      <div className="pt-24 px-4">
        <div className="space-y-24 max-w-7xl mx-auto">
          {sections.map((section, i) => (
            <motion.section
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative flex justify-center items-center"
            >
              <div className="relative w-full h-[600px] rounded-[50px] overflow-hidden shadow-2xl">
                <Image
                  src={section.image}
                  alt={section.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" />
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 space-y-6">
                  <h2 className="text-4xl md:text-5xl font-semibold text-black tracking-tight drop-shadow-sm font-display">
                    {section.title}
                  </h2>
                  <p className="text-lg md:text-xl text-gray-800 drop-shadow-sm max-w-2xl">
                    {section.description}
                  </p>

                  {/* ปุ่มลิงก์ไปยังหน้าคอนเฟิร์ม พร้อม slug */}
                  <Link
                    href={`/preview?theme=${section.slug}`}
                    className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-10 py-3 rounded-full text-lg font-medium shadow-md hover:scale-105 hover:brightness-110 transition duration-300"
                  >
                    สั่งซื้อ
                  </Link>
                </div>
              </div>
            </motion.section>
          ))}
        </div>
      </div>

      <footer className="bg-white shadow-inner mt-24 py-6">
        <div className="text-center text-sm text-gray-600">
          &copy; {new Date().getFullYear()} LUCKYHOME. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
