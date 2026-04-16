import Groq from "groq-sdk";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { education, field, budget, duration } = await req.json();

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "Groq API key is not configured on the server." },
        { status: 500 }
      );
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const prompt = `You are an expert international career and education mentor.
A student from India has provided the following profile for higher education:
- Current Education Level: ${education}
- Desired Field of Study: ${field}
- Estimated Total Budget (USD): $${budget}
- Preferred Study Duration: ${duration} years

Recommend exactly 3 optimal career/education pathways.
Consider ROI, post-study work visas, and cost of living.
Respond STRICTLY with a valid JSON format (NO extra text, NO markdown formatting like \`\`\`json) matching this exact schema:
{
  "pathways": [
    {
      "title": "Degree Name",
      "country": "Country Name",
      "top_universities": ["Uni 1", "Uni 2"],
      "estimated_cost": "Cost string (specify both USD and INR equivalent ₹)",
      "roi_score": "High/Medium/Low",
      "why_it_fits": "Brief explanation"
    }
  ]
}`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
    });

    const text = completion.choices[0]?.message?.content || "{}";
    const data = JSON.parse(text);
    
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Groq API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate recommendations. Please try again." },
      { status: 500 }
    );
  }
}
