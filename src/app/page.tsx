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
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ReactNode, useEffect, useRef, useState } from "react";
import ProductCarousel from "@/components/ImageSlider";
import ProductSlider from "@/components/ProductSlider";
import { motion, useInView } from "framer-motion";

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

const products: Product[] = [
  {
    id: 1,
    name: "3 Piece Softside",
    price: 89.99,
    image: "/Pe.png",
  },
  {
    id: 2,
    name: "3 Piece Softside",
    price: 249.00,
    image: "/Pe.png",
  },
  {
    id: 3,
    name: "3 Piece Softside",
    price: 129.99,
    image: "/Pe.png",
  },
  {
    id: 4,
    name: "3 Piece Softside",
    price: 45.50,
    image: "/Pe.png",
  },
  // Add more products as needed
];

const Homes: NextPage = () => {

  return (

    <section className={`${tahoma.className}  relative [font-size-adjust:ex-height_0.52] leading-[1] `}>
      <header className='relative'>

        <MaxWidthWrapper className=" sm:hidden " >
          <section className=" w-auto h-auto flex justify-center mt-1 ">
            <div className="flex flex-col justify-center items-center w-full h-auto  ">
              <div className=" z-10 relative  w-[20.9375rem] h-[28.35625rem]">
                <Image
                  src='/Cupoioie.png'
                  fill
                  alt=''
                  className="absolute z-[-5] "
                />
                <FadeUp>
                  <div className="w-auto h-auto absolute ">
                    <Icons.Hero className=" mt-[17.775rem] ml-8 w-[14.55625rem] h-[8.95rem] " />
                  </div>
                </FadeUp>
              </div>
            </div>
          </section>
        </MaxWidthWrapper>
        <MaxWidthWrapper className="mt-0">
          <section className=" justify-center text-[#000000] relative w-auto h-auto items-center space-x-6 sm:space-x-[5.54375rem] bg-white rounded-3xl py-10">
            <FadeUp>
              <label className=" flex text-center text-[clamp(30px,2.4vw+21px,38px)] ">
                Regular eye tests are essential for maintaining clear vision and protecting your eye health. Early detection can prevent serious problems, catch hidden conditions, and ensure your eyes stay healthy for years to come.
              </label>
            </FadeUp>

          </section>
        </MaxWidthWrapper>
        <MaxWidthWrapper className="mt-0">
          <section className=" justify-center text-[#000000] relative w-auto h-auto items-center bg-white rounded-3xl py-10">
            <div className=" w-[16.7125rem] h-[4.1875rem] leading-[1] text-[clamp(30px,2.4vw+21px,38px)] font-bold ">
              We provide best <br /> service.
            </div>
            <div className="w-[20.9375rem] h-[21.4rem] rounded-[10px] mt-6 bg-[#DADBF3] flex justify-center items-center">
              <Icons.Blue className=" w-[20.4375rem] h-[21.4rem] " />
            </div>
            <div className="w-[20.9375rem] h-[21.4rem] rounded-[10px] mt-6 bg-[#DADBF3] flex justify-center items-center">
              <Icons.white className=" w-[20.4375rem] h-[21.4rem] " />
            </div>
            <div className="w-[20.9375rem] h-[21.4rem] rounded-[10px] mt-6 bg-[#DADBF3] flex justify-center items-center">
              <Icons.black className=" w-[20.4375rem] h-[21.4rem] " />
            </div>
          </section>
        </MaxWidthWrapper>
      </header>

      <ProductReel href='/products?sort=recent' title='Brand new' />
    </section>


  )
}

function FadeUp({ children }: { children: ReactNode }) {

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
      transition={{ delay: 0.5 }}

    >
      {children}
    </motion.div>
  )
}

export default Homes;
