import {
  BaseDevice,
  ShellOption,
  DisplayOption,
  PowerOption,
  ButtonOption,
  AudioOption,
  ExtraMod,
} from "@/types/build";

export const DEVICES: BaseDevice[] = [
  {
    id: "gbc",
    name: "Game Boy Color",
    basePrice: 85000,
    description: "The 1998 icon. Reconditioned motherboard with tantalum capacitors and ultrasonic-cleaned gold contact pads.",
    year: 1998,
    previewImage: "https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "gba",
    name: "Game Boy Advance",
    basePrice: 95000,
    description: "The horizontal ergonomic masterpiece. Hand-tuned tactile microswitches and recapped power rail.",
    year: 2001,
    previewImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "ipod",
    name: "iPod Classic",
    basePrice: 120000,
    description: "The legendary 5.5th Gen Wolfson DAC chassis. Converted to silent solid-state flash storage with zero moving parts.",
    year: 2006,
    previewImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
  },
];

export const SHELLS: ShellOption[] = [
  {
    id: "atomic-purple",
    name: "Atomic Purple",
    colorHex: "#7E3AF2",
    priceModifier: 15000,
    material: "Translucent Polycarbonate (UV Stabilized)",
    badge: "Fan Favorite",
  },
  {
    id: "clear",
    name: "Crystal Clear",
    colorHex: "#94A3B8",
    priceModifier: 12000,
    material: "Optical-Grade Acrylic / PC",
  },
  {
    id: "black",
    name: "Black",
    colorHex: "#111111",
    priceModifier: 10000,
    material: "Matte Bead-Blasted Polymer",
  },
  {
    id: "white",
    name: "White",
    colorHex: "#F5F5F0",
    priceModifier: 10000,
    material: "Ceramic-Infused Matte Shell",
  },
  {
    id: "custom",
    name: "Custom Bespoke Finish",
    colorHex: "#00FF88",
    priceModifier: 25000,
    material: "Custom Airbrushed / Hydro-dipped / Anodized",
    badge: "Bespoke",
  },
];

export const DISPLAYS: DisplayOption[] = [
  {
    id: "original",
    name: "Original",
    priceModifier: 0,
    description: "Factory reflective LCD panel, polished and descaled. Preserves authentic outdoor daylight viewing.",
    tech: "Reflective STN (No Backlight)",
  },
  {
    id: "ips",
    name: "IPS",
    priceModifier: 25000,
    description: "Vibrant high-contrast IPS screen with 10-level brightness control via touch sensor.",
    tech: "IPS LCD (720x480 Scaled)",
  },
  {
    id: "premium-ips",
    name: "Premium IPS",
    priceModifier: 40000,
    description: "Edge-to-edge optical bonded glass with zero dust gap, on-screen menu, and 5 retro scanline filter modes.",
    tech: "Laminated Full HD IPS + OSD",
  },
];

export const POWERS: PowerOption[] = [
  {
    id: "original",
    name: "Original Battery Chamber",
    priceModifier: 0,
    capacity: "Standard Battery Contacts",
    batteryLife: "Authentic AA Battery Operation",
  },
  {
    id: "rechargeable",
    name: "Rechargeable LiPo",
    priceModifier: 18000,
    capacity: "1,400 mAh LiPo Cell",
    batteryLife: "10-14 Hours Playtime",
  },
  {
    id: "usbc-rechargeable",
    name: "USB-C Rechargeable",
    priceModifier: 28000,
    capacity: "High-Capacity 1,800 mAh LiPo + USB-C Port",
    batteryLife: "16-24 Hours Playtime + Fast Charging",
  },
];

export const BUTTONS: ButtonOption[] = [
  {
    id: "classic",
    name: "Classic OEM Style",
    priceModifier: 0,
    description: "Factory color-matched tactile silicone buttons.",
  },
  {
    id: "black",
    name: "Stealth Black",
    priceModifier: 6000,
    description: "Matte black tactile buttons with micro-textured surface.",
  },
  {
    id: "white",
    name: "Ceramic White",
    priceModifier: 6000,
    description: "High-gloss ceramic white buttons with smooth travel.",
  },
  {
    id: "custom",
    name: "Custom Machined Brass / Aluminum",
    priceModifier: 15000,
    description: "CNC lathe-machined solid brass or anodized aluminum tactile buttons.",
  },
];

export const AUDIOS: AudioOption[] = [
  {
    id: "original",
    name: "Original Restored Audio",
    priceModifier: 0,
    description: "Ultrasonically cleaned OEM speaker with descaled potentiometer.",
  },
  {
    id: "upgraded",
    name: "Upgraded CleanAmp Pro",
    priceModifier: 16000,
    description: "2W Class-D amplifier with Japanese ceramic speaker and zero-hum ground filter.",
  },
];

export const EXTRAS: ExtraMod[] = [
  {
    id: "engraving",
    name: "Custom Laser Engraving",
    priceModifier: 10000,
    description: "Precision fiber-laser engraving of your name, callsign, or custom serial code on the rear metal plate.",
  },
  {
    id: "display-case",
    name: "Acrylic Display Case",
    priceModifier: 14000,
    description: "Museum-grade UV-filtering magnetic acrylic stand and dust cover.",
  },
  {
    id: "gift-packaging",
    name: "Bespoke Gift Packaging",
    priceModifier: 8000,
    description: "Hard-shell matte black collector presentation box with velvet lining and wax seal.",
  },
];
