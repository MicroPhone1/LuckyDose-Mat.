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
      ai: path === 'ai' ? 'true' : 'false',
    });

    const nextUrl =
      path === 'ai'
        ? `/checkout/ai?${params.toString()}`
        : `/checkout/package?${params.toString()}`;

    router.push(nextUrl);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FDF7F0] to-[#FFE8E4] flex items-center justify-center px-4 py-16 font-sans">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full p-10 border border-rose-200 space-y-10 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-[#8B2B2B]">
          คุณต้องการทำอะไรต่อ?
        </h1>

        {/* ข้อมูลผู้ใช้ */}
        <div className="text-sm text-gray-700 leading-relaxed bg-rose-50 p-5 rounded-2xl border border-rose-100 text-left space-y-1">
          <div><span className="font-semibold">ชื่อ:</span> {fullName}</div>
          <div><span className="font-semibold">วันเกิด:</span> {birthDate}</div>
          <div><span className="font-semibold">เบอร์:</span> {phone}</div>
          <div><span className="font-semibold">ที่อยู่:</span> {address}</div>
          <div><span className="font-semibold">เพศ:</span> {gender}</div>
          <div><span className="font-semibold">ธีมที่เลือก:</span> {theme}</div>
        </div>

        {/* ปุ่มเลือก */}
        <div className="space-y-6">
          <button
            onClick={() => handleChoose('ai')}
            className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-5 px-4 rounded-2xl text-lg font-semibold shadow-lg hover:brightness-110 hover:scale-[1.02] transition-all"
          >
            🔮 ให้ AI วิเคราะห์ดวง แล้วเลือกวอลเปเปอร์ให้ฉัน
            <div className="text-sm font-normal mt-1">
              (แนะนำสำหรับคนที่ไม่รู้ดวงของตัวเอง)
            </div>
            <div className="text-sm font-medium mt-1 text-yellow-100">
              ราคา 99 บาท (รวมค่าทำนายดวง)
            </div>
          </button>

          <button
            onClick={() => handleChoose('manual')}
            className="w-full bg-white border-2 border-pink-300 text-pink-700 py-5 px-4 rounded-2xl text-lg font-semibold hover:bg-pink-50 shadow-md transition-all"
          >
            🌟 ฉันรู้ดวงของตัวเองแล้ว ขอเลือกวอลเปเปอร์เอง
            <div className="text-sm font-normal mt-1">
              (ไม่มีค่าใช้จ่ายในการทำนาย AI)
            </div>
          </button>
        </div>
      </div>
    </main>
  );
}
