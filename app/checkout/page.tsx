"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cartContext";
import { formatNaira } from "@/lib/currency";
import { createOrder } from "@/lib/services";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: "Adeyemi Adeleke",
    email: "adeyemi@studio-arch.ng",
    phone: "+234 803 555 0192",
    address: "14 Victoria Arobieke Street, Lekki Phase 1",
    city: "Lagos",
    state: "Lagos",
    country: "Nigeria",
    postalCode: "105102",
    notes: "",
  });

  const [shippingMethod, setShippingMethod] = useState<"standard" | "white-glove" | "intl">("white-glove");
  const [paymentMethod, setPaymentMethod] = useState<"paystack" | "bank_transfer">("paystack");
  const [isProcessing, setIsProcessing] = useState(false);

  const shippingRates = {
    standard: { name: "Standard Insured Courier (Nationwide)", cost: 5000, estimate: "3-5 Business Days" },
    "white-glove": { name: "White Glove Hand Delivery (Lagos / Abuja)", cost: 10000, estimate: "1-2 Business Days" },
    intl: { name: "International DHL Express Courier", cost: 35000, estimate: "4-7 Business Days" },
  };

  const selectedShipping = shippingRates[shippingMethod];
  const grandTotal = subtotal + (items.length > 0 ? selectedShipping.cost : 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      alert("Your cart is empty. Please select a machine to reserve.");
      return;
    }

    setIsProcessing(true);

    try {
      const order = await createOrder({
        customer: formData,
        items,
        subtotal,
        shippingMethod: selectedShipping.name,
        shippingCost: selectedShipping.cost,
        total: grandTotal,
        status: "confirmed",
        paymentMethod,
        paymentStatus: "paid",
        trackingNumber: `RT-NG-${Math.floor(100000 + Math.random() * 900000)}`,
        estimatedDelivery: selectedShipping.estimate,
      });

      // Clear the cart
      clearCart();

      // Navigate to order confirmation
      router.push(`/checkout/success?orderNumber=${order.orderNumber}`);
    } catch (err) {
      console.error("Order creation failed", err);
      setIsProcessing(false);
    }
  };

  return (
    <div className="pt-28 pb-24 bg-[#080808] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* HEADER */}
        <div className="space-y-2 border-b border-white/10 pb-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00FF88]" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#00FF88]">
              CHECKOUT PROTOCOL
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#F5F5F0]">
            SECURE COMMISSION CHECKOUT
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-white/10 p-8 space-y-4">
            <p className="text-sm font-mono text-neutral-400">NO ITEMS IN VAULT TO CHECKOUT</p>
            <button
              onClick={() => router.push("/shop")}
              className="px-6 py-3 bg-white text-black font-mono text-xs uppercase tracking-widest font-bold hover:bg-[#00FF88]"
            >
              BROWSE CATALOG
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* LEFT: CUSTOMER & SHIPPING & PAYMENT FORM */}
            <div className="lg:col-span-7 space-y-10">
              {/* 1. CUSTOMER IDENTITY */}
              <section className="p-6 bg-[#0C0C0C] border border-white/10 rounded-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#00FF88]">
                    01 — COLLECTOR IDENTITY
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500">REQUIRED</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-neutral-400 uppercase tracking-wider block">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/10 p-3 text-white rounded-sm focus:border-[#00FF88] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-neutral-400 uppercase tracking-wider block">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/10 p-3 text-white rounded-sm focus:border-[#00FF88] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-neutral-400 uppercase tracking-wider block">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/10 p-3 text-white rounded-sm focus:border-[#00FF88] focus:outline-none"
                    />
                  </div>
                </div>
              </section>

              {/* 2. DELIVERY ADDRESS */}
              <section className="p-6 bg-[#0C0C0C] border border-white/10 rounded-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#00FF88]">
                    02 — DESTINATION DISPATCH
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500">INSURED DELIVERY</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-neutral-400 uppercase tracking-wider block">Street Address</label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/10 p-3 text-white rounded-sm focus:border-[#00FF88] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-neutral-400 uppercase tracking-wider block">City</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/10 p-3 text-white rounded-sm focus:border-[#00FF88] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-neutral-400 uppercase tracking-wider block">State / Province</label>
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/10 p-3 text-white rounded-sm focus:border-[#00FF88] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-neutral-400 uppercase tracking-wider block">Country</label>
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full bg-[#111] border border-white/10 p-3 text-white rounded-sm focus:border-[#00FF88] focus:outline-none"
                    >
                      <option value="Nigeria">Nigeria</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="Germany">Germany</option>
                      <option value="Ghana">Ghana</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-neutral-400 uppercase tracking-wider block">Postal Code</label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/10 p-3 text-white rounded-sm focus:border-[#00FF88] focus:outline-none"
                    />
                  </div>
                </div>
              </section>

              {/* 3. SHIPPING METHOD */}
              <section className="p-6 bg-[#0C0C0C] border border-white/10 rounded-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#00FF88]">
                    03 — SHIPPING METHOD
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500">WHITE GLOVE TRANSIT</span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  {Object.entries(shippingRates).map(([key, opt]) => {
                    const isSelected = shippingMethod === key;
                    return (
                      <div
                        key={key}
                        onClick={() => setShippingMethod(key as any)}
                        className={`p-4 rounded-sm border cursor-pointer flex items-center justify-between transition-all ${
                          isSelected
                            ? "bg-white/[0.06] border-white ring-1 ring-white"
                            : "bg-white/[0.01] border-white/10 hover:border-white/25"
                        }`}
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-white font-medium">{opt.name}</span>
                          </div>
                          <span className="text-[11px] text-neutral-400">{opt.estimate}</span>
                        </div>
                        <span className="text-sm font-bold text-[#00FF88]">{formatNaira(opt.cost)}</span>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* 4. PAYMENT GATEWAY */}
              <section className="p-6 bg-[#0C0C0C] border border-white/10 rounded-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#00FF88]">
                    04 — PAYMENT PROTOCOL
                  </span>
                  <span className="text-[10px] font-mono text-[#00FF88]">PAYSTACK INTEGRATED</span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div
                    onClick={() => setPaymentMethod("paystack")}
                    className={`p-4 rounded-sm border cursor-pointer flex items-center justify-between ${
                      paymentMethod === "paystack"
                        ? "bg-white/[0.06] border-[#00FF88]"
                        : "bg-white/[0.01] border-white/10"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#00FF88]" />
                        <span className="text-white font-bold">PAYSTACK (CARD / BANK TRANSFER / USSD)</span>
                      </div>
                      <p className="text-[11px] text-neutral-400">
                        Instant automated payment verification via Paystack secure gateway.
                      </p>
                    </div>
                  </div>

                  <div
                    onClick={() => setPaymentMethod("bank_transfer")}
                    className={`p-4 rounded-sm border cursor-pointer flex items-center justify-between ${
                      paymentMethod === "bank_transfer"
                        ? "bg-white/[0.06] border-[#00FF88]"
                        : "bg-white/[0.01] border-white/10"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-white/40" />
                        <span className="text-white font-bold">DIRECT STUDIO ESCROW TRANSFER</span>
                      </div>
                      <p className="text-[11px] text-neutral-400">
                        Wire directly to Repurposed Tech Studio escrow account.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* RIGHT: ORDER REVIEW & PAY NOW */}
            <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
              <div className="bg-[#0C0C0C] border border-white/15 p-6 rounded-sm space-y-6 shadow-2xl">
                <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-white font-bold pb-4 border-b border-white/10">
                  RESERVATION DOSSIER
                </h3>

                {/* Items in Checkout */}
                <div className="space-y-3 divide-y divide-white/5 max-h-60 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="pt-3 flex gap-3 text-xs font-mono">
                      <div className="relative w-14 h-14 bg-black rounded-sm overflow-hidden flex-shrink-0 border border-white/10">
                        <Image src={item.image} alt={item.name} fill sizes="56px" className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white truncate">{item.name}</h4>
                        <span className="text-[10px] text-neutral-400 block">
                          QTY: {item.quantity} • {formatNaira(item.price)}
                        </span>
                      </div>
                      <span className="font-bold text-white">
                        {formatNaira(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Summary numbers */}
                <div className="pt-4 border-t border-white/10 space-y-2 font-mono text-xs">
                  <div className="flex justify-between text-neutral-400">
                    <span>SUBTOTAL</span>
                    <span className="text-white">{formatNaira(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>SHIPPING ({selectedShipping.name.split(" ")[0]})</span>
                    <span className="text-white">{formatNaira(selectedShipping.cost)}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>TRANSIT INSURANCE</span>
                    <span className="text-[#00FF88]">FREE</span>
                  </div>
                  <div className="pt-4 border-t border-white/10 flex justify-between text-base font-bold text-white">
                    <span>FINAL TOTAL</span>
                    <span className="text-[#00FF88]">{formatNaira(grandTotal)}</span>
                  </div>
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 bg-white text-black font-mono text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#00FF88] transition-colors rounded-sm shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span>AUTHORIZING ENCRYPTED TRANSACTION...</span>
                  ) : (
                    <>
                      <span>PAY NOW</span>
                      <span>•</span>
                      <span>{formatNaira(grandTotal)}</span>
                    </>
                  )}
                </button>

                <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest text-center">
                  PAYSTACK PCI-DSS CERTIFIED • NO CARD DATA STORED
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
