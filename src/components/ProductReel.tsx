'use client'

import { TQueryValidator } from '@/lib/validators/query-validator'

import { trpc } from '@/app/_trpc/client'
import Link from 'next/link'
import ProductListing from './ProductListing'
import { useEffect, useRef } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';



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
    imageUrl: "/fat.png",
  },
  {
    id: 2,
    name: "braai packs",
    price: 249.00,
    imageUrl: "/packs.png",
  },
  {
    id: 3,
    name: "braai",
    price: 129.99,
    imageUrl: "/stakes.png",
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
      <div className='md:flex md:items-center md:justify-between mb-4'>
        <div className='max-w-2xl px-2 lg:max-w-4xl lg:px-0'>
          {title ? (
            <h1 className='text-2xl font-bold text-[#2e2e2e] sm:text-3xl'>

            </h1>
          ) : null}
          {subtitle ? (
            <p className='mt-2 text-sm text-muted-foreground'>
              {subtitle}
            </p>
          ) : null}
        </div>

        {href ? (
          <Link
            href={href}
            className='hidden text-sm font-medium text-blue-600 hover:text-blue-500 md:block'>
            Shop the collection{' '}
            <span aria-hidden='true'>&rarr;</span>
          </Link>
        ) : null}
      </div>

      <div className='relative h-auto w-full '>
        <div className='overflow-hidden' >
          <div className='flex ml-[-20px] h-auto mr-5 first:ml-0 md:ml-[-30px] md:mr-10'>
            <Swiper
              // install Swiper modules
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={25}
              slidesPerView={1.2}
              
              
            >
              {products?.map((product: any, i: number) => (
                <SwiperSlide>
                  <ProductListing
                    key={`product-${i}`}
                    product={product}
                    index={i}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

          </div>
          <div ref={observerRef}>{isFetching ? 'Loading' : ''}</div>
        </div>
      </div>
    </section>
  )
}

export default ProductReel

