import { NextResponse } from "next/server";
import { getDrops } from "@/lib/services";

export async function GET() {
  const drops = await getDrops();
  return NextResponse.json({ count: drops.length, drops });
}
