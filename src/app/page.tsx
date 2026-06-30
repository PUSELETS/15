'use client'

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { header } from "../components/Header";
import { rate } from "../components/rate";
import { suthead } from "../components/paragraph";
import {
  ArrowDownToLine,
  CheckCircle,
  Leaf,
} from 'lucide-react'
import ProductReel from "@/components/ProductReel";
import Image from "next/image";
import localFont from "next/font/local";
import type { NextPage } from 'next';
import { getServerSideUser } from "@/lib/user";
import { Icons } from "@/components/Icons";


import { ReactNode, useEffect, useRef, useState } from "react";
import ProductCarousel from "@/components/ImageSlider";
import ProductSlider from "@/components/ProductSlider";
import { motion, useInView, useMotionValue, useSpring, PanInfo } from "framer-motion";
import { useDrag } from '@use-gesture/react';


const verdana = localFont({
  src: "../../public/fonts/verdana.ttf",
})

const cour = localFont({
  src: "../../public/fonts/cour.ttf",
})


type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

const Homes: NextPage = () => {

  let [count, setCount] = useState(1);


  const x = useMotionValue(0);
  const springX = useSpring(x, {
    stiffness: 280,
    damping: 35,
    mass: 0.8,
  });

  const handleDrag = (_: any, info: PanInfo) => {
    x.set(info.offset.x);        // Live update during drag
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    // Optional: Snap back to center after release
    x.set(0);
  };

  return (

    <section className={`${verdana.className}  relative [font-size-adjust:ex-height_0.52] leading-[1] `}>
      <header className='relative'>

        <MaxWidthWrapper className="" >
          <section className=" w-auto relative flex justify-center mt-1 rounded-[10px] min-h-[calc(100dvh-6.3125rem)] md:min-h-[calc(100dvh-7.1875rem)] ">
            <div className=" z-10  w-full h-full ">
              <Image
                src='/stakes.png'
                fill
                alt=''
                className="absolute z-[-5] pointer-events-none inset-0 size-full select-none object-cover object-center rounded-[20px] "
              />
            </div>
            <div className=" flex flex-col justify-end absolute z-20 w-full h-full p-8 text-white ">

              <div className=" flex justify-center h-auto w-full  " >
                <button className={`${cour.className} mr-3 relative flex justify-center py-[10px] px-[20px] items-center w-auto h-auto border-[1px] border-[#FF0007] rounded-[10px] bg-[#FF0007] text-white text-[clamp(16px,1.2vw+11px,20px)] `}>
                  ORDER NOW
                </button>
              </div>
            </div>
          </section>
        </MaxWidthWrapper>
        <MaxWidthWrapper className="mt-0">
          <section className=" justify-center text-[#000000] relative w-auto h-auto items-center space-x-6 sm:space-x-[5.54375rem] bg-white rounded-3xl py-10">
            <label className=" flex text-center text-[clamp(26px,2.0vw+18px,32px)] font-semibold px-10 ">
              Good street food is essential for feeding both your stomach and your soul. At Boot2Plate, we serve fresh, hot, and flavourful meals made with care so you always leave satisfied.
            </label>
          </section>
        </MaxWidthWrapper>
      </header>
      <ProductReel href='/products?sort=recent' title='Brand new' />

    </section>


  )
}

function FadeUp({ children, delay }: { children: ReactNode, delay: number }) {

  let ref = useRef(null);
  let isInView = useInView(ref);
  let [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isInView && !isVisible) {
      setIsVisible(true)
    }
  }, [isInView, isVisible])

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: {
          opacity: 0,
          y: 15,
        },
        visible: {
          opacity: 1,
          y: 0,
        }
      }}

      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      transition={{ delay }}

    >
      {children}
    </motion.div>
  )
}

export default Homes;
