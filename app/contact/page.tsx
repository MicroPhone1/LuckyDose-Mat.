'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function ContactPage() {
  return (
    <main className="bg-[#FAF7F5] min-h-screen pt-24 px-4 font-sans">
      <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-xl p-10 flex flex-col items-center text-center space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl md:text-4xl font-semibold text-black font-display"
        >
          ติดต่อแอดมิน
        </motion.h1>

        <p className="text-gray-700 text-base">
          สแกน QR Code หรือลิงก์ด้านล่างเพื่อแชทกับแอดมินผ่าน LINE
        </p>

        {/* ✅ QR Code */}
        <div className="w-48 h-48 relative">
          <Image
            src="/images/line-qr.png" // 👈 คุณต้องมีไฟล์ QR ใน public/images/
            alt="Line QR Code"
            fill
            className="object-contain"
          />
        </div>

        {/* ✅ ปุ่มเพิ่มเพื่อน */}
        <a
          href="https://lin.ee/Z2xBhdg"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-medium text-sm transition duration-300"
        >
          แชทกับแอดมินบน LINE
        </a>
      </div>
    </main>
  );
}
