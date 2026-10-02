export type Product = {
  id: string;
  name: string;
  slug: string;
  category: "Retro Gaming" | "Music" | "Cameras" | "Keyboards" | "Tech Art" | "Custom Builds";
  shortDescription: string;
  description: string;
  price: number;
  originalReleaseYear?: number;
  images: string[];
  status: "available" | "low-stock" | "sold-out";
  stock: number;
  edition: string; // e.g. "01 / 03"
  era: "80s" | "90s" | "00s" | "Vintage";
  condition: "Restored Mint" | "Pristine Upgraded" | "Masterpiece 1-of-1" | "Collector Edition";
  featured?: boolean;
  dropId?: string;
  dropName?: string;
  highlightTag?: string;
  beforeImage?: string;
  afterImage?: string;
  storyQuote?: string;
  specifications: {
    label: string;
    value: string;
  }[];
  restorationStages: {
    stage: "FOUND" | "DISASSEMBLED" | "RESTORED" | "UPGRADED" | "TESTED" | "REBORN";
    title: string;
    description: string;
    image: string;
  }[];
};

export type FilterOptions = {
  category?: string;
  status?: string;
  era?: string;
  condition?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "featured" | "newest" | "price-asc" | "price-desc";
  search?: string;
};
