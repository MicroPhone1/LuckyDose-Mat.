import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { targetLang, path } = body;

  if (!targetLang || !path) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  const prompt = `
คุณคือนักแปลเว็บไซต์มืออาชีพ
จงแปล path URL ของเว็บไซต์จากภาษาเดิมเป็นภาษาที่ผู้ใช้เลือกอย่างเหมาะสม

- path ปัจจุบัน: "${path}"
- ภาษาที่ต้องการแปล: "${targetLang}"

เช่น:
/products → /en/products (ถ้าภาษาคือ en)
/products → /th/products (ถ้าภาษาคือ th)
/ → /en หรือ /th ตามภาษา

**ให้ตอบกลับเฉพาะ JSON เท่านั้น**
เช่น: { "translatedPath": "/en/orders" }
`;

  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GROQ_API_KEY || ''}`,
      },
      body: JSON.stringify({
        model: 'llama3-70b-8192',
        messages: [
          { role: 'system', content: 'คุณคือระบบแปล path เว็บไซต์ให้เหมาะกับภาษาที่เลือก' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 100
      }),
    });

    const response = await groqRes.json();
    const content = response.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json({ error: 'Translation failed' }, { status: 500 });
    }

    const parsed = JSON.parse(content);
    return NextResponse.json(parsed);
  } catch (error) {
    console.error('[Groq Translate Error]', error);
    return NextResponse.json({ error: 'Translation API error' }, { status: 500 });
  }
}
