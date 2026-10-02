import { BaseDevice, ShellOption, DisplayOption, PowerOption, ExtraMod } from "@/types/build";

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
    id: "black",
    name: "Obsidian Black",
    colorHex: "#111111",
    priceModifier: 10000,
    material: "Matte Bead-Blasted Polymer",
  },
  {
    id: "clear",
    name: "Crystal Clear",
    colorHex: "#94A3B8",
    priceModifier: 12000,
    material: "Optical-Grade Acrylic / PC",
  },
  {
    id: "white",
    name: "Arctic White",
    colorHex: "#F5F5F0",
    priceModifier: 10000,
    material: "Ceramic-Infused Matte Shell",
  },
];

export const DISPLAYS: DisplayOption[] = [
  {
    id: "original",
    name: "Original Restored",
    priceModifier: 0,
    description: "Factory reflective LCD panel, polished and descaled. Preserves authentic outdoor daylight viewing.",
    tech: "Reflective STN (No Backlight)",
  },
  {
    id: "ips",
    name: "IPS Backlit V2",
    priceModifier: 25000,
    description: "Vibrant high-contrast IPS screen with 10-level brightness control via touch sensor.",
    tech: "IPS LCD (720x480 Scaled)",
  },
  {
    id: "premium-ips",
    name: "Premium Laminated IPS (OSD)",
    priceModifier: 40000,
    description: "Edge-to-edge optical bonded glass with zero dust gap, on-screen menu, and 5 retro scanline filter modes.",
    tech: "Laminated Full HD IPS + OSD",
  },
];

export const POWERS: PowerOption[] = [
  {
    id: "standard",
    name: "Standard Battery",
    priceModifier: 0,
    capacity: "Standard 1,000 mAh",
    batteryLife: "6-8 Hours Playtime",
  },
  {
    id: "extended",
    name: "Extended LiPo Battery",
    priceModifier: 20000,
    capacity: "High-Capacity 1,800–3,000 mAh",
    batteryLife: "16-24 Hours Continuous Playtime",
  },
];

export const EXTRAS: ExtraMod[] = [
  {
    id: "usbc",
    name: "USB-C Fast Charging Mod",
    priceModifier: 15000,
    description: "Replaces legacy charging/battery door with precision CNC USB-C port with Power Delivery safe circuitry.",
  },
  {
    id: "bluetooth",
    name: "Bluetooth 5.0 Audio Mod",
    priceModifier: 22000,
    description: "Zero-latency audio transmitter for AirPods and wireless headphones with discrete stealth pairing button.",
  },
  {
    id: "engraving",
    name: "Custom Laser Engraving",
    priceModifier: 10000,
    description: "Precision fiber-laser engraving of your name, callsign, or custom serial code on the rear metal plate.",
  },
];
