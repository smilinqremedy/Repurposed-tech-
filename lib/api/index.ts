import { Product, FilterOptions } from "@/types/product";
import { Drop } from "@/lib/drops";
import { Order } from "@/types/order";
import { CustomBuildConfig } from "@/types/build";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

/**
 * Centralized API client for REPURPOSED TECH platform
 * Connects to Next.js API Routes or standalone Go REST API backend
 */
export const api = {
  products: {
    async list(filters?: FilterOptions): Promise<Product[]> {
      const params = new URLSearchParams();
      if (filters?.category && filters.category !== "All") params.set("category", filters.category);
      if (filters?.era && filters.era !== "All") params.set("era", filters.era);
      if (filters?.status && filters.status !== "All") params.set("status", filters.status);
      if (filters?.minPrice !== undefined) params.set("minPrice", String(filters.minPrice));
      if (filters?.maxPrice !== undefined) params.set("maxPrice", String(filters.maxPrice));
      if (filters?.search) params.set("search", filters.search);
      if (filters?.sortBy) params.set("sortBy", filters.sortBy);

      const qs = params.toString();
      const url = `${API_BASE}/api/v1/products${qs ? `?${qs}` : ""}`;
      const res = await fetch(url, { next: { revalidate: 60 } });
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      return data.products || data;
    },

    async getBySlug(slug: string): Promise<Product | null> {
      const res = await fetch(`${API_BASE}/api/v1/products/${slug}`, { next: { revalidate: 60 } });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch product");
      const data = await res.json();
      return data.product || data;
    },
  },

  drops: {
    async list(): Promise<Drop[]> {
      const res = await fetch(`${API_BASE}/api/v1/drops`, { next: { revalidate: 60 } });
      if (!res.ok) throw new Error("Failed to fetch drops");
      const data = await res.json();
      return data.drops || data;
    },

    async getBySlug(slug: string): Promise<Drop | null> {
      const res = await fetch(`${API_BASE}/api/v1/drops/${slug}`, { next: { revalidate: 60 } });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch drop");
      const data = await res.json();
      return data.drop || data;
    },
  },

  orders: {
    async create(orderPayload: any): Promise<Order> {
      const res = await fetch(`${API_BASE}/api/v1/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create order");
      }
      const data = await res.json();
      return data.order || data;
    },

    async getById(id: string): Promise<Order | null> {
      const res = await fetch(`${API_BASE}/api/v1/orders/${id}`);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch order");
      const data = await res.json();
      return data.order || data;
    },
  },

  builds: {
    async calculate(config: CustomBuildConfig): Promise<{
      totalPrice: number;
      breakdown: Record<string, number>;
    }> {
      const res = await fetch(`${API_BASE}/api/v1/builds`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      if (!res.ok) throw new Error("Failed to calculate build price");
      return res.json();
    },
  },

  payments: {
    async initialize(payload: {
      orderId: string;
      email: string;
      amount: number;
      callbackUrl?: string;
    }): Promise<{
      authorizationUrl: string;
      accessCode: string;
      reference: string;
    }> {
      const res = await fetch(`${API_BASE}/api/v1/payments/initialize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to initialize payment");
      return res.json();
    },

    async verify(reference: string): Promise<{
      status: "success" | "failed" | "pending";
      reference: string;
      amount: number;
    }> {
      const res = await fetch(`${API_BASE}/api/v1/payments/${reference}`);
      if (!res.ok) throw new Error("Failed to verify payment");
      return res.json();
    },
  },
};
