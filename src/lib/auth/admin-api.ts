import { NextResponse } from "next/server";
import type { Session } from "next-auth";
import { auth } from "@/auth";

export async function requireActiveAdmin(): Promise<
  Session | NextResponse
> {
  const session = await auth();
  if (!session?.user?.active) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return session;
}

export function isNextResponse(
  value: Session | NextResponse,
): value is NextResponse {
  return value instanceof NextResponse;
}
