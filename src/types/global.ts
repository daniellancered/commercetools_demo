export type Product = {
  id: string;
  key?: string;
  name: string;
  description?: string;
  slug: string;
  categories?: ProductCategory[];
  variants: ProductVariant;
  productType?: ProductType;
  attributes?: ProductAttributes;
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
}

export type ProductAttributes = {
  [key: string]: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type CartContextType = {
  items: CartItem[];
  isOpen: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  closeCart: () => void;
  openCart: () => void;
};
