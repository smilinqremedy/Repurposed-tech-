import { NextResponse } from "next/server";
import { getProducts } from "@/lib/services";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const filters = {
    category: searchParams.get("category") || undefined,
    era: searchParams.get("era") || undefined,
    status: searchParams.get("status") || undefined,
    search: searchParams.get("search") || undefined,
    sortBy: (searchParams.get("sortBy") as any) || undefined,
    minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
    maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
  };

  const products = await getProducts(filters);
  return NextResponse.json({ count: products.length, products });
}
