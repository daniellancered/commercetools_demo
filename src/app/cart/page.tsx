'use client';

import Image from 'next/image';
import Link from 'next/link';

import Cart from '@/components/cart/Cart';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { items, removeFromCart } = useCart();

  return <Cart items={items} removeFromCart={removeFromCart} />;
}
