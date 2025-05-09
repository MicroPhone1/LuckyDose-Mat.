'use client';

import { useSearchParams, useRouter } from 'next/navigation';

export default function SelectPathPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const theme = searchParams.get('theme') || '';
  const fullName = searchParams.get('fullName') || '';
  const birthDate = searchParams.get('birthDate') || '';
  const phone = searchParams.get('phone') || '';
  const address = searchParams.get('address') || '';
  const gender = searchParams.get('gender') || '';

  const handleChoose = (path: 'ai' | 'manual') => {
    const params = new URLSearchParams({
      theme,
      fullName,
      birthDate,
      phone,
      address,
      gender,
    });

    const nextUrl =
      path === 'ai'
        ? `/checkout/ai?${params.toString()}`
        : `/checkout/package`;

    router.push(nextUrl);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FDF7F0] to-[#FFE8E4] flex items-center justify-center px-4 py-16 font-sans">
      <div className="bg-white rounded-3xl shadow-xl max-w-xl w-full p-10 border border-rose-200 space-y-8 text-center">
        <h1 className="text-2xl font-bold text-[#8B2B2B]">คุณต้องการทำอะไรต่อ?</h1>

        <div className="text-sm text-gray-600 leading-relaxed bg-rose-50 p-4 rounded-xl border border-rose-100">
          <div><strong>{fullName}</strong></div>
          <div>วันเกิด: {birthDate}</div>
          <div>เบอร์: {phone}</div>
          <div>บ้านเลขที่: {address}</div>
          <div>เพศ: {gender}</div>
          <div className="mt-2">ธีมที่เลือก: <strong>{theme}</strong></div>
        </div>

        <div className="space-y-4 mt-4">
          <button
            onClick={() => handleChoose('ai')}
            className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-4 rounded-xl text-lg font-semibold shadow-md hover:brightness-110 hover:scale-[1.02] transition-all"
          >
            🔮 ให้ AI วิเคราะห์ดวง แล้วเลือกวอลเปเปอร์ให้ฉัน <br />
            <span className="text-sm font-normal">(แนะนำสำหรับคนที่ไม่รู้ดวงของตัวเอง)</span><br />
            <span className="text-sm font-medium mt-1 block">ราคา 99 บาท</span>
          </button>

          <button
            onClick={() => handleChoose('manual')}
            className="w-full bg-white border-2 border-pink-300 text-pink-700 py-4 rounded-xl text-lg font-semibold hover:bg-pink-50 shadow-sm transition-all"
          >
            🌟 ฉันรู้ดวงของตัวเองแล้ว ขอเลือกวอลเปเปอร์เอง
          </button>
        </div>
      </div>
    </main>
  );
}
