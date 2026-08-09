'use client';

import { type ReactNode, createContext, useContext, useEffect, useState } from 'react';

import type { CartContextType, CartItem, Product, ProductVariant } from '@/types/global';

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);

      if (storedCart) {
        setItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error('Failed to load cart:', error);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save cart:', error);
    }
  }, [items, isHydrated]);

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
