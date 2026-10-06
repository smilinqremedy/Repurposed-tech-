import { NextResponse } from "next/server";
import { getOrder } from "@/lib/services";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const order = await getOrder(id);

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json({ order });
}
