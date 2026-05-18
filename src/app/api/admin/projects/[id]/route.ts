import { NextResponse } from "next/server";
import { requireActiveAdmin, isNextResponse } from "@/lib/auth/admin-api";
import { prisma } from "@/lib/prisma";
import { projectBodySchema } from "@/lib/validation/admin";
import { toProjectUpdateData } from "@/lib/admin/project-data";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const session = await requireActiveAdmin();
  if (isNextResponse(session)) return session;

  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id },
    include: { seo: true },
  });

  if (!project) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ project });
}

export async function PATCH(request: Request, { params }: Params) {
  const session = await requireActiveAdmin();
  if (isNextResponse(session)) return session;

  const { id } = await params;
  const json = await request.json();
  const parsed = projectBodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  try {
    const project = await prisma.project.update({
      where: { id },
      data: toProjectUpdateData(parsed.data),
      include: { seo: true },
    });
    return NextResponse.json({ project });
  } catch {
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  const session = await requireActiveAdmin();
  if (isNextResponse(session)) return session;

  const { id } = await params;
  await prisma.project.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
