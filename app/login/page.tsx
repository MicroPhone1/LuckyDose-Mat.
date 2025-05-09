'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar'; // ✅ เพิ่ม Navbar

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: เพิ่ม logic login จริง
    alert(`Login: ${email}`);
  };

  return (
    <>
      <Navbar /> {/* ✅ ใส่ Navbar ด้านบน */}
      <main className="min-h-screen bg-[#FAF7F5] pt-24 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <h1 className="text-3xl font-bold text-center text-gray-800">เข้าสู่ระบบ</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-black">
                อีเมล
              </label>
              <input
                id="email"
                type="email"
                className="mt-1 block w-full px-4 py-2 border text-black border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-red-400 focus:border-red-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-black">
                รหัสผ่าน
              </label>
              <input
                id="password"
                type="password"
                className="mt-1 block w-full px-4 py-2 border text-black border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-red-400 focus:border-red-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 rounded-full font-semibold hover:brightness-110 transition"
            >
              เข้าสู่ระบบ
            </button>
          </form>

          <p className="text-sm text-center text-gray-500">
            ยังไม่มีบัญชี?{' '}
            <a href="/register" className="text-red-500 font-medium hover:underline">
              สมัครสมาชิก
            </a>
          </p>
        </div>
      </main>
    </>
  );
}
