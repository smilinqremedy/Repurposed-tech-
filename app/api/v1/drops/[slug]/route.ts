import { NextResponse } from "next/server";
import { getDropBySlug } from "@/lib/services";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const drop = await getDropBySlug(slug);

  if (!drop) {
    return NextResponse.json({ error: "Drop not found" }, { status: 404 });
  }

  return NextResponse.json({ drop });
}
