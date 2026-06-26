'use client'

import { TQueryValidator } from '@/lib/validators/query-validator'

import { trpc } from '@/app/_trpc/client'
import Link from 'next/link'
import { useDrag } from '@use-gesture/react';
import ProductListing from './ProductListing'
import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, PanInfo } from 'framer-motion';



interface ProductReelProps {
  title: string
  subtitle?: string
  href?: string
}

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: any;
};

const products: Product[] = [
  {
    id: 1,
    name: "vertkok",
    price: 89.99,
    imageUrl: "/stakes.png",
  },
  {
    id: 2,
    name: "braai packs",
    price: 247.00,
    imageUrl: "/packs.png",
  },
  {
    id: 3,
    name: "braai",
    price: 129.99,
    imageUrl: "/fat.png",
  },
  {
    id: 4,
    name: "kota",
    price: 45.50,
    imageUrl: "/kota.png",
  },
  // Add more products as needed
];

const ProductReel = (props: ProductReelProps) => {

  const [currentIndex, setCurrentIndex] = useState(0);


  // ================== CUSTOM PERCENTAGES ==================
  const movePercentages = [0, 78.67, 81.33333333333333, 80];
  // You can add more values if you have more products

  const getMovePercentage = (index: number): number => {
    return movePercentages[index % movePercentages.length];
  };
  // =======================================================

  // Drag System
  const x = useMotionValue(0);
  const springX = useSpring(x, {
    stiffness: 280,
    damping: 32,
    mass: 0.8,
  });

  // ====================== NEXT & PREV ======================
  const next = () => setCurrentIndex((prev) => (prev + 1) % products.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  // ========================================================

  // Use Gesture Drag Handler
  const bind = useDrag(
    ({ offset: [ox], direction: [dx], velocity: [vx], tap }) => {
      if (tap) return;

      // Live dragging
      x.set(ox);

      // Snap on release
      if (Math.abs(vx) > 0.3 || Math.abs(ox) > 80) {
        if (ox < 0 || vx < 0) {
          next();
        } else {
          prev();
        }
      }
    },
    {
      axis: 'x',
      filterTaps: true,
      rubberband: true,
      from: () => [x.get(), 0],
    }
  );

  

  //---------------------------------------------------------------------------//

  const { title, subtitle, href } = props

  const observerRef = useRef<HTMLDivElement>(null)

  const { data, isLoading, fetchNextPage, hasNextPage, isFetching } = trpc.getPosts.useInfiniteQuery(
    { limit: 4 },
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetching, fetchNextPage]);

  const product = data?.pages.flatMap(
    (page) => page.posts
  ) as any

  let map = []
  if (product && product.length) {
    map = product
  } else if (isLoading) {
    map = new Array<null>(

    ).fill(null)
  }

  return (
    <section className='py-6'>
      <div className="relative w-full py-8">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-5xl md:text-3xl font-bold tracking-tight">
            Shop the range
          </h2>
          <div className="hidden md:flex gap-3">
            <button
              onClick={prev}
              className="w-12 h-12 border border-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all"
            >
              ←
            </button>
            <button
              onClick={next}
              className="w-12 h-12 border border-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all"
            >
              →
            </button>
          </div>
        </div>

        <div className=" overflow-hidden h-auto w-full ">
          <motion.div
            className=" flex w-full pl-5 "
            animate={{
              x: `-${currentIndex * getMovePercentage(currentIndex)}%`,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {products?.map((product: any, i: number) => (
              <motion.div
                key={product.id}
                className="w-full mr-5 "
                whileHover={{ scale: 1.02 }}
              >
                <ProductListing
                  key={`product-${i}`}
                  product={product}
                  index={i}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mobile dots */}
        <div className="flex justify-center gap-3 mt-10 md:hidden">
          {products.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all ${idx === currentIndex ? 'bg-black scale-125' : 'bg-gray-300'
                }`}
            />
          ))}
        </div>
      </div>

      <div className='relative h-auto w-full '>
        <div className='overflow-hidden' >
          <div className='flex ml-[-20px] h-auto  first:ml-0 md:ml-[-30px] md:mr-10'>



          </div>
          <div ref={observerRef}>{isFetching ? 'Loading' : ''}</div>
        </div>
      </div>
    </section>
  )
}

export default ProductReel


//---------------------------------------------------------------
