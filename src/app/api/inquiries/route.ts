import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { inquiryBodySchema } from "@/lib/validation/admin";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = inquiryBodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        ...parsed.data,
        subject: parsed.data.subject || null,
        targetBudget: parsed.data.targetBudget || null,
      },
    });

    return NextResponse.json({ ok: true, id: inquiry.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to submit inquiry" }, { status: 500 });
  }
}
