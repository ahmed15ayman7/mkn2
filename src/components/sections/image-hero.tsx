import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils';
type Props = {
  image: string;
  heightClass?: string;
  children: React.ReactNode;
}

export function ImageHero({ image, heightClass, children }: Props) {
  return (
    <section className={cn("relative flex flex-col", heightClass)}>
      <div className="pointer-events-none absolute inset-0">
        <Image
          src={image}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pb-8 pt-28 sm:px-6 lg:px-8 lg:pt-32">
        {children}
      </div>
    </section>
  );
}