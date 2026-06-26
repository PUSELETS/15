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
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useDrag } from '@use-gesture/react';


const tahoma = localFont({
  src: "../../public/fonts/tahoma.ttf",
})

const perks = [
  {
    name: 'Instant Delivery',
    Icon: ArrowDownToLine,
    description:
      'Get your assets delivered to your email in seconds and download them right away.',
  },
  {
    name: 'Guaranteed Quality',
    Icon: CheckCircle,
    description:
      'Every asset on our platform is verified by our team to ensure our highest quality standards. Not happy? We offer a 30-day refund guarantee.',
  },
  {
    name: 'For the Planet',
    Icon: Leaf,
    description:
      "We've pledged 1% of sales to the preservation and restoration of the natural environment.",
  },
]

const Category = [
  {
    name: '3 Piece Softside',
    image: '/Poly Lines.png'
  },
  {
    name: 'Colored Baggage',
    image: '/PolyyLine.png'
  },
  {
    name: 'Carry on Luggage',
    image: '/Poly Line.png'
  },
  {
    name: 'Basics Hardside',
    image: '/Poly Linee.png'
  },
]

const Categoryy: Product[] = [
  {
    name: 'Colored ',
    image: '/Picture Frameee.png',
    id: 0,
    price: 0
  },
  {
    name: '3 Piece Softside',
    image: '/Picture FrameW.png',
    id: 0,
    price: 0
  },
  {
    name: 'Basics Hardside',
    image: '/Picture Frame.png',
    id: 0,
    price: 0
  },
  {
    name: 'Carry on ',
    image: '/Picture Framely.png',
    id: 0,
    price: 0
  },

]

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

const Homes: NextPage = () => {

  let [count, setCount] = useState(1);


  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });

  const bind = useDrag(
    ({ offset: [ox] }) => {
      x.set(ox);                    // Update position while dragging
    },
    {
      axis: 'x',                    // Lock to horizontal movement
      rubberband: true,             // Nice bouncy effect at edges
      filterTaps: true,
    }
  );

  return (

    <section className={`${tahoma.className}  relative [font-size-adjust:ex-height_0.52] leading-[1] `}>
      <header className='relative'>

        <MaxWidthWrapper className="" >
          <section className=" w-auto relative flex justify-center mt-1 rounded-[10px] min-h-[calc(100dvh-6.3125rem)] md:min-h-[calc(100dvh-7.1875rem)] ">
            <div className=" z-10  w-full h-full ">
              <Image
                src='/stakes.png'
                fill
                alt=''
                className="absolute z-[-5] pointer-events-none inset-0 size-full select-none object-cover object-center rounded-[30px] "
              />
            </div>
            <div className=" flex flex-col justify-between absolute z-20 w-full h-full p-8 text-white ">
              <div className=" flex justify-center h-[2.4875rem] w-full ">
                <Icons.boot2plate className=' md:hidden w-[7.95rem] h-[2.4875rem] ' />
              </div>
              <div className=" flex justify-end h-[4.3rem] w-full  " >
                <Icons.fresh className=' w-[8.325rem] h-full ' />
              </div>
            </div>
          </section>
        </MaxWidthWrapper>
        <MaxWidthWrapper className="mt-0">
          <section className=" justify-center text-[#000000] relative w-auto h-auto items-center space-x-6 sm:space-x-[5.54375rem] bg-white rounded-3xl py-10">

            <label className=" flex text-center text-[clamp(30px,2.4vw+21px,38px)] font-semibold ">
              Good street food is essential for feeding both your stomach and your soul. At Boot2Plate, we serve fresh, hot, and flavourful meals made with care so you always leave satisfied.
            </label>


          </section>
        </MaxWidthWrapper>


      </header>


      <ProductReel href='/products?sort=recent' title='Brand new' />


      <div className="flex overflow-hidden items-center justify-center h-96 border-2 border-dashed border-gray-300 rounded-3xl">
      <motion.div
        style={{ x: springX }}
        className="w-60 h-60 bg-black text-white rounded-3xl flex items-center justify-center text-2xl font-medium shadow-xl select-none cursor-grab active:cursor-grabbing"
        // Use gesture without spreading all props directly on motion
        onPointerDown={bind().onPointerDown}
        onPointerMove={bind().onPointerMove}
        onPointerUp={bind().onPointerUp}
        onPointerCancel={bind().onPointerCancel}
      >
        Drag Me
      </motion.div>
    </div>

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
