'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { th } from 'date-fns/locale';

export default function PredictPage() {
  const searchParams = useSearchParams();
  const theme = searchParams.get('theme') || '';
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: '',
    birthDate: null as Date | null,
    phone: '',
    address: '',
    gender: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateWithAI = async () => {
    const res = await fetch('/api/validate-input', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, theme }),
    });
    const result = await res.json();
    return result; // { valid: boolean, message?: string }
  };

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const aiCheck = await validateWithAI();
    if (!aiCheck.valid) {
      alert(aiCheck.message || 'ข้อมูลไม่สมเหตุสมผล กรุณาตรวจสอบอีกครั้ง');
      setLoading(false);
      return;
    }

    const params = new URLSearchParams({
      theme,
      fullName: form.fullName,
      birthDate: form.birthDate
        ? form.birthDate.toLocaleDateString('sv-SE')
        : '',
      phone: form.phone,
      address: form.address,
      gender: form.gender,
    });

    router.push(`/checkout/select?${params.toString()}`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#FFFDFB] to-[#FAF3F0] flex items-center justify-center px-4 py-16 font-sans">
      <form
        onSubmit={handleNext}
        className="bg-white shadow-md rounded-xl w-full max-w-lg p-10 space-y-6"
      >
        <div className="text-center mb-2">
          <h1 className="text-2xl font-semibold text-gray-800">วิเคราะห์ดวงชะตาของคุณ</h1>
          <p className="text-sm text-gray-500 mt-2">**กรอกข้อมูลด้านล่างให้ครบและตรวจสอบอย่างถี่ถ้วน**</p>
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">ชื่อ - นามสกุล</label>
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            required
            className="w-full bg-gray-50 px-4 py-2 rounded-md text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300"
            placeholder="เช่น สมชาย ใจดี"
          />
        </div>

        {/* Birthdate */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">วัน / เดือน / ปีเกิด</label>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={th}>
            <DatePicker
              value={form.birthDate}
              onChange={(newDate) =>
                setForm((prev) => ({ ...prev, birthDate: newDate }))
              }
              format="dd/MM/yyyy"
              slotProps={{
                textField: {
                  fullWidth: true,
                  required: true,
                  size: 'small',
                  sx: {
                    backgroundColor: '#F9FAFB',
                    borderRadius: 1,
                    input: { fontFamily: 'inherit' },
                    '.MuiInputBase-root': {
                      fontSize: '0.875rem',
                      padding: '4px 8px',
                    },
                  },
                },
              }}
            />
          </LocalizationProvider>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">เบอร์โทรศัพท์</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full bg-gray-50 px-4 py-2 rounded-md text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300"
            placeholder="เช่น 091-2345678"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">บ้านเลขที่</label>
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            className="w-full bg-gray-50 px-4 py-2 rounded-md text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300"
            placeholder="เช่น 99/123"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">เพศ</label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            required
            className="w-full bg-gray-50 px-4 py-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-rose-300"
          >
            <option value="">-- กรุณาเลือกเพศ --</option>
            <option value="male">ชาย</option>
            <option value="female">หญิง</option>
            <option value="other">อื่น ๆ</option>
          </select>
        </div>

        <div className="text-center text-sm text-gray-500">
          ธีมที่คุณเลือก: <span className="font-medium text-gray-700">{theme || 'ไม่พบธีม'}</span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-rose-500 hover:bg-rose-600 text-white py-3 rounded-lg text-base font-medium transition-all shadow hover:shadow-md disabled:opacity-60"
        >
          {loading ? 'กำลังตรวจสอบ...' : 'วิเคราะห์ดวง'}
        </button>
      </form>
    </main>
  );
}
