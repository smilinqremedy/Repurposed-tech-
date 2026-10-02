export type CartItem = {
  id: string; // unique item id (composite or uuid)
  productId: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  edition?: string;
  configurationSummary?: string;
  isCustomBuild?: boolean;
  quantity: number;
  maxStock: number;
};

export type CartContextType = {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  itemCount: number;
};
