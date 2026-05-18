import { NextResponse } from "next/server";
import { requireActiveAdmin, isNextResponse } from "@/lib/auth/admin-api";
import { prisma } from "@/lib/prisma";
import { globalContentBodySchema } from "@/lib/validation/admin";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const session = await requireActiveAdmin();
  if (isNextResponse(session)) return session;

  const { id } = await params;
  const json = await request.json();
  const parsed = globalContentBodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  try {
    const item = await prisma.globalContent.update({
      where: { id },
      data: parsed.data,
    });
    return NextResponse.json({ item });
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  const session = await requireActiveAdmin();
  if (isNextResponse(session)) return session;

  const { id } = await params;
  await prisma.globalContent.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
