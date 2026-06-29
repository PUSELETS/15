'use client'

import { TQueryValidator } from '@/lib/validators/query-validator'
import { useDrag } from '@use-gesture/react';
import { trpc } from '@/app/_trpc/client'
import Link from 'next/link'
import ProductListing from './ProductListing'
import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, PanInfo } from 'framer-motion';
import localFont from 'next/font/local';


const cour = localFont({
  src: "../../public/fonts/cour.ttf",
})

const verdana = localFont({
  src: "../../public/fonts/verdana.ttf",
})

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
  shortDiscript: string,
};

const products: Product[] = [
  {
    id: 1,
    name: "FULL HOUSE KOTA",
    price: 85,
    imageUrl: "/kota.png",
    shortDiscript: "Loaded with Russian, polony, cheese, egg, chips & atchar. The ultimate kota experience!",
  },
  {
    id: 2,
    name: "GRILLED MEALIES",
    price: 147.00,
    imageUrl: "/packs.png",
    shortDiscript: "Fresh mealies grilled over the coals and brushed with butter & spices.",
  },
  {
    id: 3,
    name: "CHEESE VETKOEK",
    price: 45,
    imageUrl: "/fat.png",
    shortDiscript: "Fresh fried vetkoek filled with cheese. Add mince for extra flavour!",
  },
  {
    id: 4,
    name: "SHISANYAMA COMBO",
    price: 135.50,
    imageUrl: "/stakes.png",
    shortDiscript: "Flame-grilled braai meat with pap, chakalaka & gravy. Proper township braai taste.",
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
  const next = () => {
    setCurrentIndex((prev) => {
      if (prev < 4) {           // Only allow going up to index 4
        return prev + 1;
      }
      return prev;              // Stay at 4 if already at the end
    });
  };

  const prev = () => {
    setCurrentIndex((prev) => {
      if (prev > 0) {           // Only allow going down to index 0
        return prev - 1;
      }
      return prev;              // Stay at 0 if already at the beginning
    });
  };
  // ========================================================

  // This will control the second div
  const secondaryX = useMotionValue(0);
  


  const [liveX, setLiveX] = useState(0);

  const handleDrag = (_: any, info: PanInfo) => {
    const currentX = info.offset.x;

    x.set(currentX);                    // Main box
    secondaryX.set(currentX);     // Secondary box moves at different speed
    setLiveX(currentX);
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    const currentX = x.get();
    const threshold = 80; // pixels

    if (currentX < -threshold) {
      next();
    } else if (currentX > threshold) {
      prev();
    }

    x.set(0);
    secondaryX.set(0);
    setLiveX(0);
  };

  // Snap animation when index changes
  useEffect(() => {
    const targetX = -currentIndex * getMovePercentage(currentIndex);
    x.set(targetX);
  }, [currentIndex, x]);

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
      <div className="relative w-full ">
        <div className="flex items-center justify-between  mb-8 mx-auto w-full max-w-screen-xl px-4 md:px-20">
          <h2 className={`${verdana.className} flex text-center text-[#FF0007] text-[clamp(26px,2.0vw+18px,32px)] md:text-5xl font-bold tracking-tight`}>
            Shop the range
          </h2>
          <button className={`${cour.className} relative flex justify-center py-[10px] px-[20px] items-center w-auto h-auto rounded-[20px] border-[1px] border-black bg-white text-black text-[clamp(14px,1.0vw+10px,17px)] `}>
            SHOW ALL
          </button>
        </div>

        <div className=" overflow-hidden h-auto w-full ">
          <motion.div
            
            className=" flex w-full pl-5 "
            animate={{
              x: `-${currentIndex * getMovePercentage(currentIndex)}%`,
            }}
            transition={{
              type: "tween",
              duration: 0.4,
              ease: "easeOut"
            }}
          >
            {products?.map((product: any, i: number) => (
              <motion.div
                style={{
                  touchAction: 'none',
                  x: secondaryX
                }}
                key={product.id}
                className="w-full mr-4 "
                drag="x"
                dragElastic={5}
                dragConstraints={{ left: 0, right: 0 }}
                dragPropagation={false}
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
                transition={{
                  type: "tween",
                  duration: 0.4,
                  ease: "easeOut"
                }}
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
