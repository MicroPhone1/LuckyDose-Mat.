'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader2, AlertCircle, Wand2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

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

export default function AiAnalysisPage() {
  const searchParams = useSearchParams();

  const theme = searchParams.get('theme') || '';
  const fullName = searchParams.get('fullName') || '';
  const birthDate = searchParams.get('birthDate') || '';
  const phone = searchParams.get('phone') || '';
  const address = searchParams.get('address') || '';
  const gender = searchParams.get('gender') || '';

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

  return (
    <motion.main
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="min-h-screen bg-gradient-to-br from-[#1A103D] to-[#3B2D56] flex items-start justify-center px-4 pt-28 pb-16 font-serif text-white overflow-auto"
    >
      <div className="bg-[#2A1B45]/90 rounded-3xl shadow-2xl max-w-4xl w-full p-6 md:p-8 border border-purple-700 space-y-6 backdrop-blur-sm">
        <h1 className="text-3xl font-bold text-center text-yellow-300 drop-shadow-md">
          🔮 ผลการวิเคราะห์ดวง
        </h1>

        {/* ข้อมูลส่วนตัว */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-[#3B2D56]/60 rounded-xl p-4 border border-purple-800 text-sm shadow-inner text-center space-y-2"
        >
          {[['ชื่อ', fullName], ['วันเกิด', birthDate], ['เบอร์', phone], ['บ้านเลขที่', address], ['เพศ', gender], ['ธีมที่เลือก', theme]].map(
            ([label, value]) => (
              <p key={label}>
                <strong className="text-purple-200">{label}:</strong> {value}
              </p>
            )
          )}
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

        {/* Content */}
        {!loading && result && (
          <div className="grid gap-6 text-sm text-purple-100">
            {result.summary && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="rounded-lg border border-purple-500 p-5 bg-[#392B52]/40 max-h-60 overflow-y-auto"
              >
                <h2 className="font-semibold text-yellow-400 mb-2 flex items-center gap-2 text-base">
                  <Wand2 className="w-5 h-5" /> ✏️ นิสัยและบุคลิกภาพ
                </h2>
                <p className="leading-relaxed">{result.summary}</p>
              </motion.section>
            )}

            {(result.fortune || result.recommendedWallpaper) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-col lg:flex-row gap-4"
              >
                {/* คำทำนาย */}
                <motion.section className="flex-1 rounded-lg border border-purple-500 p-5 bg-[#392B52]/40 max-h-60 overflow-y-auto">
                  <h2 className="font-semibold text-pink-400 mb-2 text-sm">🔮 คำทำนายด้านต่าง ๆ</h2>
                  <ul className="list-disc pl-5 space-y-1">
                    {result.fortune?.finance && <li><strong>การเงิน:</strong> {result.fortune.finance}</li>}
                    {result.fortune?.love && <li><strong>ความรัก:</strong> {result.fortune.love}</li>}
                    {result.fortune?.health && <li><strong>สุขภาพ:</strong> {result.fortune.health}</li>}
                    {result.fortune?.opportunity && <li><strong>โอกาส:</strong> {result.fortune.opportunity}</li>}
                  </ul>
                </motion.section>

                {/* Wallpaper */}
                <motion.section className="flex-1 rounded-lg border border-yellow-400 p-5 bg-[#55407A]/50 max-h-60 overflow-y-auto">
                  <h2 className="font-semibold text-amber-300 mb-2 text-sm">🎨 วอลเปเปอร์เสริมดวง</h2>
                  <p><strong>ธีม:</strong> {result.recommendedWallpaper?.theme}</p>
                  <p><strong>สี:</strong> {result.recommendedWallpaper?.color}</p>
                  <p><strong>เหตุผล:</strong> {result.recommendedWallpaper?.reason}</p>
                  <p><strong>ด้านที่ควรเน้นเสริม:</strong> {result.recommendedWallpaper?.enhancedAspect}</p>
                </motion.section>
              </motion.div>
            )}

            {/* คำตอบดิบ */}
            {result.raw && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="rounded-lg border border-pink-200 p-5 bg-pink-100 text-gray-900 whitespace-pre-wrap text-sm max-h-60 overflow-y-auto"
              >
                <h2 className="font-semibold text-pink-700 mb-2">📜 คำตอบจาก AI (ดิบ)</h2>
                <p>{result.raw}</p>
              </motion.section>
            )}

            {/* ปุ่มเลือกการ์ด */}
            <div className="text-center pt-4">
              <Link
                href="/checkout/package"
                className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 px-6 rounded-lg shadow transition-all"
              >
                🔆 เลือกการ์ดเสริมพลัง
              </Link>
            </div>
          </div>
        )}
      </div>
    </motion.main>
  );
}
