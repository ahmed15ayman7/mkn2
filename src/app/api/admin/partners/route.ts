import { NextResponse } from "next/server";
import { requireActiveAdmin, isNextResponse } from "@/lib/auth/admin-api";
import { prisma } from "@/lib/prisma";
import { partnerBodySchema } from "@/lib/validation/admin";

export async function GET() {
  const session = await requireActiveAdmin();
  if (isNextResponse(session)) return session;

  const partners = await prisma.partner.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return NextResponse.json({ partners });
}

export async function POST(request: Request) {
  const session = await requireActiveAdmin();
  if (isNextResponse(session)) return session;

  const json = await request.json();
  const parsed = partnerBodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const partner = await prisma.partner.create({
    data: {
      ...parsed.data,
      sortOrder: parsed.data.sortOrder ?? 0,
    },
  });

  return NextResponse.json({ partner }, { status: 201 });
}
