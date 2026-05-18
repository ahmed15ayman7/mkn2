import { NextResponse } from "next/server";
import { requireActiveAdmin, isNextResponse } from "@/lib/auth/admin-api";
import { prisma } from "@/lib/prisma";
import { projectBodySchema } from "@/lib/validation/admin";
import { toProjectCreateData } from "@/lib/admin/project-data";

export async function GET() {
  const session = await requireActiveAdmin();
  if (isNextResponse(session)) return session;

  const projects = await prisma.project.findMany({
    orderBy: [{ featured: "desc" }, { updatedAt: "desc" }],
    select: {
      id: true,
      slug: true,
      titleEn: true,
      titleAr: true,
      featured: true,
      coverImage: true,
      updatedAt: true,
    },
  });

  return NextResponse.json({ projects });
}

export async function POST(request: Request) {
  const session = await requireActiveAdmin();
  if (isNextResponse(session)) return session;

  const json = await request.json();
  const parsed = projectBodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  try {
    const project = await prisma.project.create({
      data: toProjectCreateData(parsed.data),
    });
    return NextResponse.json({ project }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
