import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  const session = await getAuthSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { text, postId } = await req.json();

  if (!text || !postId) {
    return NextResponse.json(
      { message: "Text and postId are required" },
      { status: 400 }
    );
  }

  try {
    const roast = await prisma.roast.create({
      data: {
        text,
        postId,
        authorId: session.user.id,
      },
    });

    return NextResponse.json(roast, { status: 201 });
  } catch (error) {
    console.error("Error creating roast:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
