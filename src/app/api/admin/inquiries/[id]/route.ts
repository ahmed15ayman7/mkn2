import { NextResponse } from "next/server";
import { requireActiveAdmin, isNextResponse } from "@/lib/auth/admin-api";
import { prisma } from "@/lib/prisma";
import { inquiryStatusSchema } from "@/lib/validation/admin";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const session = await requireActiveAdmin();
  if (isNextResponse(session)) return session;

  const { id } = await params;
  const json = await request.json();
  const parsed = inquiryStatusSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const inquiry = await prisma.inquiry.update({
    where: { id },
    data: { status: parsed.data.status },
  });

  return NextResponse.json({ inquiry });
}

export async function DELETE(_request: Request, { params }: Params) {
  const session = await requireActiveAdmin();
  if (isNextResponse(session)) return session;

  const { id } = await params;
  await prisma.inquiry.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
