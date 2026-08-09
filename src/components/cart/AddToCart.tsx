'use client';

import { ShoppingCart } from 'lucide-react';

import { useCart } from '@/context/CartContext';
import { Product, ProductVariant } from '@/types/global';

interface AddToCartButtonProps {
  product: Product;
  variant: ProductVariant;
  type: 'card' | 'full';
}

export default function AddToCartButton({ product, variant, type }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  return (
    <button
      type="button"
      disabled={!variant.availability.isOnStock}
      onClick={() => addToCart(product, variant)}
      className="bg-primary hover:bg-accent-1 w-full cursor-pointer rounded-md p-3 font-bold text-white transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {variant.availability.isOnStock ? (
        type === 'full' ? (
          <div className="flex justify-center gap-4">
            <ShoppingCart className="h-6 w-6" />
            Add to cart
          </div>
        ) : (
          <ShoppingCart className="h-6 w-6" />
        )
      ) : (
        'Out of stock'
      )}
    </button>
  );
}
