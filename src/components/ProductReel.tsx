'use client'

import { TQueryValidator } from '@/lib/validators/query-validator'

import { trpc } from '@/app/_trpc/client'
import Link from 'next/link'
import ProductListing from './ProductListing'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

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
  const [slidesPerView, setSlidesPerView] = useState(3); // default for desktop

  // Responsive logic
  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth < 640) {
        setSlidesPerView(1);      // Mobile
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(2);      // Tablet
      } else {
        setSlidesPerView(3);      // Desktop
      }
    };

    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);
    return () => window.removeEventListener('resize', updateSlidesPerView);
  }, []);

  const percentage = 100 / slidesPerView;

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

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
      <div className="relative w-full max-w-7xl mx-auto px-6 py-16">
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

        <div className="relative overflow-hidden">
          <motion.div
            className="flex  md:gap-8"
            animate={{ x: `-${currentIndex * percentage}%` }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 100
            }}
          >
            {products?.map((product: any, i: number) => (
              <motion.div
                key={product.id}
                className={`flex-shrink-0 w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-16px)]`}
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

