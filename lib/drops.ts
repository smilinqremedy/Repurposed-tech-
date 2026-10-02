export type Drop = {
  id: string;
  number: string;
  name: string;
  tagline: string;
  status: "RELEASED" | "COMING SOON" | "ARCHIVED";
  releaseDate: string;
  pieceCount: number;
  description: string;
  curatorNote: string;
  productIds: string[];
  bannerImage: string;
  countdownDate?: string;
};

export const DROPS: Drop[] = [
  {
    id: "drop-001",
    number: "DROP 001",
    name: "THE REBIRTH COLLECTION",
    tagline: "Five forgotten machines. Five second lives.",
    status: "RELEASED",
    releaseDate: "OCTOBER 2026",
    pieceCount: 5,
    description: "Our inaugural release. We retrieved five obsolete electronic instruments across industrial salvage yards and dusty attics, stripped them down to atomic components, and rebuilt them with aerospace materials, laminated IPS screens, modern LiPo power, and audiophile-grade circuitry.",
    curatorNote: "Each piece in Drop 001 represents a milestone of consumer industrial engineering between 1974 and 2006. Once these individual editions are claimed, they will never be reproduced in this identical configuration.",
    productIds: ["rt-001", "rt-002", "rt-003", "rt-004", "rt-005"],
    bannerImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=85",
  },
  {
    id: "drop-002",
    number: "DROP 002",
    name: "SIGNAL LOST",
    tagline: "Analog radio telecommunications & cathode ray monuments.",
    status: "COMING SOON",
    releaseDate: "NOVEMBER 2026",
    pieceCount: 4,
    description: "Cold-war era shortwave radio receivers, Sony Watchman mini-CRTs converted to wireless composite monitors, and tactical avionics displays resurrected into ambient home telemetry sculptures.",
    curatorNote: "Subscribers receive 1-hour early access window with encrypted checkout passcodes.",
    productIds: [],
    bannerImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=85",
    countdownDate: "2026-11-15T18:00:00Z",
  },
  {
    id: "drop-003",
    number: "DROP 003",
    name: "POCKET MACHINES",
    tagline: "Ultra-compact personal electronics from the golden decade.",
    status: "COMING SOON",
    releaseDate: "DECEMBER 2026",
    pieceCount: 6,
    description: "Palm Pilot titanium editions with e-ink retrofit, Sony Walkman DD series with laser-machined brass flywheels, and Game Boy Pocket units with custom machined magnesium shells.",
    curatorNote: "Strict limit of one piece per collector address.",
    productIds: [],
    bannerImage: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1600&q=85",
    countdownDate: "2026-12-05T18:00:00Z",
  },
  {
    id: "drop-000",
    number: "VAULT ARCHIVE",
    name: "FOUNDATION PROTOTYPES",
    tagline: "The experimental bench pieces that founded the studio.",
    status: "ARCHIVED",
    releaseDate: "SEPTEMBER 2026",
    pieceCount: 3,
    description: "The initial engineering validation units built during studio inception, preserved in the permanent Repurposed Tech archive collection.",
    curatorNote: "Archival record only. Private viewing available upon request.",
    productIds: ["rt-006", "rt-007", "rt-008"],
    bannerImage: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=1600&q=85",
  },
];
