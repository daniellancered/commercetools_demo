'use client';

import { type ReactNode, createContext, useContext, useState } from 'react';

import type { CartContextType, CartItem, Product } from '@/types/global';

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  function addToCart(product: Product) {
    setItems((current) => {
      const existing = current.find((item) => item.product.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [...current, { product, quantity: 1 }];
    });

    setIsOpen(true);
  }

  function removeFromCart(productId: string) {
    setItems((current) => current.filter((item) => item.product.id !== productId));
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
