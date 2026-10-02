import { PRODUCTS } from "./products";
import { Product, FilterOptions } from "@/types/product";
import { Order } from "@/types/order";

// In-memory orders store to simulate backend storage
const ordersStore: Order[] = [
  {
    id: "ord-001",
    orderNumber: "RT-001",
    createdAt: "2026-09-28T14:32:00Z",
    customer: {
      fullName: "Adeyemi Adeleke",
      email: "adeyemi@studio-arch.ng",
      phone: "+234 803 555 0192",
      address: "14 Victoria Arobieke Street, Lekki Phase 1",
      city: "Lagos",
      state: "Lagos",
      country: "Nigeria",
    },
    items: [
      {
        id: "item-1",
        productId: "rt-001",
        name: "Game Boy Color — Atomic Purple",
        slug: "game-boy-color-atomic-purple",
        price: 145000,
        image: "https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?auto=format&fit=crop&w=600&q=80",
        edition: "01 / 03",
        quantity: 1,
        maxStock: 2,
      },
    ],
    subtotal: 145000,
    shippingMethod: "White Glove Delivery (Lagos / Abuja)",
    shippingCost: 8000,
    total: 153000,
    status: "confirmed",
    paymentMethod: "paystack",
    paymentStatus: "paid",
    trackingNumber: "RT-LG-9821034",
    estimatedDelivery: "2-3 business days",
  },
  {
    id: "ord-002",
    orderNumber: "RT-002",
    createdAt: "2026-09-30T09:15:00Z",
    customer: {
      fullName: "Chioma Nwosu",
      email: "chioma.n@creativepulse.io",
      phone: "+234 812 444 8821",
      address: "8 Kwame Nkrumah Crescent, Asokoro",
      city: "Abuja",
      state: "FCT",
      country: "Nigeria",
    },
    items: [
      {
        id: "item-2",
        productId: "rt-002",
        name: "iPod Classic — Midnight Edition",
        slug: "ipod-classic-midnight-edition",
        price: 220000,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
        edition: "01 / 02",
        quantity: 1,
        maxStock: 1,
      },
    ],
    subtotal: 220000,
    shippingMethod: "Standard Insured Courier (Nationwide)",
    shippingCost: 5000,
    total: 225000,
    status: "preparing",
    paymentMethod: "paystack",
    paymentStatus: "paid",
    trackingNumber: "RT-ABJ-1120485",
    estimatedDelivery: "3-4 business days",
  },
  {
    id: "ord-003",
    orderNumber: "RT-003",
    createdAt: "2026-10-01T17:45:00Z",
    customer: {
      fullName: "Emeka Okafor",
      email: "emeka.sound@gmail.com",
      phone: "+234 905 112 3344",
      address: "22 Circular Road, Presidential Estate",
      city: "Port Harcourt",
      state: "Rivers",
      country: "Nigeria",
    },
    items: [
      {
        id: "item-3",
        productId: "rt-004",
        name: "Mechanical Keyboard — Rebuilt 01",
        slug: "mechanical-keyboard-rebuilt-01",
        price: 295000,
        image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=600&q=80",
        edition: "01 / 01",
        quantity: 1,
        maxStock: 1,
      },
    ],
    subtotal: 295000,
    shippingMethod: "Standard Insured Courier (Nationwide)",
    shippingCost: 5000,
    total: 300000,
    status: "shipped",
    paymentMethod: "bank_transfer",
    paymentStatus: "paid",
    trackingNumber: "RT-PH-4402910",
    estimatedDelivery: "Delivered",
  },
];

/**
 * Service function: Fetch products with filtering, search, and sorting
 * Ready to be connected to Go REST API or Postgres DB
 */
export async function getProducts(options: FilterOptions = {}): Promise<Product[]> {
  // Simulate network latency if needed, or return immediate
  let result = [...PRODUCTS];

  if (options.category && options.category !== "All") {
    result = result.filter((p) => p.category.toLowerCase() === options.category?.toLowerCase());
  }

  if (options.status && options.status !== "All") {
    result = result.filter((p) => p.status === options.status);
  }

  if (options.era && options.era !== "All") {
    result = result.filter((p) => p.era === options.era);
  }

  if (options.condition && options.condition !== "All") {
    result = result.filter((p) => p.condition === options.condition);
  }

  if (options.minPrice !== undefined) {
    result = result.filter((p) => p.price >= (options.minPrice || 0));
  }

  if (options.maxPrice !== undefined) {
    result = result.filter((p) => p.price <= (options.maxPrice || Infinity));
  }

  if (options.search && options.search.trim() !== "") {
    const q = options.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.edition.toLowerCase().includes(q)
    );
  }

  if (options.sortBy) {
    switch (options.sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => (b.originalReleaseYear || 0) - (a.originalReleaseYear || 0));
        break;
      case "featured":
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }
  }

  return result;
}

/**
 * Service function: Fetch a single product by slug
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const product = PRODUCTS.find((p) => p.slug === slug);
  return product || null;
}

/**
 * Service function: Fetch product by ID
 */
export async function getProductById(id: string): Promise<Product | null> {
  const product = PRODUCTS.find((p) => p.id === id);
  return product || null;
}

/**
 * Service function: Fetch featured products
 */
export async function getFeaturedProducts(): Promise<Product[]> {
  return PRODUCTS.filter((p) => p.featured);
}

/**
 * Service function: Create an order
 */
export async function createOrder(orderData: Omit<Order, "id" | "orderNumber" | "createdAt">): Promise<Order> {
  const count = ordersStore.length + 1;
  const newOrder: Order = {
    ...orderData,
    id: `ord-${Date.now()}`,
    orderNumber: `RT-${String(count).padStart(3, "0")}`,
    createdAt: new Date().toISOString(),
  };

  ordersStore.unshift(newOrder);
  return newOrder;
}

/**
 * Service function: Get order by orderNumber or ID
 */
export async function getOrder(orderNumberOrId: string): Promise<Order | null> {
  const order = ordersStore.find(
    (o) => o.orderNumber === orderNumberOrId || o.id === orderNumberOrId
  );
  return order || ordersStore[0] || null;
}

/**
 * Service function: Fetch all orders for admin
 */
export async function getAllOrders(): Promise<Order[]> {
  return [...ordersStore];
}

/**
 * Admin metrics
 */
export async function getAdminMetrics() {
  const totalSales = ordersStore.reduce((acc, order) => acc + (order.paymentStatus === "paid" ? order.total : 0), 0);
  const totalOrders = ordersStore.length;
  const totalProducts = PRODUCTS.length;
  const lowStockCount = PRODUCTS.filter((p) => p.status === "low-stock" || (p.stock > 0 && p.stock <= 1)).length;

  return {
    totalSales,
    totalOrders,
    totalProducts,
    lowStockCount,
  };
}
