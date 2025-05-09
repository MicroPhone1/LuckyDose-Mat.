import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const name = searchParams.get('name')?.trim() || '';
  const birthDate = searchParams.get('birthDate')?.trim() || '';
  const gender = searchParams.get('gender')?.trim() || '';
  const address = searchParams.get('address')?.trim() || '';
  const theme = searchParams.get('theme')?.trim() || '';
  
  if (!name || !birthDate || !gender || !address) {
    return NextResponse.json(
      { success: false, error: 'ข้อมูลไม่ครบ กรุณาระบุให้ครบทุกช่อง' },
      { status: 400 }
    );
  }

const prompt = `
คุณคือหมอดูผู้เชี่ยวชาญด้านโหราศาสตร์ไทย ฮวงจุ้ย จิตวิทยาพฤติกรรม และพลังงานชีวิต
มีประสบการณ์มากกว่า 20 ปีในการวิเคราะห์ดวงชะตาและแนะนำแนวทางชีวิตอย่างลึกซึ้งและแม่นยำ

กรุณาวิเคราะห์ดวงชะตาจากข้อมูลด้านล่าง โดยใช้พื้นฐานของ:
- วันเดือนปีเกิดตามปฏิทินไทยและสากล
- เพศตามหลักพลังหยินหยาง
- บ้านเลขที่ตามศาสตร์ฮวงจุ้ย
- ชื่อ ตามหลักเลขศาสตร์และอักษรศาสตร์
- ธีมวอลเปเปอร์ที่เจ้าของดวงเลือกไว้

**คำตอบต้องเป็นภาษาไทยล้วน โดยไม่ใช้คำว่า "ฉัน" หรือ "คุณผู้ใช้"**
**ให้เขียนเหมือนพูดกับเจ้าของดวงโดยตรง**
**ตอบกลับในรูปแบบ JSON ที่กำหนดไว้ด้านล่างอย่างเคร่งครัด**

ข้อมูลดวงชะตา:
- ชื่อ: ${name}
- วันเกิด: ${birthDate}
- เพศ: ${gender}
- บ้านเลขที่: ${address}
- ธีมที่เลือก: ${theme}

วิเคราะห์:
1. บุคลิกภาพโดยรวม นิสัย จุดแข็ง จุดอ่อน (โดยอิงจากพลังดาวประจำวันเกิดและเลขศาสตร์ของชื่อ)
2. แนวโน้มดวงชะตาในช่วงนี้: การเงิน ความรัก สุขภาพ และโอกาสสำคัญที่กำลังเข้ามา
3. วิเคราะห์ความสอดคล้องระหว่างธีมที่เลือก กับพลังดวงชะตา และแนะนำว่า:
   - ควรเน้นการเสริมดวงด้านใดในช่วงนี้
   - ควรเลือกการ์ดเสริมดวงประเภทใด (ตัวอย่าง: ความมั่งคั่ง ความรัก พลังใจ สุขภาพ หรือโอกาสใหม่)

**รูปแบบ JSON ที่ต้องใช้ในการตอบกลับ**:

{
  "summary": "สรุปลักษณะนิสัย จุดแข็ง จุดอ่อน",
  "fortune": {
    "finance": "ดวงการเงิน",
    "love": "ดวงความรัก",
    "health": "ดวงสุขภาพ",
    "opportunity": "โอกาสและสิ่งที่ควรคว้า"
  },
  "recommendedWallpaper": {
    "theme": "ชื่อธีมวอลเปเปอร์",
    "color": "สีที่แนะนำ",
    "reason": "เหตุผลที่เลือกธีมนี้ เช่น สัมพันธ์กับวันเกิดหรือบ้านเลขที่",
    "enhancedAspect": "ด้านที่ควรเสริมเพื่อให้รุ่งเมื่อใช้ธีมนี้ เช่น การเงินหรือสุขภาพ",
    "recommendedCard": "ชื่อการ์ดเสริมดวงหรือประเภทการ์ดที่เหมาะสม เช่น ความรัก, พลังใจ"
  }
}
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
          {
            role: 'system',
            content: 'คุณเป็นหมอดูที่ตอบกลับด้วย JSON ภาษาไทยเท่านั้น',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7, // ✅ ช่วยให้คำตอบเสถียรขึ้น
        top_p: 0.95,
        max_tokens: 1200,
      }),
    });

    if (!groqRes.ok) {
      const errJson = await groqRes.json().catch(() => ({}));
      console.error('[Groq API Error]', groqRes.status, errJson);
      return NextResponse.json(
        {
          success: false,
          error: `Groq API ผิดพลาด: ${groqRes.statusText}`,
        },
        { status: groqRes.status }
      );
    }

    const response = await groqRes.json();
    const content = response.choices?.[0]?.message?.content || '';

    let parsed;
    try {
      parsed = JSON.parse(content);

      // ✅ เช็คว่าโครงสร้างครบจริงหรือไม่
      if (
        !parsed.summary ||
        !parsed.fortune ||
        !parsed.recommendedWallpaper
      ) {
        throw new Error('โครงสร้าง JSON ไม่สมบูรณ์');
      }
    } catch (e) {
      console.warn('[Parse Warning] ไม่สามารถ parse JSON ได้:', e);
      parsed = { raw: content };
    }

    return NextResponse.json({
      success: true,
      data: parsed,
    });
  } catch (err: unknown) {
    console.error('[Groq Error]', err instanceof Error ? err.message : err);

    return NextResponse.json(
      { success: false, error: 'ไม่สามารถเชื่อมต่อ Groq API ได้ กรุณาตรวจสอบคีย์หรือการเชื่อมต่อ' },
      { status: 500 }
    );
  }
}
