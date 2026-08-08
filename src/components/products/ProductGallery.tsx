'use client';

import { useState } from 'react';

import Image from 'next/image';

type ProductImage = {
  url: string;
  width: number;
  height: number;
};

export default function ProductGallery({
  images,
  productName,
}: {
  images?: ProductImage[];
  productName: string;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images?.length) {
    return (
      <div className="relative aspect-square overflow-hidden rounded-xl border">
        <Image src="/placeholder.webp" alt={productName} fill className="object-contain p-8" />
      </div>
    );
  }

  const selectedImage = images[selectedIndex];

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square overflow-hidden rounded-xl border">
        <Image src={selectedImage.url} alt={productName} fill className="object-contain p-8" />
      </div>

      <div className="flex gap-3 overflow-x-auto">
        {images.map((image, index) => (
          <button
            key={image.url}
            type="button"
            onClick={() => setSelectedIndex(index)}
            className={`relative h-20 w-20 shrink-0 cursor-pointer overflow-hidden rounded-lg border-2 ${
              selectedIndex === index ? 'border-primary' : 'border-gray-200'
            }`}
          >
            <Image
              src={image.url}
              alt={`${productName} ${index + 1}`}
              fill
              className="object-contain p-2"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
