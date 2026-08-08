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

  const increaseQuantity = (variantKey: string) => {
    setItems((items) =>
      items.map((item) =>
        item.variant.key === variantKey ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQuantity = (variantKey: string) => {
    setItems((items) =>
      items
        .map((item) =>
          item.variant.key === variantKey ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const updateQuantity = (variantKey: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(variantKey);
      return;
    }

    setItems((items) =>
      items.map((item) => (item.variant.key === variantKey ? { ...item, quantity } : item)),
    );
  };

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        addToCart,
        removeFromCart,
        closeCart: () => setIsOpen(false),
        openCart: () => setIsOpen(true),
        increaseQuantity,
        decreaseQuantity,
        updateQuantity,
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
