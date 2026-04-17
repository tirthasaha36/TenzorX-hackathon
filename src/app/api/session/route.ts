import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { 
      degree, university, cgpa, 
      ieltsScore, greScore, workExp, 
      budget, preferredCountry, intake, 
      recommendations 
    } = await req.json();

    const session = await prisma.session.create({
      data: {
        degree,
        university,
        cgpa: cgpa ? parseFloat(cgpa) : null,
        ieltsScore: ieltsScore ? parseFloat(ieltsScore) : null,
        greScore: greScore ? parseInt(greScore) : null,
        workExp: workExp ? parseInt(workExp) : null,
        budget: budget ? parseFloat(budget) : null,
        preferredCountry,
        intake,
        recommendations: typeof recommendations === 'string' ? recommendations : JSON.stringify(recommendations)
      }
    });

    return NextResponse.json(session);
  } catch (error) {
    console.error("DB Create Error:", error);
    return NextResponse.json({ error: "Failed to create session" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Session ID required" }, { status: 400 });
    }

    const session = await prisma.session.findUnique({
      where: { id }
    });

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    return NextResponse.json(session);
  } catch (error) {
    console.error("DB Fetch Error:", error);
    return NextResponse.json({ error: "Failed to fetch session" }, { status: 500 });
  }
}
