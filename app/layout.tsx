import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cartContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "repurposed tech",
    "restored retro gaming",
    "Game Boy Color Atomic Purple",
    "Wolfson DAC iPod Classic",
    "mechanical keyboards rebuilt",
    "vintage electronics restoration",
    "refurbished tech Nigeria",
    "collectible technology drops",
  ],
  authors: [{ name: "REPURPOSED TECH STUDIO" }],
  creator: "REPURPOSED TECH STUDIO",
  metadataBase: new URL("https://repurposedtech.studio"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://repurposedtech.studio",
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: "https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?auto=format&fit=crop&w=1200&q=85",
        width: 1200,
        height: 630,
        alt: "Repurposed Tech — Old Tech Reimagined",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    images: ["https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?auto=format&fit=crop&w=1200&q=85"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#080808] text-[#F5F5F0] antialiased min-h-screen flex flex-col selection:bg-white selection:text-black">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <CartDrawer />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
