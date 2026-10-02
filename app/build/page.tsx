"use client";

import React, { useState } from "react";
import Image from "next/image";
import { DEVICES, SHELLS, DISPLAYS, POWERS, EXTRAS } from "@/lib/buildOptions";
import { formatNaira } from "@/lib/currency";
import { useCart } from "@/lib/cartContext";

export default function CustomBuildPage() {
  const [selectedDevice, setSelectedDevice] = useState(DEVICES[0]);
  const [selectedShell, setSelectedShell] = useState(SHELLS[0]);
  const [selectedDisplay, setSelectedDisplay] = useState(DISPLAYS[2]); // Default Premium IPS
  const [selectedPower, setSelectedPower] = useState(POWERS[1]); // Default Extended Battery
  const [selectedExtras, setSelectedExtras] = useState<string[]>([EXTRAS[0].id]); // Default USB-C
  const [engravingText, setEngravingText] = useState("");
  const [orderRequested, setOrderRequested] = useState(false);

  const { addItem } = useCart();

  // Calculate live total price
  const extrasTotal = selectedExtras.reduce((sum, extraId) => {
    const extra = EXTRAS.find((e) => e.id === extraId);
    return sum + (extra?.priceModifier || 0);
  }, 0);

  const totalPrice =
    selectedDevice.basePrice +
    selectedShell.priceModifier +
    selectedDisplay.priceModifier +
    selectedPower.priceModifier +
    extrasTotal;

  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleRequestBuild = () => {
    const extrasNames = selectedExtras
      .map((id) => EXTRAS.find((e) => e.id === id)?.name)
      .filter(Boolean)
      .join(", ");

    const configurationSummary = `${selectedDevice.name} • ${selectedShell.name} • ${selectedDisplay.name} • ${selectedPower.name} • Extras: [${extrasNames || "None"}]${
      engravingText ? ` • Engraving: "${engravingText}"` : ""
    }`;

    addItem({
      id: `custom-build-${Date.now()}`,
      productId: `custom-${selectedDevice.id}`,
      name: `Bespoke ${selectedDevice.name}`,
      slug: "build",
      price: totalPrice,
      image: selectedDevice.previewImage,
      edition: "1 OF 1 BESPOKE",
      configurationSummary,
      isCustomBuild: true,
      maxStock: 1,
    });

    setOrderRequested(true);
  };

  return (
    <div className="pt-28 pb-24 bg-[#080808] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* HEADER */}
        <div className="space-y-4 border-b border-white/10 pb-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00FF88]" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#00FF88]">
              COMMISSION ENGINE
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#F5F5F0]">
            BUILD YOUR MACHINE
          </h1>

          <p className="text-sm sm:text-base text-neutral-400 font-mono tracking-wide max-w-2xl">
            Select your hardware platform, optical screen technology, custom enclosure, and hardware mods. We handcraft your machine in our Lagos lab.
          </p>
        </div>

        {/* MAIN CONFIGURATOR GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT: STEP-BY-STEP CUSTOMIZER */}
          <div className="lg:col-span-7 space-y-12">
            {/* STEP 1: CHOOSE YOUR DEVICE */}
            <section className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#00FF88]">
                  01 — CHOOSE YOUR DEVICE
                </span>
                <span className="text-xs font-mono text-neutral-500">BASE PLATFORM</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {DEVICES.map((device) => {
                  const isSelected = selectedDevice.id === device.id;
                  return (
                    <button
                      key={device.id}
                      onClick={() => setSelectedDevice(device)}
                      className={`p-4 rounded-sm border text-left flex flex-col justify-between space-y-4 transition-all ${
                        isSelected
                          ? "bg-white/[0.06] border-white ring-1 ring-white"
                          : "bg-[#0E0E0E] border-white/10 hover:border-white/30"
                      }`}
                    >
                      <div className="relative aspect-[4/3] w-full rounded-sm overflow-hidden bg-black">
                        <Image
                          src={device.previewImage}
                          alt={device.name}
                          fill
                          sizes="200px"
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-[#F5F5F0]">{device.name}</h4>
                        <p className="text-[11px] text-neutral-400 line-clamp-2">{device.description}</p>
                        <span className="text-xs font-mono text-[#00FF88] block pt-1">
                          Base: {formatNaira(device.basePrice)}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* STEP 2: CHOOSE YOUR SHELL */}
            <section className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#00FF88]">
                  02 — CHOOSE YOUR SHELL
                </span>
                <span className="text-xs font-mono text-neutral-500">HOUSING & COLOR</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {SHELLS.map((shell) => {
                  const isSelected = selectedShell.id === shell.id;
                  return (
                    <button
                      key={shell.id}
                      onClick={() => setSelectedShell(shell)}
                      className={`p-4 rounded-sm border text-left space-y-3 transition-all ${
                        isSelected
                          ? "bg-white/[0.06] border-white ring-1 ring-white"
                          : "bg-[#0E0E0E] border-white/10 hover:border-white/30"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div
                          className="w-6 h-6 rounded-full border border-white/20 shadow-inner"
                          style={{ backgroundColor: shell.colorHex }}
                        />
                        {shell.badge && (
                          <span className="text-[9px] font-mono uppercase text-[#00FF88] border border-[#00FF88]/30 px-1 rounded-xs">
                            {shell.badge}
                          </span>
                        )}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">{shell.name}</h4>
                        <p className="text-[10px] font-mono text-neutral-400 mt-0.5">
                          +{formatNaira(shell.priceModifier)}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* STEP 3: CHOOSE YOUR DISPLAY */}
            <section className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#00FF88]">
                  03 — CHOOSE YOUR DISPLAY
                </span>
                <span className="text-xs font-mono text-neutral-500">OPTICAL ASSEMBLY</span>
              </div>

              <div className="space-y-3">
                {DISPLAYS.map((disp) => {
                  const isSelected = selectedDisplay.id === disp.id;
                  return (
                    <button
                      key={disp.id}
                      onClick={() => setSelectedDisplay(disp)}
                      className={`w-full p-4 rounded-sm border text-left flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                        isSelected
                          ? "bg-white/[0.06] border-white ring-1 ring-white"
                          : "bg-[#0E0E0E] border-white/10 hover:border-white/30"
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-[#F5F5F0]">{disp.name}</h4>
                          <span className="text-[10px] font-mono text-neutral-400 px-1.5 py-0.5 bg-white/5 rounded-xs">
                            {disp.tech}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-400">{disp.description}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="text-xs font-mono text-[#00FF88]">
                          {disp.priceModifier === 0 ? "Included" : `+${formatNaira(disp.priceModifier)}`}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* STEP 4: CHOOSE YOUR POWER */}
            <section className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#00FF88]">
                  04 — CHOOSE YOUR POWER
                </span>
                <span className="text-xs font-mono text-neutral-500">BATTERY & RUNTIME</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {POWERS.map((pow) => {
                  const isSelected = selectedPower.id === pow.id;
                  return (
                    <button
                      key={pow.id}
                      onClick={() => setSelectedPower(pow)}
                      className={`p-4 rounded-sm border text-left space-y-2 transition-all ${
                        isSelected
                          ? "bg-white/[0.06] border-white ring-1 ring-white"
                          : "bg-[#0E0E0E] border-white/10 hover:border-white/30"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-bold text-[#F5F5F0]">{pow.name}</h4>
                        <span className="text-xs font-mono text-[#00FF88]">
                          {pow.priceModifier === 0 ? "Standard" : `+${formatNaira(pow.priceModifier)}`}
                        </span>
                      </div>
                      <p className="text-xs font-mono text-neutral-400">{pow.capacity}</p>
                      <p className="text-[11px] text-neutral-500">{pow.batteryLife}</p>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* STEP 5: ADD EXTRAS & LASER ENGRAVING */}
            <section className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#00FF88]">
                  05 — ADD HARDWARE EXTRAS
                </span>
                <span className="text-xs font-mono text-neutral-500">MODS & CALLSIGN</span>
              </div>

              <div className="space-y-3">
                {EXTRAS.map((extra) => {
                  const isChecked = selectedExtras.includes(extra.id);
                  return (
                    <div
                      key={extra.id}
                      onClick={() => toggleExtra(extra.id)}
                      className={`p-4 rounded-sm border cursor-pointer flex items-center justify-between gap-4 transition-all ${
                        isChecked
                          ? "bg-white/[0.06] border-white/50"
                          : "bg-[#0E0E0E] border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-xs border flex items-center justify-center text-[10px] ${
                            isChecked
                              ? "bg-[#00FF88] text-black border-[#00FF88] font-bold"
                              : "border-white/20"
                          }`}
                        >
                          {isChecked && "✓"}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white">{extra.name}</h4>
                          <p className="text-[11px] text-neutral-400">{extra.description}</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-[#00FF88] flex-shrink-0">
                        +{formatNaira(extra.priceModifier)}
                      </span>
                    </div>
                  );
                })}

                {/* Laser Engraving Input */}
                {selectedExtras.includes("engraving") && (
                  <div className="p-4 bg-white/[0.02] border border-white/10 rounded-sm space-y-2 animate-in fade-in">
                    <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                      CUSTOM LASER ENGRAVING TEXT (MAX 24 CHARACTERS)
                    </label>
                    <input
                      type="text"
                      maxLength={24}
                      placeholder="e.g. ADEYEMI • 1998 EDITION"
                      value={engravingText}
                      onChange={(e) => setEngravingText(e.target.value.toUpperCase())}
                      className="w-full bg-black border border-white/20 px-3 py-2 text-xs font-mono text-white tracking-widest focus:outline-none focus:border-[#00FF88]"
                    />
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* RIGHT: LIVE SUMMARY & DYNAMIC PRICING (STICKY) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <div className="bg-[#0C0C0C] border border-white/15 rounded-sm p-6 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00FF88]" />
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#F5F5F0] font-bold">
                    YOUR BUILD SUMMARY
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#00FF88] border border-[#00FF88]/30 px-2 py-0.5 rounded-sm">
                  1 OF 1 BESPOKE
                </span>
              </div>

              {/* Live Preview Image & Dynamic Color Accent */}
              <div className="relative aspect-[16/10] w-full rounded-sm overflow-hidden bg-black border border-white/10 group">
                <Image
                  src={selectedDevice.previewImage}
                  alt={selectedDevice.name}
                  fill
                  sizes="400px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div
                  className="absolute bottom-3 left-3 flex items-center gap-2 px-2.5 py-1 rounded-sm bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-mono"
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: selectedShell.colorHex }}
                  />
                  <span className="text-white uppercase">{selectedShell.name}</span>
                </div>
              </div>

              {/* Dynamic Line-Item Spec Breakdown */}
              <div className="space-y-3 font-mono text-xs divide-y divide-white/5">
                <div className="flex justify-between pt-1 text-neutral-300">
                  <span className="text-neutral-500 uppercase">BASE HARDWARE</span>
                  <span>{selectedDevice.name}</span>
                </div>
                <div className="flex justify-between pt-2 text-neutral-300">
                  <span className="text-neutral-500 uppercase">CHASSIS HOUSING</span>
                  <span>{selectedShell.name}</span>
                </div>
                <div className="flex justify-between pt-2 text-neutral-300">
                  <span className="text-neutral-500 uppercase">DISPLAY TECH</span>
                  <span>{selectedDisplay.name}</span>
                </div>
                <div className="flex justify-between pt-2 text-neutral-300">
                  <span className="text-neutral-500 uppercase">POWER STAGE</span>
                  <span>{selectedPower.name}</span>
                </div>
                {selectedExtras.length > 0 && (
                  <div className="flex justify-between pt-2 text-neutral-300">
                    <span className="text-neutral-500 uppercase">EXTRAS</span>
                    <span className="text-right">
                      {selectedExtras.map((id) => EXTRAS.find((e) => e.id === id)?.name).join(", ")}
                    </span>
                  </div>
                )}
                {engravingText && (
                  <div className="flex justify-between pt-2 text-neutral-300">
                    <span className="text-neutral-500 uppercase">ENGRAVING</span>
                    <span className="text-[#00FF88]">"{engravingText}"</span>
                  </div>
                )}
              </div>

              {/* Total Price Calculation */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">
                    TOTAL COMMISSION PRICE
                  </span>
                  <span className="text-2xl font-mono font-bold text-[#F5F5F0]">
                    {formatNaira(totalPrice)}
                  </span>
                </div>
                <span className="text-xs font-mono text-neutral-400">
                  EST: 10-14 DAYS CRAFT
                </span>
              </div>

              {/* Primary CTA */}
              <div className="space-y-2">
                <button
                  onClick={handleRequestBuild}
                  className="w-full py-4 bg-white text-black font-mono text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#00FF88] transition-colors rounded-sm shadow-xl flex items-center justify-center gap-2"
                >
                  <span>REQUEST THIS BUILD</span>
                  <span>→</span>
                </button>

                {orderRequested && (
                  <p className="text-[11px] font-mono text-[#00FF88] text-center uppercase tracking-wider animate-in fade-in">
                    ✓ BESPOKE BUILD ADDED TO YOUR CART
                  </p>
                )}
              </div>

              <p className="text-[10px] font-mono text-neutral-500 text-center uppercase tracking-widest">
                INCLUDES CUSTOM DISPLAY STAND • 1-YEAR STUDIO WARRANTY
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
