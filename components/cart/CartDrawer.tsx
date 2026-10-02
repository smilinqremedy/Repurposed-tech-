"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cartContext";
import { formatNaira } from "@/lib/currency";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, itemCount } = useCart();
  const router = useRouter();

  // Lock background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={closeCart}
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-[#0C0C0C] border-l border-white/10 flex flex-col justify-between shadow-2xl z-10">
        {/* Top Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#00FF88]" />
            <h3 className="text-sm font-bold tracking-[0.2em] uppercase font-mono text-[#F5F5F0]">
              YOUR RESERVATIONS ({itemCount})
            </h3>
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="p-1.5 -mr-1.5 text-neutral-400 hover:text-white rounded-sm hover:bg-white/5 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-neutral-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <p className="text-sm font-mono text-neutral-400">NO MACHINES IN YOUR VAULT</p>
              <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                Each restored piece is handcrafted in limited quantities. Claim your machine before the drop sells out.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    closeCart();
                    router.push("/shop");
                  }}
                  className="px-5 py-2.5 bg-white text-black font-mono text-xs uppercase tracking-widest font-semibold hover:bg-[#00FF88] transition-colors"
                >
                  EXPLORE DROP 001
                </button>
              </div>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-white/[0.02] border border-white/10 rounded-sm space-y-3 relative group"
              >
                <div className="flex gap-4">
                  {/* Thumbnail */}
                  <div className="relative w-20 h-20 bg-black rounded-sm overflow-hidden flex-shrink-0 border border-white/10">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono tracking-widest text-[#00FF88] uppercase">
                        {item.edition || (item.isCustomBuild ? "CUSTOM BUILD" : "LIMITED")}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-neutral-500 hover:text-red-400 text-xs font-mono transition-colors"
                        aria-label="Remove item"
                      >
                        REMOVE
                      </button>
                    </div>

                    <h4 className="text-sm font-medium text-[#F5F5F0] truncate mt-0.5">
                      {item.name}
                    </h4>

                    {item.configurationSummary && (
                      <p className="text-[11px] font-mono text-neutral-400 truncate mt-0.5">
                        {item.configurationSummary}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-white/10 rounded-sm bg-black/40">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-neutral-400 hover:text-white"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 text-xs font-mono text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= (item.maxStock || 10)}
                          className="px-2 py-0.5 text-xs text-neutral-400 hover:text-white disabled:opacity-30"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <span className="text-sm font-mono font-medium text-[#F5F5F0]">
                        {formatNaira(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout CTA */}
        {items.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-[#0E0E0E] space-y-4">
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between text-neutral-400">
                <span>SUBTOTAL</span>
                <span className="text-white font-medium">{formatNaira(subtotal)}</span>
              </div>
              <div className="flex justify-between text-neutral-500">
                <span>SHIPPING</span>
                <span>CALCULATED AT CHECKOUT</span>
              </div>
              <div className="pt-2 border-t border-white/5 flex justify-between text-sm font-bold text-[#F5F5F0]">
                <span>TOTAL</span>
                <span className="text-[#00FF88]">{formatNaira(subtotal)}</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  closeCart();
                  router.push("/checkout");
                }}
                className="w-full py-3.5 bg-white text-black font-mono text-xs uppercase tracking-widest font-bold hover:bg-[#00FF88] transition-colors rounded-sm flex items-center justify-center gap-2"
              >
                PROCEED TO CHECKOUT →
              </button>

              <Link
                href="/cart"
                onClick={closeCart}
                className="block text-center text-[11px] font-mono tracking-widest uppercase text-neutral-400 hover:text-white py-1"
              >
                VIEW DETAILED CART
              </Link>
            </div>

            <p className="text-[10px] font-mono text-center text-neutral-500">
              SECURE PAYSTACK INTEGRATION • INSURED NATIONWIDE DISPATCH
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
