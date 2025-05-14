'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader2, AlertCircle, Wand2 } from 'lucide-react';
import { motion } from 'framer-motion';

// Types
type Result = {
  summary?: string;
  fortune?: {
    finance?: string;
    love?: string;
    health?: string;
    opportunity?: string;
  };
  recommendedWallpaper?: {
    theme?: string;
    color?: string;
    reason?: string;
    recommendedCard?: string;
    enhancedAspect?: string;
  };
  raw?: string;
};

// Card UI
const SectionCard = ({
  title,
  children,
  border = 'border-purple-500',
  bg = 'bg-[#392B52]/40',
}: {
  title: React.ReactNode;
  children: React.ReactNode;
  border?: string;
  bg?: string;
}) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className={`rounded-lg p-5 ${bg} ${border} shadow-md overflow-y-auto max-h-60`}
  >
    <h2 className="font-semibold text-base mb-2 flex items-center gap-2">{title}</h2>
    {children}
  </motion.section>
);

// Text info row
const Detail = ({ label, value }: { label: string; value: string }) => (
  <p className="text-sm">
    <span className="text-purple-300 font-semibold drop-shadow-md">{label}:</span> {value || '-'}
  </p>
);

export default function AiAnalysisPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // 🧠 Parameters
  const fullName = searchParams.get('fullName') || '';
  const birthDate = searchParams.get('birthDate') || '';
  const phone = searchParams.get('phone') || '';
  const address = searchParams.get('address') || '';
  const gender = searchParams.get('gender') || '';
  const theme = searchParams.get('theme') || '';

  // 📊 Data states
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const params = new URLSearchParams({ name: fullName, birthDate, gender, address });
        const res = await fetch(`/api/analyze-groq?${params.toString()}`);
        const data = await res.json();
        if (!data.success) throw new Error(data.error || 'เกิดข้อผิดพลาด');
        setResult(data.data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'ไม่สามารถโหลดผลการวิเคราะห์ได้');
      } finally {
        setLoading(false);
      }
    };
    fetchAnalysis();
  }, [fullName, birthDate, gender, address]);

  // ✅ ส่งไปหน้า /checkout/package พร้อม query
  const handleSelectPackage = () => {
    const params = new URLSearchParams({
      fullName,
      birthDate,
      phone,
      address,
      gender,
      theme,
      ai: 'true',
    });
    router.push(`/checkout/package?${params.toString()}`);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A103D] to-[#3B2D56] opacity-90 z-0" />
      <div className="absolute inset-0 bg-stars-pattern opacity-20 z-0" />

      <motion.main className="relative z-10 h-full w-full px-4 font-serif text-white pt-16 flex justify-center items-start">
        <div className="relative bg-gradient-to-br from-[#2A1B45]/90 to-[#3B2D56]/90 rounded-3xl shadow-2xl border border-purple-800 w-full max-w-4xl p-6 md:p-10 space-y-8 backdrop-blur-lg max-h-[95vh] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-700 scrollbar-track-transparent">

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-center text-yellow-200 tracking-wide drop-shadow-[0_0_12px_rgba(255,255,100,0.8)] animate-pulse">
            🔮 ผลการวิเคราะห์ดวง
          </h1>

          {/* User Info */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-white">
              <div className="flex flex-col gap-2 bg-[#442B64]/60 p-5 rounded-xl border border-purple-700 shadow-md">
                <Detail label="ชื่อ" value={fullName} />
                <Detail label="วันเกิด" value={birthDate} />
                <Detail label="เบอร์" value={phone} />
              </div>
              <div className="flex flex-col gap-2 bg-[#442B64]/60 p-5 rounded-xl border border-purple-700 shadow-md text-right">
                <Detail label="บ้านเลขที่" value={address} />
                <Detail label="เพศ" value={gender} />
                <Detail label="ธีมที่เลือก" value={theme} />
              </div>
            </div>
          </motion.section>

          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center gap-2 text-yellow-300 text-sm animate-pulse">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>กำลังเปิดพลังจักรวาลเพื่ออ่านดวงชะตา...</span>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          {/* Result */}
          {!loading && result && (
            <div className="grid gap-6 text-sm text-purple-100">
              {/* Summary */}
              {result.summary && (
                <SectionCard
                  title={
                    <>
                      <motion.div animate={{ rotate: [0, 360] }} transition={{ repeat: Infinity, duration: 2 }}>
                        <Wand2 className="w-5 h-5 text-yellow-300" />
                      </motion.div>
                      <span className="text-yellow-300 drop-shadow-[0_0_8px_rgba(255,255,150,0.8)]">นิสัยและบุคลิกภาพ</span>
                    </>
                  }
                >
                  <p className="leading-relaxed">{result.summary}</p>
                </SectionCard>
              )}

              {/* Fortune + Recommended Wallpaper */}
              {(result.fortune || result.recommendedWallpaper) && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {result.fortune && (
                    <SectionCard title="🔮 คำทำนายด้านต่าง ๆ">
                      <ul className="list-disc pl-5 space-y-1 leading-relaxed">
                        {result.fortune.finance && <li><strong>การเงิน:</strong> {result.fortune.finance}</li>}
                        {result.fortune.love && <li><strong>ความรัก:</strong> {result.fortune.love}</li>}
                        {result.fortune.health && <li><strong>สุขภาพ:</strong> {result.fortune.health}</li>}
                        {result.fortune.opportunity && <li><strong>โอกาส:</strong> {result.fortune.opportunity}</li>}
                      </ul>
                    </SectionCard>
                  )}

                  {result.recommendedWallpaper && (
                    <SectionCard
                      title="🎨 วอลเปเปอร์เสริมดวง"
                      border="border-yellow-400"
                      bg="bg-gradient-to-r from-[#55407A] to-[#6B4A9B]"
                    >
                      <p><strong>ธีม:</strong> {result.recommendedWallpaper.theme}</p>
                      <p><strong>สี:</strong> {result.recommendedWallpaper.color}</p>
                      <p><strong>เหตุผล:</strong> {result.recommendedWallpaper.reason}</p>
                      <p><strong>ด้านที่ควรเน้นเสริม:</strong> {result.recommendedWallpaper.enhancedAspect}</p>
                    </SectionCard>
                  )}
                </div>
              )}

              {/* Raw text */}
              {result.raw && (
                <SectionCard
                  title="📜 คำตอบจาก AI (ดิบ)"
                  border="border-pink-200"
                  bg="bg-pink-100 text-gray-900"
                >
                  <p>{result.raw}</p>
                </SectionCard>
              )}

              {/* Select Package Button */}
              <div className="text-center pt-6">
                <button
                  onClick={handleSelectPackage}
                  className="inline-block bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 hover:brightness-110 text-gray-900 font-semibold py-3 px-6 rounded-full shadow-lg transition-all"
                >
                  🔆 เลือกการ์ดเสริมพลัง
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.main>
    </div>
  );
}
