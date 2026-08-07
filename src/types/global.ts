export type Product = {
  id: string;
  key?: string;
  name: string;
  description?: string;
  slug: string;
  categories?: ProductCategory[];
  variants: ProductVariant;
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
