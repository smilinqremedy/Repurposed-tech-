"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PRODUCTS } from "@/lib/products";
import { getAllOrders, getAdminMetrics } from "@/lib/services";
import { formatNaira } from "@/lib/currency";
import { Order } from "@/types/order";
import { Badge } from "@/components/ui/Badge";

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [metrics, setMetrics] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
    lowStockCount: 0,
  });

  useEffect(() => {
    async function loadData() {
      const ords = await getAllOrders();
      const mets = await getAdminMetrics();
      setOrders(ords);
      setMetrics(mets);
    }
    loadData();
  }, []);

  return (
    <div className="pt-28 pb-24 bg-[#060606] min-h-screen text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* TOP BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#00FF88]">
                INTERNAL STUDIO PORTAL
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
              REPURPOSED TECH — EXECUTIVE CONSOLE
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 bg-white/[0.04] border border-white/10 text-neutral-400 rounded-sm">
              LAGOS BENCH • LIVE
            </span>
            <Link
              href="/"
              className="px-3 py-1.5 bg-white text-black font-bold uppercase tracking-wider hover:bg-[#00FF88] transition-colors rounded-sm"
            >
              VIEW STOREFRONT →
            </Link>
          </div>
        </div>

        {/* 4 METRICS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-[#0C0C0C] border border-white/10 rounded-sm space-y-2">
            <span className="text-[10px] text-neutral-500 uppercase tracking-widest block">
              TOTAL SALES (PAID)
            </span>
            <div className="text-2xl font-bold text-[#00FF88]">
              {formatNaira(metrics.totalSales)}
            </div>
            <span className="text-[10px] text-neutral-400 block pt-1">
              VIA PAYSTACK GATEWAY
            </span>
          </div>

          <div className="p-6 bg-[#0C0C0C] border border-white/10 rounded-sm space-y-2">
            <span className="text-[10px] text-neutral-500 uppercase tracking-widest block">
              TOTAL ORDERS
            </span>
            <div className="text-2xl font-bold text-white">
              {metrics.totalOrders}
            </div>
            <span className="text-[10px] text-neutral-400 block pt-1">
              100% FULFILLMENT RATE
            </span>
          </div>

          <div className="p-6 bg-[#0C0C0C] border border-white/10 rounded-sm space-y-2">
            <span className="text-[10px] text-neutral-500 uppercase tracking-widest block">
              ACTIVE PRODUCTS
            </span>
            <div className="text-2xl font-bold text-white">
              {metrics.totalProducts}
            </div>
            <span className="text-[10px] text-neutral-400 block pt-1">
              DROP 001 + ARCHIVES
            </span>
          </div>

          <div className="p-6 bg-[#0C0C0C] border border-white/10 rounded-sm space-y-2">
            <span className="text-[10px] text-neutral-500 uppercase tracking-widest block">
              LOW STOCK / SOLD OUT
            </span>
            <div className="text-2xl font-bold text-[#F59E0B]">
              {metrics.lowStockCount}
            </div>
            <span className="text-[10px] text-neutral-400 block pt-1">
              LIMITED EDITIONS REMAINING
            </span>
          </div>
        </div>

        {/* RECENT ORDERS TABLE */}
        <section className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <h2 className="text-sm font-bold uppercase tracking-widest text-white">
              RECENT COMMISSIONS & ORDERS
            </h2>
            <span className="text-neutral-500 text-[10px]">REAL-TIME SYNC</span>
          </div>

          <div className="overflow-x-auto border border-white/10 rounded-sm bg-[#0B0B0B]">
            <table className="w-full text-left divide-y divide-white/5">
              <thead className="bg-[#111111] text-neutral-400 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-3.5">ORDER ID</th>
                  <th className="p-3.5">CUSTOMER</th>
                  <th className="p-3.5">ITEM COMMISSIONED</th>
                  <th className="p-3.5">TOTAL</th>
                  <th className="p-3.5">PAYMENT</th>
                  <th className="p-3.5">STATUS</th>
                  <th className="p-3.5">TRACKING</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-neutral-300">
                {orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-3.5 font-bold text-white">{ord.orderNumber}</td>
                    <td className="p-3.5">
                      <div className="text-white">{ord.customer.fullName}</div>
                      <div className="text-[10px] text-neutral-500">{ord.customer.city}, {ord.customer.country}</div>
                    </td>
                    <td className="p-3.5 max-w-xs truncate">
                      {ord.items.map((i) => i.name).join(", ")}
                    </td>
                    <td className="p-3.5 font-bold text-[#00FF88]">{formatNaira(ord.total)}</td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 bg-white/[0.05] border border-white/10 text-white rounded-xs">
                        {ord.paymentMethod.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded-xs uppercase text-[10px] ${
                        ord.status === "confirmed" ? "bg-[#00FF88]/10 text-[#00FF88] border border-[#00FF88]/30" : "bg-neutral-800 text-neutral-300"
                      }`}>
                        {ord.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-neutral-400 font-mono text-[10px]">
                      {ord.trackingNumber || "PENDING"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* INVENTORY TABLE */}
        <section className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <h2 className="text-sm font-bold uppercase tracking-widest text-white">
              CATALOG INVENTORY & EDITION STATUS
            </h2>
            <Link href="/shop" className="text-[#00FF88] hover:underline text-[11px]">
              VIEW IN STOREFRONT →
            </Link>
          </div>

          <div className="overflow-x-auto border border-white/10 rounded-sm bg-[#0B0B0B]">
            <table className="w-full text-left divide-y divide-white/5">
              <thead className="bg-[#111111] text-neutral-400 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-3.5">MACHINE NAME</th>
                  <th className="p-3.5">CATEGORY</th>
                  <th className="p-3.5">EDITION</th>
                  <th className="p-3.5">PRICE</th>
                  <th className="p-3.5">STOCK</th>
                  <th className="p-3.5">STATUS</th>
                  <th className="p-3.5">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-neutral-300">
                {PRODUCTS.map((prod) => (
                  <tr key={prod.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-3.5 font-bold text-white">{prod.name}</td>
                    <td className="p-3.5 text-neutral-400">{prod.category}</td>
                    <td className="p-3.5 text-[#00FF88]">{prod.edition}</td>
                    <td className="p-3.5 text-white">{formatNaira(prod.price)}</td>
                    <td className="p-3.5">{prod.stock} units</td>
                    <td className="p-3.5">
                      <Badge variant={prod.status}>
                        {prod.status.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="p-3.5">
                      <Link
                        href={`/product/${prod.slug}`}
                        className="text-[#00FF88] hover:underline"
                      >
                        VIEW PIECE →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
