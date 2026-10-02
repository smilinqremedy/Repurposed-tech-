"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cartContext";
import { formatNaira } from "@/lib/currency";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, subtotal, itemCount } = useCart();
  const router = useRouter();

  const estimatedShipping = items.length > 0 ? 5000 : 0;
  const grandTotal = subtotal + estimatedShipping;

  return (
    <div className="pt-28 pb-24 bg-[#080808] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-white/10 pb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00FF88]" />
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#00FF88]">
                RESERVATION VAULT
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-[#F5F5F0]">
              SHOPPING CART
            </h1>
          </div>

          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-red-400 transition-colors"
            >
              CLEAR ALL RESERVATIONS
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="py-24 text-center border border-dashed border-white/10 rounded-sm p-12 bg-[#0B0B0B] space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-neutral-400">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold uppercase text-white font-mono">
                YOUR VAULT IS EMPTY
              </h2>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto font-mono">
                No restored pieces are currently reserved. Drop 001 pieces are limited and sell out quickly.
              </p>
            </div>
            <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/shop"
                className="px-6 py-3.5 bg-white text-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#00FF88] transition-colors rounded-sm"
              >
                EXPLORE DROP 001
              </Link>
              <Link
                href="/build"
                className="px-6 py-3.5 border border-white/20 text-white font-mono text-xs uppercase tracking-widest hover:bg-white/[0.05] transition-colors rounded-sm"
              >
                CUSTOM CONFIGURATOR
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* ITEMS LIST */}
            <div className="lg:col-span-8 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-6 bg-[#0C0C0C] border border-white/10 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-24 h-24 bg-black rounded-sm overflow-hidden flex-shrink-0 border border-white/10">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-mono tracking-widest uppercase text-[#00FF88]">
                        {item.edition || (item.isCustomBuild ? "CUSTOM BUILD" : "LIMITED")}
                      </span>
                      <h3 className="text-base font-medium text-white">{item.name}</h3>
                      {item.configurationSummary && (
                        <p className="text-xs font-mono text-neutral-400 line-clamp-2 max-w-md">
                          {item.configurationSummary}
                        </p>
                      )}
                      <span className="text-sm font-mono font-medium text-white block pt-1">
                        {formatNaira(item.price)} each
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-0 border-white/5">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-white/10 rounded-sm bg-black">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 text-xs text-neutral-400 hover:text-white"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-xs font-mono text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= (item.maxStock || 10)}
                        className="px-3 py-1 text-xs text-neutral-400 hover:text-white disabled:opacity-30"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    {/* Subtotal for line item */}
                    <div className="text-right">
                      <span className="text-base font-mono font-bold text-white block">
                        {formatNaira(item.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-[10px] font-mono text-neutral-500 hover:text-red-400 uppercase tracking-widest mt-1"
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ORDER SUMMARY SIDEBAR */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
              <div className="bg-[#0C0C0C] border border-white/15 p-6 rounded-sm space-y-6 shadow-2xl">
                <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-white font-bold pb-4 border-b border-white/10">
                  ORDER SUMMARY
                </h3>

                <div className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between text-neutral-300">
                    <span className="text-neutral-500">ITEMS ({itemCount})</span>
                    <span>{formatNaira(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-neutral-300">
                    <span className="text-neutral-500">ESTIMATED SHIPPING</span>
                    <span>{formatNaira(estimatedShipping)}</span>
                  </div>
                  <div className="flex justify-between text-neutral-300">
                    <span className="text-neutral-500">TRANSIT INSURANCE</span>
                    <span className="text-[#00FF88]">COMPLIMENTARY</span>
                  </div>
                  <div className="pt-4 border-t border-white/10 flex justify-between text-sm font-bold text-white">
                    <span>ESTIMATED TOTAL</span>
                    <span className="text-[#00FF88]">{formatNaira(grandTotal)}</span>
                  </div>
                </div>

                <button
                  onClick={() => router.push("/checkout")}
                  className="w-full py-4 bg-white text-black font-mono text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#00FF88] transition-colors rounded-sm shadow-xl flex items-center justify-center gap-2"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <span>→</span>
                </button>

                <div className="pt-4 border-t border-white/5 space-y-2 text-[10px] font-mono text-neutral-500 uppercase tracking-widest text-center">
                  <p>INSURED WHITE-GLOVE PACKAGING INCLUDED</p>
                  <p>PAYSTACK SECURE ESCROW ENCRYPTION</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
