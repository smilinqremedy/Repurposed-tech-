"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  DEVICES,
  SHELLS,
  DISPLAYS,
  POWERS,
  BUTTONS,
  AUDIOS,
  EXTRAS,
} from "@/lib/buildOptions";
import { formatNaira } from "@/lib/currency";
import { useCart } from "@/lib/cartContext";

export default function CustomBuildPage() {
  const [selectedDevice, setSelectedDevice] = useState(DEVICES[0]);
  const [selectedShell, setSelectedShell] = useState(SHELLS[0]);
  const [selectedDisplay, setSelectedDisplay] = useState(DISPLAYS[1]); // Default IPS
  const [selectedPower, setSelectedPower] = useState(POWERS[2]); // Default USB-C rechargeable
  const [selectedButton, setSelectedButton] = useState(BUTTONS[0]); // Default Classic OEM
  const [selectedAudio, setSelectedAudio] = useState(AUDIOS[1]); // Default Upgraded CleanAmp
  const [selectedExtras, setSelectedExtras] = useState<string[]>([EXTRAS[0].id]); // Default Laser engraving
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
    selectedButton.priceModifier +
    selectedAudio.priceModifier +
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

    const configurationSummary = `${selectedDevice.name} • Shell: ${selectedShell.name} • Display: ${selectedDisplay.name} • Power: ${selectedPower.name} • Buttons: ${selectedButton.name} • Audio: ${selectedAudio.name} • Extras: [${extrasNames || "None"}]${
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
            BUILD YOUR OWN.
          </h1>

          <p className="text-sm sm:text-base text-neutral-400 font-mono tracking-wide max-w-2xl">
            Configure a bespoke restoration at our Lagos lab. Select your base platform, shell, display, battery architecture, tactile buttons, and acoustic mods.
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
                  01 — DEVICE PLATFORM
                </span>
                <span className="text-xs font-mono text-neutral-500">BASE HARDWARE</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {DEVICES.map((device) => {
                  const isSelected = selectedDevice.id === device.id;
                  return (
                    <button
                      type="button"
                      key={device.id}
                      onClick={() => setSelectedDevice(device)}
                      className={`p-4 rounded-sm border text-left transition-all ${
                        isSelected
                          ? "bg-white/[0.06] border-white ring-1 ring-white"
                          : "bg-[#0E0E0E] border-white/10 hover:border-white/25"
                      }`}
                    >
                      <div className="relative aspect-square w-full rounded-sm overflow-hidden mb-3 bg-black">
                        <Image
                          src={device.previewImage}
                          alt={device.name}
                          fill
                          sizes="200px"
                          className="object-cover"
                        />
                      </div>
                      <h3 className="text-xs font-bold text-white uppercase">{device.name}</h3>
                      <p className="text-[11px] font-mono text-[#00FF88] mt-1 font-bold">
                        {formatNaira(device.basePrice)}
                      </p>
                      <p className="text-[10px] text-neutral-500 mt-1 line-clamp-2">
                        {device.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* STEP 2: SHELL HOUSING */}
            <section className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#00FF88]">
                  02 — SHELL CASING
                </span>
                <span className="text-xs font-mono text-neutral-500">OPTICAL & TEXTURE</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {SHELLS.map((shell) => {
                  const isSelected = selectedShell.id === shell.id;
                  return (
                    <button
                      type="button"
                      key={shell.id}
                      onClick={() => setSelectedShell(shell)}
                      className={`p-3.5 rounded-sm border text-left transition-all relative ${
                        isSelected
                          ? "bg-white/[0.06] border-white ring-1 ring-white"
                          : "bg-[#0E0E0E] border-white/10 hover:border-white/25"
                      }`}
                    >
                      {shell.badge && (
                        <span className="absolute top-2 right-2 text-[9px] font-mono text-[#00FF88] bg-[#00FF88]/10 px-1.5 py-0.5 rounded-sm">
                          {shell.badge}
                        </span>
                      )}
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-white/20"
                          style={{ backgroundColor: shell.colorHex }}
                        />
                        <h4 className="text-xs font-bold text-white uppercase">{shell.name}</h4>
                      </div>
                      <p className="text-[11px] font-mono text-[#00FF88]">
                        +{formatNaira(shell.priceModifier)}
                      </p>
                      <p className="text-[10px] text-neutral-500 mt-1">{shell.material}</p>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* STEP 3: DISPLAY UPGRADE */}
            <section className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#00FF88]">
                  03 — SCREEN ARCHITECTURE
                </span>
                <span className="text-xs font-mono text-neutral-500">OPTICAL DISPLAY</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {DISPLAYS.map((disp) => {
                  const isSelected = selectedDisplay.id === disp.id;
                  return (
                    <button
                      type="button"
                      key={disp.id}
                      onClick={() => setSelectedDisplay(disp)}
                      className={`p-4 rounded-sm border text-left transition-all ${
                        isSelected
                          ? "bg-white/[0.06] border-white ring-1 ring-white"
                          : "bg-[#0E0E0E] border-white/10 hover:border-white/25"
                      }`}
                    >
                      <h4 className="text-xs font-bold text-white uppercase">{disp.name}</h4>
                      <p className="text-[11px] font-mono text-[#00FF88] my-1 font-bold">
                        {disp.priceModifier === 0 ? "INCLUDED" : `+${formatNaira(disp.priceModifier)}`}
                      </p>
                      <p className="text-[10px] text-neutral-400">{disp.description}</p>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* STEP 4: BATTERY & POWER */}
            <section className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#00FF88]">
                  04 — BATTERY & CHARGING
                </span>
                <span className="text-xs font-mono text-neutral-500">POWER DELIVERY</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {POWERS.map((pow) => {
                  const isSelected = selectedPower.id === pow.id;
                  return (
                    <button
                      type="button"
                      key={pow.id}
                      onClick={() => setSelectedPower(pow)}
                      className={`p-4 rounded-sm border text-left transition-all ${
                        isSelected
                          ? "bg-white/[0.06] border-white ring-1 ring-white"
                          : "bg-[#0E0E0E] border-white/10 hover:border-white/25"
                      }`}
                    >
                      <h4 className="text-xs font-bold text-white uppercase">{pow.name}</h4>
                      <p className="text-[11px] font-mono text-[#00FF88] my-1 font-bold">
                        {pow.priceModifier === 0 ? "INCLUDED" : `+${formatNaira(pow.priceModifier)}`}
                      </p>
                      <p className="text-[10px] text-neutral-400">{pow.capacity}</p>
                      <p className="text-[10px] text-neutral-500">{pow.batteryLife}</p>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* STEP 5: TACTILE BUTTONS */}
            <section className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#00FF88]">
                  05 — TACTILE BUTTONS
                </span>
                <span className="text-xs font-mono text-neutral-500">SWITCH ACTUATION</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {BUTTONS.map((btn) => {
                  const isSelected = selectedButton.id === btn.id;
                  return (
                    <button
                      type="button"
                      key={btn.id}
                      onClick={() => setSelectedButton(btn)}
                      className={`p-3.5 rounded-sm border text-left transition-all ${
                        isSelected
                          ? "bg-white/[0.06] border-white ring-1 ring-white"
                          : "bg-[#0E0E0E] border-white/10 hover:border-white/25"
                      }`}
                    >
                      <h4 className="text-xs font-bold text-white uppercase">{btn.name}</h4>
                      <p className="text-[11px] font-mono text-[#00FF88] my-1 font-bold">
                        {btn.priceModifier === 0 ? "INCLUDED" : `+${formatNaira(btn.priceModifier)}`}
                      </p>
                      <p className="text-[10px] text-neutral-500">{btn.description}</p>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* STEP 6: AUDIO CIRCUITRY */}
            <section className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#00FF88]">
                  06 — ACOUSTIC OVERHAUL
                </span>
                <span className="text-xs font-mono text-neutral-500">SPEAKER & AMP</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {AUDIOS.map((aud) => {
                  const isSelected = selectedAudio.id === aud.id;
                  return (
                    <button
                      type="button"
                      key={aud.id}
                      onClick={() => setSelectedAudio(aud)}
                      className={`p-4 rounded-sm border text-left transition-all ${
                        isSelected
                          ? "bg-white/[0.06] border-white ring-1 ring-white"
                          : "bg-[#0E0E0E] border-white/10 hover:border-white/25"
                      }`}
                    >
                      <h4 className="text-xs font-bold text-white uppercase">{aud.name}</h4>
                      <p className="text-[11px] font-mono text-[#00FF88] my-1 font-bold">
                        {aud.priceModifier === 0 ? "INCLUDED" : `+${formatNaira(aud.priceModifier)}`}
                      </p>
                      <p className="text-[10px] text-neutral-400">{aud.description}</p>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* STEP 7: EXTRAS & ENGRAVING */}
            <section className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#00FF88]">
                  07 — EXTRAS & PRESENTATION
                </span>
                <span className="text-xs font-mono text-neutral-500">BESPOKE FINISHING</span>
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
                    YOUR BUILD
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

              {/* Dynamic Line-Item Spec Breakdown matching Master Prompt Section 17 */}
              <div className="space-y-3 font-mono text-xs divide-y divide-white/5">
                <div className="flex justify-between pt-1 text-neutral-300">
                  <span className="text-neutral-500 uppercase">Base Device</span>
                  <span className="text-white">{formatNaira(selectedDevice.basePrice)}</span>
                </div>
                <div className="flex justify-between pt-2 text-neutral-300">
                  <span className="text-neutral-500 uppercase">Shell ({selectedShell.name})</span>
                  <span className="text-white">
                    {selectedShell.priceModifier === 0 ? "INCLUDED" : formatNaira(selectedShell.priceModifier)}
                  </span>
                </div>
                <div className="flex justify-between pt-2 text-neutral-300">
                  <span className="text-neutral-500 uppercase">Screen ({selectedDisplay.name})</span>
                  <span className="text-white">
                    {selectedDisplay.priceModifier === 0 ? "INCLUDED" : formatNaira(selectedDisplay.priceModifier)}
                  </span>
                </div>
                <div className="flex justify-between pt-2 text-neutral-300">
                  <span className="text-neutral-500 uppercase">Battery ({selectedPower.name})</span>
                  <span className="text-white">
                    {selectedPower.priceModifier === 0 ? "INCLUDED" : formatNaira(selectedPower.priceModifier)}
                  </span>
                </div>
                <div className="flex justify-between pt-2 text-neutral-300">
                  <span className="text-neutral-500 uppercase">Buttons ({selectedButton.name})</span>
                  <span className="text-white">
                    {selectedButton.priceModifier === 0 ? "INCLUDED" : formatNaira(selectedButton.priceModifier)}
                  </span>
                </div>
                <div className="flex justify-between pt-2 text-neutral-300">
                  <span className="text-neutral-500 uppercase">Audio ({selectedAudio.name})</span>
                  <span className="text-white">
                    {selectedAudio.priceModifier === 0 ? "INCLUDED" : formatNaira(selectedAudio.priceModifier)}
                  </span>
                </div>
                {selectedExtras.length > 0 && (
                  <div className="flex justify-between pt-2 text-neutral-300">
                    <span className="text-neutral-500 uppercase">Extras</span>
                    <span className="text-white">{formatNaira(extrasTotal)}</span>
                  </div>
                )}
                {engravingText && (
                  <div className="flex justify-between pt-2 text-neutral-300">
                    <span className="text-neutral-500 uppercase">Engraving</span>
                    <span className="text-[#00FF88]">"{engravingText}"</span>
                  </div>
                )}
              </div>

              {/* Total Price Calculation */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">
                    TOTAL
                  </span>
                  <span className="text-2xl font-mono font-bold text-[#00FF88]">
                    {formatNaira(totalPrice)}
                  </span>
                </div>
                <span className="text-xs font-mono text-neutral-400">
                  EST: 10-14 DAYS CRAFT
                </span>
              </div>

              {/* Primary CTA matching Master Prompt Section 17 */}
              <div className="space-y-2">
                <button
                  type="button"
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
