import { NextResponse } from "next/server";
import { requireActiveAdmin, isNextResponse } from "@/lib/auth/admin-api";
import { prisma } from "@/lib/prisma";
import { globalContentBodySchema } from "@/lib/validation/admin";

export async function GET() {
  const session = await requireActiveAdmin();
  if (isNextResponse(session)) return session;

  const items = await prisma.globalContent.findMany({
    orderBy: { key: "asc" },
  });

  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const session = await requireActiveAdmin();
  if (isNextResponse(session)) return session;

  const json = await request.json();
  const parsed = globalContentBodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  try {
    const item = await prisma.globalContent.create({ data: parsed.data });
    return NextResponse.json({ item }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Key already exists" }, { status: 409 });
  }
}
