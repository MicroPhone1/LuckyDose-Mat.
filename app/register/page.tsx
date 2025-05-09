'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: เชื่อมต่อ Auth จริงภายหลัง
    alert(`สมัครสมาชิกสำเร็จ: ${name}`);
    router.push('/login');
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#FAF7F5] flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <h1 className="text-3xl font-bold text-center text-gray-800">สมัครสมาชิก</h1>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                ชื่อ - นามสกุล
              </label>
              <input
                id="name"
                type="text"
                className="mt-1 block w-full px-4 py-2 border text-black border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-red-400 focus:border-red-400"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
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
              สมัครสมาชิก
            </button>
          </form>

          <p className="text-sm text-center text-gray-500">
            มีบัญชีอยู่แล้ว?{' '}
            <a href="/login" className="text-red-500 font-medium hover:underline">
              เข้าสู่ระบบ
            </a>
          </p>
        </div>
      </main>
    </>
  );
}
