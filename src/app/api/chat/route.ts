import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "API key is missing" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Construct history for Gemini SDK
    // Gemini SDK expects history in the format: { role: "user" | "model", parts: [{ text: "..." }] }
    // We map our simplified history to this structure.
    const formattedHistory = history.map((msg: { user: string, text: string }) => ({
      role: msg.user === "User" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "You are TenzorX Mentor, an advanced AI copilot for Indian students wanting to study abroad or domestically. Guide them through university selection, ROI tracking, and securing education loans. Be concise, friendly, and very helpful." }]
        },
        {
          role: "model",
          parts: [{ text: "Understood! I am TenzorX Mentor, ready to guide students towards their global education dreams and financial planning!" }]
        },
        ...formattedHistory
      ],
    });

    const result = await chat.sendMessage(message);
    const response = result.response.text();

    return NextResponse.json({ text: response });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Chat service unavailable." },
      { status: 500 }
    );
  }
}
