import Groq from "groq-sdk";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "Groq API key is missing" },
        { status: 500 }
      );
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    // Map history to Groq format
    // Groq expects role: "user" | "assistant" | "system"
    const formattedHistory = history.map((msg: { user: string, text: string }) => ({
      role: msg.user === "User" ? "user" : "assistant",
      content: msg.text,
    }));

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are TenzorX Mentor, an advanced AI copilot for Indian students wanting to study abroad or domestically. Guide them through university selection, ROI tracking, and securing education loans. Be concise, friendly, and very helpful."
        },
        ...formattedHistory,
        {
          role: "user",
          content: message,
        }
      ],
      model: "llama-3.1-8b-instant", // Optimized for ultra-low latency chat
    });

    const response = completion.choices[0]?.message?.content || "I'm having trouble thinking, please try again!";

    return NextResponse.json({ text: response });
  } catch (error: any) {
    console.error("Groq Chat API Error:", error);
    return NextResponse.json(
      { error: "Chat service unavailable." },
      { status: 500 }
    );
  }
}
