'use client';

import { useRouter } from 'next/navigation';

const packages = [
  {
    id: 'basic',
    title: 'ลักษณ์มีกฤษณะ',
    price: 199,
    icon: '🕉️',
    highlighted: true,
  },
  {
    id: 'money',
    title: 'ลักษณ์มีกฤษณะ: พร้อมไพ่เสริมการเงิน',
    price: 249,
    icon: '💵',
  },
  {
    id: 'career',
    title: 'ลักษณ์มีกฤษณะ: พร้อมไพ่เสริมการงาน',
    price: 249,
    icon: '💼',
  },
  {
    id: 'love',
    title: 'ลักษณ์มีกฤษณะ: พร้อมไพ่เสริมความรัก',
    price: 249,
    icon: '❤️',
  },
  {
    id: 'health',
    title: 'ลักษณ์มีกฤษณะ: พร้อมไพ่เสริมสุขภาพ',
    price: 249,
    icon: '💚',
  },
];


export default function PackageSelectPage() {
  const router = useRouter();

  const handleSelect = (pkgId: string) => {
    router.push(`/checkout/payment?package=${pkgId}`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FFF9F2] to-[#FFF2EC] px-4 pt-24 pb-16 font-sans">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-[#7A1D1D] mb-10 tracking-tight">
          เลือกด้านที่คุณต้องการเสริม
        </h1>

        <div className="space-y-6">
          {packages.map((pkg) => (
            <button
              key={pkg.id}
              onClick={() => handleSelect(pkg.id)}
              className={`
                w-full px-5 py-5 rounded-3xl border transition-all
                flex justify-between items-center shadow-md
                focus:outline-none focus:ring-2 focus:ring-offset-2
                ${
                  pkg.highlighted
                    ? 'bg-gradient-to-r from-[#B31313] to-[#DA2D2D] text-white border-transparent focus:ring-red-300'
                    : 'bg-[#FFF3B0] text-gray-900 border-yellow-300 focus:ring-yellow-400'
                }
                hover:scale-[1.02] hover:shadow-xl active:scale-100
              `}
              aria-label={`เลือกแพ็คเกจ ${pkg.title}`}
            >
              <div className="flex items-center gap-3 text-left">
                <span className="text-3xl">{pkg.icon}</span>
                <span className="text-base md:text-lg font-semibold leading-tight">
                  {pkg.title}
                </span>
              </div>
              <div className="text-right text-sm font-medium whitespace-nowrap">
                {pkg.price} บาท
              </div>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
