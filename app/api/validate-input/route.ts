import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  const prompt = `
ข้อมูลที่ได้รับ:
- ชื่อ: ${body.fullName}
- วันเกิด: ${body.birthDate}
- เบอร์โทร: ${body.phone}
- บ้านเลขที่: ${body.address}
- เพศ: ${body.gender}
- ธีมที่เลือก: ${body.theme}

โปรดตรวจสอบว่า "ข้อมูลข้างต้นดูสมเหตุสมผลหรือไม่"
- หากข้อมูลดูสมเหตุสมผล ให้ตอบ: { "valid": true }
- หากพบข้อมูลมั่ว เช่น ชื่อแปลก เบอร์โทรผิดรูปแบบ บ้านเลขที่ไม่สมจริง หรือเพศไม่สอดคล้อง ให้ตอบ: 
  { "valid": false, "message": "เหตุผลแบบสุภาพที่อธิบายว่าอะไรผิด เช่น กรุณาระบุชื่อที่ดูสมจริง" }

**ตอบกลับเฉพาะ JSON เท่านั้น ห้ามมีคำอธิบายอื่น**
`;

  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GROQ_API_KEY || ''}`,
      },
      body: JSON.stringify({
        model: 'llama3-70b-8192',
        messages: [
          {
            role: 'system',
            content: 'คุณคือระบบช่วยตรวจสอบความสมเหตุสมผลของฟอร์มอย่างสุภาพและแม่นยำ',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.3,
        max_tokens: 500,
      }),
    });

    const result = await res.json();
    const content = result.choices?.[0]?.message?.content || '{}';

    try {
      const parsed = JSON.parse(content);
      return NextResponse.json(parsed);
    } catch {
      return NextResponse.json({ valid: true }); // fallback ผ่านกรณี response ไม่ถูกต้อง
    }
  } catch (err) {
    console.error('[Groq API Error]', err);
    return NextResponse.json({ valid: true }); // fallback ไม่ให้ผู้ใช้ติดค้าง
  }
}
