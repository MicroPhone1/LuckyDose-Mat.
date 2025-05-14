'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const packageData = {
  basic: {
    title: 'ลักษณ์มีกฤษณะ',
    description: 'พลังงานพื้นฐานเสริมดวงชะตา เหมาะสำหรับผู้เริ่มต้น',
    price: 199,
    icon: '🕉️',
    image: '/images/wallpapers/basic.png',
  },
  money: {
    title: 'ลักษณ์มีกฤษณะ: พร้อมไพ่เสริมการเงิน',
    description: 'เสริมโชคลาภด้านการเงินให้มั่นคงและมีโอกาสทางรายได้',
    price: 249,
    icon: '💵',
    image: '/images/wallpapers/money.png',
  },
  career: {
    title: 'ลักษณ์มีกฤษณะ: พร้อมไพ่เสริมการงาน',
    description: 'เสริมพลังความสำเร็จและโอกาสในสายอาชีพ',
    price: 249,
    icon: '💼',
    image: '/images/wallpapers/career.png',
  },
  love: {
    title: 'ลักษณ์มีกฤษณะ: พร้อมไพ่เสริมความรัก',
    description: 'เสริมความรัก ความสัมพันธ์ และเสน่ห์',
    price: 249,
    icon: '❤️',
    image: '/images/wallpapers/love.png',
  },
  health: {
    title: 'ลักษณ์มีกฤษณะ: พร้อมไพ่เสริมสุขภาพ',
    description: 'เสริมสุขภาพ ความแข็งแรง และพลังชีวิต',
    price: 249,
    icon: '💚',
    image: '/images/wallpapers/health.png',
  },
};

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const packageId = searchParams.get('package') || '';
  const aiOption = searchParams.get('ai') === 'true';
  const fullName = searchParams.get('fullName') || '';
  const theme = searchParams.get('theme') || '';

  const selectedPackage = packageData[packageId as keyof typeof packageData];

  const aiFortuneFee = aiOption ? 99 : 0;
  const totalPrice = selectedPackage ? selectedPackage.price + aiFortuneFee : 0;

  useEffect(() => {
    if (!selectedPackage) {
      router.push('/');
    }
  }, [selectedPackage, router]);

  if (!selectedPackage) return null;

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FFF9F2] to-[#FFF2EC] px-4 pt-24 pb-16 font-sans">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-[#7A1D1D] mb-10">
          ยืนยันการชำระเงิน
        </h1>

        <div className="bg-white p-6 rounded-3xl shadow-xl space-y-6 text-center">
          {/* รูป Wallpaper */}
          {selectedPackage.image && (
            <img
              src={selectedPackage.image}
              alt={`Wallpaper ของ ${selectedPackage.title}`}
              className="w-full rounded-2xl shadow-md object-cover max-h-72 mx-auto"
            />
          )}

          {/* ข้อมูลแพ็กเกจ */}
          <div className="text-5xl">{selectedPackage.icon}</div>
          <h2 className="text-xl font-bold">{selectedPackage.title}</h2>
          <p className="text-gray-600">{selectedPackage.description}</p>

          {/* สรุปรายการค่าใช้จ่าย */}
          <div className="text-left text-sm bg-[#FFF7E6] p-4 rounded-xl shadow-inner space-y-2">
            <div className="flex justify-between font-medium">
              <span>ค่าธีมวอลเปเปอร์</span>
              <span>{selectedPackage.price.toLocaleString()} บาท</span>
            </div>

            {aiOption && (
              <div className="flex justify-between text-[#7A1D1D] font-medium">
                <span>ค่าทำนายดวงด้วย AI</span>
                <span>+{aiFortuneFee.toLocaleString()} บาท</span>
              </div>
            )}

            <hr className="my-2 border-t border-dashed" />
            <div className="flex justify-between font-bold text-lg text-[#B31313]">
              <span>ยอดรวมทั้งหมด</span>
              <span>{totalPrice.toLocaleString()} บาท</span>
            </div>
          </div>

          {/* ถ้ามีชื่อหรือธีม แสดงเพื่อความน่าเชื่อถือ */}
          {(fullName || theme) && (
            <div className="text-xs text-gray-500 text-center mt-4">
              สำหรับ: <strong>{fullName || 'ไม่ระบุชื่อ'}</strong>{' '}
              {theme && <>| ธีมที่เลือก: <strong>{theme}</strong></>}
            </div>
          )}
        </div>

        {/* ปุ่มยืนยัน */}
        <button
          onClick={() => router.push('/checkout/thankyou')}
          className="mt-10 w-full py-3 text-white text-lg font-semibold bg-gradient-to-r from-[#B31313] to-[#DA2D2D] rounded-full hover:scale-105 transition"
        >
          ดำเนินการชำระเงิน
        </button>
      </div>
    </main>
  );
}
