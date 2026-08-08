'use client';

import { type ReactNode, createContext, useContext, useState } from 'react';

import type { CartContextType, CartItem, Product, ProductVariant } from '@/types/global';

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  function addToCart(product: Product, variant: ProductVariant) {
    setItems((current) => {
      const existing = current.find((item) => item.variant.key === variant.key);

      if (existing) {
        return current.map((item) =>
          item.variant.key === variant.key ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [
        ...current,
        {
          product,
          variant,
          quantity: 1,
        },
      ];
    });

    setIsOpen(true);
  }

  function removeFromCart(variantKey: string) {
    setItems((current) => current.filter((item) => item.variant.key !== variantKey));
  }

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        addToCart,
        removeFromCart,
        closeCart: () => setIsOpen(false),
        openCart: () => setIsOpen(true),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }

  return context;
}
