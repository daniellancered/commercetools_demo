import Image from 'next/image';
import Link from 'next/link';

import Container from './Container';

export default function HomeHero() {
  return (
    <>
      <Container>
        <div className="relative z-10 flex flex-col items-start gap-8 pt-32">
          <span className="text-sm font-semibold text-accent-1/60 uppercase">Elevate your home</span>

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
              className="bg-accent-3 rounded-md border-1 px-7 py-3.5 font-semibold text-black shadow-sm transition-colors hover:bg-black hover:text-white hover:border-black"
            >
              Shop Collection
            </Link>

            <Link
              href="/collections"
              className="rounded-md border-1 border-white px-7 py-3.5 font-semibold text-white transition-colors hover:bg-white hover:text-black"
            >
              Explore Collections
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
