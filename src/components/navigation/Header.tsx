'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ShoppingCart } from 'lucide-react';

import Container from '@/components/Container';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const pathname = usePathname();
  const { items, openCart } = useCart();

  const isCartPage = pathname === '/cart';
  const isHome = pathname === '/';
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 flex justify-center backdrop-blur-xl ${
        isHome ? 'text-white' : 'border-accent-3 text-secondary border-b'
      }`}
    >
      <Container>
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="text-3xl font-bold">
            Commercetools Demo
          </Link>

          <div className="flex gap-8">
            <nav className="text-secondary-600 hidden items-center gap-8 text-lg font-medium md:flex">
              <Link
                href="/products"
                className="hover:text-primary hover:bg-accent-1 rounded-lg p-3 transition-colors hover:text-white"
              >
                Products
              </Link>

              <Link
                href="/categories"
                className="hover:text-primary hover:bg-accent-1 rounded-lg p-3 transition-colors hover:text-white"
              >
                Categories
              </Link>
            </nav>

            <button
              type="button"
              onClick={!isCartPage ? openCart : undefined}
              className="relative cursor-pointer"
              aria-label={`Shopping cart with ${itemCount} items`}
            >
              <ShoppingCart className="h-6 w-6" />

              {itemCount > 0 && (
                <span className="bg-primary absolute top-1 -right-3 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs font-bold text-white">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
}
