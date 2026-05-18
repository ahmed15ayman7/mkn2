import { NextResponse } from "next/server";
import { requireActiveAdmin, isNextResponse } from "@/lib/auth/admin-api";
import { prisma } from "@/lib/prisma";
import { partnerBodySchema } from "@/lib/validation/admin";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const session = await requireActiveAdmin();
  if (isNextResponse(session)) return session;

  const { id } = await params;
  const json = await request.json();
  const parsed = partnerBodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const partner = await prisma.partner.update({
    where: { id },
    data: parsed.data,
  });

  return NextResponse.json({ partner });
}

export async function DELETE(_request: Request, { params }: Params) {
  const session = await requireActiveAdmin();
  if (isNextResponse(session)) return session;

  const { id } = await params;
  await prisma.partner.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
