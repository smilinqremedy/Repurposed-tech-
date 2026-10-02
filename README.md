# REPURPOSED TECH — OLD TECH. REIMAGINED.

> **We rescue forgotten technology and give it a second life.**

[![Production Quality](https://img.shields.io/badge/Status-Production%20Ready-00FF88?style=flat-square)](https://github.com/smilinqremedy/Repurposed-tech-)
[![Next.js](https://img.shields.io/badge/Framework-Next.js%2015-white?style=flat-square)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue?style=flat-square)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS%20v4-38B2AC?style=flat-square)](https://tailwindcss.com/)

---

## 1. Brand Philosophy

**REPURPOSED TECH** is an artisanal hardware restoration atelier and premium technology brand. We collect obsolete, neglected, and vintage electronic instruments from the 1970s, 80s, 90s, and 2000s, stripping them down to bare silicon, recapping dead capacitors with modern solid tantalum equivalents, and outfitting them with laminated IPS displays, solid-state flash memory, and USB-C fast charging.

Each device is commissioned in strict, numbered limited editions (e.g. `01 / 03`, `01 / 01`), authenticated with a laser-engraved serial plate, and packaged in custom archival flight cases.

---

## 2. Key Architecture & Features

### Core Pages
- **Homepage (`/`)**: Cinematic luxury presentation featuring Drop 001, forensic Before/After interactive slider, manifesto pillars (Rescue, Restore, Reimagine), and custom build teaser.
- **Catalog & Shop (`/shop`)**: Multi-faceted filter system (Category, Availability, Era, Condition, Price range slider) with real-time text search and responsive mobile drawer.
- **Product Detail (`/product/[slug]`)**: High-res multi-view gallery, technical specifications breakdown, 6-stage forensic restoration timeline, and product-specific before/after comparison.
- **Restoration Protocol (`/restoration`)**: The comprehensive 7-stage restoration laboratory methodology (`01 SOURCE`, `02 INSPECT`, `03 DISASSEMBLE`, `04 RESTORE`, `05 UPGRADE`, `06 TEST`, `07 RELEASE`).
- **Drops System (`/drops`)**: Collectible drop releases (`DROP 001 — THE REBIRTH COLLECTION`, `DROP 002 — SIGNAL LOST`, `DROP 003 — POCKET MACHINES`) with priority pass notification modal.
- **Custom Configurator (`/build`)**: Step-by-step bespoke hardware builder (Device -> Shell -> Display -> Power -> Extras/Engraving) with live dynamic spec & Naira pricing updates.
- **Cart & Reservation Drawer (`/cart`)**: Persistent sliding cart drawer & full cart page with quantity controls and line-item customization details.
- **Secure Checkout (`/checkout`)**: Multi-step checkout with collector information, white glove shipping rates, and Paystack payment gateway integration framework.
- **Order Confirmation (`/checkout/success`)**: Live dispatch telemetry tracking, order reference codes (`RT-001`), and milestone timelines.
- **Brand Story (`/about`)**: Human, personal story of the Lagos workbench, sustainability commitment, and studio concierge contacts.
- **Admin Dashboard (`/admin`)**: Executive telemetry console tracking total sales, active orders, catalog inventory, and low-stock alerts.

---

## 3. Technology Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript (Strict typing for Products, Orders, Cart, and Build configs)
- **Styling**: Tailwind CSS v4 (Custom luxury dark palette: near-black `#080808`, `#111111`, `#181818`, `#F5F5F0`, accent green `#00FF88`, amber `#F59E0B`)
- **State Management**: React Context with LocalStorage persistence for Cart and custom builds
- **Currency**: Nigerian Naira (`₦`) formatted to localized standards
- **Backend Architecture**: Decoupled service layer (`lib/services.ts`) ready for Go REST API, PostgreSQL, and Paystack webhooks

---

## 4. Local Development

```bash
# Clone the repository
git clone https://github.com/smilinqremedy/Repurposed-tech-.git
cd Repurposed-tech-

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

---

## 5. Deployment

Ready for zero-config deployment on Vercel or modern Node.js edge platforms.

```bash
npm run build
npm start
```

---

REPURPOSED TECH © 2026 • OLD TECH. REIMAGINED.
