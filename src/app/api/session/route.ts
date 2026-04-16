import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { cgpa, budget, preferredCountry, recommendations } = await req.json();

    const session = await prisma.session.create({
      data: {
        cgpa: parseFloat(cgpa) || null,
        budget: parseFloat(budget) || null,
        preferredCountry,
        recommendations
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
