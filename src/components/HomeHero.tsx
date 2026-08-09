import Image from 'next/image';
import Link from 'next/link';

import Container from './Container';

export default function HomeHero() {
  return (
    <>
      <Container>
        <div className="relative z-10 flex flex-col items-start gap-8 pt-48">
          <h1 className="text-5xl leading-tight font-bold tracking-tight text-white md:text-6xl">
            Make your space
            <span className="block text-white">feel like home.</span>
          </h1>

          <p className="text-accent-3 max-w-lg text-lg leading-relaxed">
            Discover furniture and home decor designed to bring comfort, character, and timeless
            style to every room.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/products"
              className="bg-accent-3 hover:bg-accent-1 rounded-md px-7 py-3.5 font-semibold text-black shadow-sm transition-colors duration-300 hover:text-white"
            >
              Shop Now
            </Link>

            <Link
              href="/categories"
              className="rounded-md border-1 border-white px-7 py-3.5 font-semibold text-white transition-colors duration-300 hover:bg-white hover:text-black"
            >
              Explore Categories
            </Link>
          </div>
        </div>
      </Container>
      <div className="absolute inset-0 h-screen w-screen">
        <Image src="/home-hero.png" alt="furniture" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-black/50" />
      </div>
    </>
  );
}
