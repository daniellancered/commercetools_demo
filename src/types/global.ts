export type Product = {
  id: string;
  key?: string;
  name: string;
  description?: string;
  slug: string;
  categories?: ProductCategory[];
  mainVariant: ProductVariant;
  variants?: ProductVariant[];
  productType?: ProductType;
};

export type ProductVariant = {
  id: number;
  sku?: string;
  key?: string;
  price: string;
  images?: ProductImage[];
  availability: {
    isOnStock: boolean;
    availableQuantity: number;
  };
  attributes?: ProductAttributes;
};

export type ProductImage = {
  url: string;
  width: number;
  height: number;
};

export type ProductCategory = {
  id: string;
  key: string;
  name: string;
  slug: string;
};

export type ProductType = {
  name: string;
};

export type ProductAttributes = {
  [key: string]: string;
};

export type CartItem = {
  product: Product;
  variant: ProductVariant;
  quantity: number;
};

export type CartContextType = {
  items: CartItem[];
  isOpen: boolean;
  addToCart: (product: Product, variant: ProductVariant) => void;
  removeFromCart: (variantKey: string) => void;
  closeCart: () => void;
  openCart: () => void;
  increaseQuantity: (variantKey: string) => void;
  decreaseQuantity: (variantKey: string) => void;
  updateQuantity: (variantKey: string, quantity: number) => void;
};
