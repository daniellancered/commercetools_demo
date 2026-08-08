'use client';

import { useCart } from '@/context/CartContext';
import { Product, ProductVariant } from '@/types/global';

interface AddToCartButtonProps {
  product: Product;
  variant: ProductVariant;
}

export default function AddToCartButton({ product, variant }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  return (
    <button
      type="button"
      disabled={!variant.availability.isOnStock}
      onClick={() => addToCart(product, variant)}
      className="bg-primary w-full cursor-pointer rounded-md px-6 py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
    >
      {variant.availability.isOnStock ? 'Add to cart' : 'Out of stock'}
    </button>
  );
}
