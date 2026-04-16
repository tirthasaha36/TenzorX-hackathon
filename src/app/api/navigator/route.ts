import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { education, field, budget, duration } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API key is not configured on the server." },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
      "estimated_cost": "Cost string",
      "roi_score": "High/Medium/Low",
      "why_it_fits": "Brief explanation"
    }
  ]
}`;

    const result = await model.generateContent(prompt);
    let text = result.response.text().trim();
    
    // Clean up potential markdown blocks if present
    if (text.startsWith("```json")) {
      text = text.slice(7, -3).trim();
    } else if (text.startsWith("```")) {
      text = text.slice(3, -3).trim();
    }

    const data = JSON.parse(text);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate recommendations. Please try again." },
      { status: 500 }
    );
  }
}
