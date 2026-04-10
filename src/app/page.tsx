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
import { useEffect, useState } from "react";
import ProductCarousel from "@/components/ImageSlider";
import ProductSlider from "@/components/ProductSlider";

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
      <header className='relative bg-[#E79944]'>
        <div className="w-[2.74375rem] h-[4.24375rem] top-[16.51875rem] absolute z-20">
          <Image
            src='/leavee.png'
            fill
            alt=''
            className=""
          />
        </div>
        <MaxWidthWrapper className=" sm:hidden " >
          <section className=" w-auto h-auto flex justify-center  ">
            <div className="flex flex-col justify-center items-center w-full h-auto ">
              <div className=" z-10 w-[13.49375rem] h-[7.1625rem] mt-[3.075rem] " >
                <Icons.Hero className='' />
                <p className="mt-4 text-center leading-[1.2] text-[clamp(16px,1.2vw+11px,20px)] text-[#4e4e4e]">
                  Freshly made. Naturally better.
                </p>
              </div>
              <div className=" z-10 relative right-2 w-[8.6875rem] h-[12.63125rem]">
                <Image
                  src='/PictuHai.png'
                  fill
                  alt=''
                  className="absolute z-[-5] "
                />
              </div>
              <button className='flex items-center justify-center mt-8 mb-16 h-10 shadow-md shadow-[#fff70071] rounded-full bg-[#FFF600] text-[#2e2e2e] py-1 px-3  text-[clamp(16px,1.2vw+11px,20px)] font-bold'>
                Get Yours
              </button>
            </div>
          </section>
        </MaxWidthWrapper>
        <MaxWidthWrapper className=" mt-0 ">
          <section className=" hidden sm:flex justify-center relative w-auto h-auto items-center space-x-6 sm:space-x-[5.54375rem] bg-[#F7FCD7] rounded-3xl py-10">
            <div className=' sm:w-[12.925rem]  relative sm:h-[23.8125rem]'>
              <Image
                src='/ForValue.png'
                fill
                alt=''
                className="absolute"
              />
            </div>
            <div className=" sm:w-[21.04375rem] sm:h-[19.1875rem] w-[10.525rem] h-[13.6625rem] mb-[4.61875rem]" >
              <h1 className=" text-[clamp(26px,2.0vw+18px,32px)] sm:text-[clamp(46px,4.2vw+32px,60px)] leading-[1] text-[#2e2e2e] font-[1000]">
                Carry Your World With Confident.
              </h1>
              <p className="mt-2 text-[clamp(16px,1.2vw+11px,20px)] text-[#4e4e4e]">
                Quality suitcase for every <br className=" hidden sm:flex " /> destination.
              </p>
              <button className='flex items-center mt-5 shadow-md rounded-full bg-[#FFA833] text-[#2e2e2e] py-1 px-3  text-[clamp(12px,0.9vw+9px,15px)] font-semibold'>
                <span className="sm:hidden">Get Yours</span>
                <span className="hidden sm:inline">Start your Journey</span>
                <Icons.Arrow_right className='w-5 h-5 ml-1 ' />
              </button>
            </div>
          </section>
        </MaxWidthWrapper>
      </header>
      <section className="bg-[#E2C3D2] relative ">
        <div className=" absolute z-40 right-0 mr-[4.6875rem] top-[-2px] w-auto h-auto">
          <Icons.Triangle className="w-8 h-8" />
        </div>
        <MaxWidthWrapper className=" pt-12">
          <div className="w-auto h-auto ">
            <Icons.Thumb className=" w-6 h-6 " />
          </div>
          <div className=" relative w-auto h-auto flex flex-col items-center mt-6">
            <div className=" flex w-[9.69375rem] h-[8.98125rem] ml-[1.86875rem] relative " >
              <div className=" relative w-[2.74375rem] h-[8.6125rem] ">
                <Image
                  src='/Pixgtgl.png'
                  fill
                  alt=''
                  className=" absolute "
                />
              </div>
              <div className=" ml-4 w-auto h-auto ">
                <div className="flex justify-start w-auto h-auto">
                  <Icons.Star className=" w-3 h-3 mr-[0.125rem] " />
                  <Icons.Star className=" w-3 h-3 mr-[0.125rem] " />
                  <Icons.Star className=" w-3 h-3 mr-[0.125rem] " />
                  <Icons.Star className=" w-3 h-3 mr-[0.125rem] " />
                </div>
                <div className=" w-[5.95625rem] h-[2.04375rem] text-[clamp(16px,1.2vw+11px,20px)] font-bold text-[#2e2e2e] mt-2">
                  Black Berry Smoothy
                </div>
                <div className=" text-[#4e4e4e] mt-3 text-[clamp(16px,1.2vw+11px,20px)] font-semibold">
                  R 29.00
                </div>
              </div>
              <div className=" w-[2.85625rem] h-[2.33125rem] ml-[1.2875rem] bottom-0 absolute ">
                <Image
                  src='/Berry.png'
                  fill
                  alt=''
                  className=" "
                />
              </div>
            </div>
            <div className=" w-[7.99375rem] h-auto mt-2 ">
              <div className=" text-[#2e2e2e] font-[500] text-[clamp(16px,1.2vw+11px,20px)] flex w-full h-auto ">
                <button className=" w-[2.2rem] h-[2.2rem] mr-3 rounded-full bg-[#AB8396] ">
                  -
                </button>
                <div className=" w-[2.2rem] h-[2.2rem] flex justify-center items-center mr-3 rounded-full bg-[#AB8396] ">
                  1
                </div>
                <button className=" w-[2.2rem] h-[2.2rem] rounded-full bg-[#AB8396] ">
                  +
                </button>
              </div>
              <button className='flex items-center justify-center font-semibold mt-4 w-full h-8 shadow-md shadow-[#fff70071] rounded-full bg-[#FFF600] text-[#2e2e2e] py-1 px-3  text-[clamp(16px,1.2vw+11px,20px)] '>
                Add To Cart
              </button>
            </div>
          </div>
          <div className=" flex mt-8 justify-start items-center ">
            <label className="text-[clamp(16px,1.2vw+11px,20px)] mb-14 text-[#4e4e4e]">Learn More</label>
            <Icons.Arrow_right className="w-4 h-4 ml-1 mb-14 " />
          </div>
        </MaxWidthWrapper>
      </section>
      <section className="bg-[#C7E2C3] relative ">
        <div className=" absolute z-40 ml-[4.6875rem] top-[-2px] w-auto h-auto">
          <Icons.Tringl className="w-8 h-8" />
        </div>
        <MaxWidthWrapper className=" pt-12">
          <div className="w-auto h-auto ">
            <Icons.Thumb className=" w-6 h-6 " />
          </div>
          <div className=" relative w-auto h-auto flex flex-col items-center mt-6">
            <div className=" flex w-[9.69375rem] h-[8.98125rem] ml-[1.86875rem] relative " >
              <div className=" relative w-[2.74375rem] h-[8.6125rem] ">
                <Image
                  src='/Avocadol.png'
                  fill
                  alt=''
                  className=" absolute "
                />
              </div>
              <div className=" ml-4 w-auto h-auto ">
                <div className="flex justify-start w-auto h-auto">
                  <Icons.Star className=" w-3 h-3 mr-[0.125rem] " />
                  <Icons.Star className=" w-3 h-3 mr-[0.125rem] " />
                  <Icons.Star className=" w-3 h-3 mr-[0.125rem] " />
                  <Icons.Star className=" w-3 h-3 mr-[0.125rem] " />
                </div>
                <div className=" w-[5.95625rem] h-[2.04375rem] text-[clamp(16px,1.2vw+11px,20px)] font-bold text-[#2e2e2e] mt-2">
                  Avocado Smoothy
                </div>
                <div className=" text-[#4e4e4e] mt-3 text-[clamp(16px,1.2vw+11px,20px)] font-semibold">
                  R 29.00
                </div>
              </div>
              <div className=" w-[2.85625rem] h-[2.33125rem] ml-[1.2875rem] bottom-0 absolute ">
                <Image
                  src='/Berry.png'
                  fill
                  alt=''
                  className=" "
                />
              </div>
            </div>
            <div className=" w-[7.99375rem] h-auto mt-2 ">
              <div className=" text-[#2e2e2e] font-[500] text-[clamp(16px,1.2vw+11px,20px)] flex w-full h-auto ">
                <button className=" w-[2.2rem] h-[2.2rem] mr-3 rounded-full bg-[#8BAB83] ">
                  -
                </button>
                <div className=" w-[2.2rem] h-[2.2rem] flex justify-center items-center mr-3 rounded-full bg-[#8BAB83] ">
                  1
                </div>
                <button className=" w-[2.2rem] h-[2.2rem] rounded-full bg-[#8BAB83] ">
                  +
                </button>
              </div>
              <button className='flex items-center justify-center font-semibold mt-4 w-full h-8 shadow-md shadow-[#fff70071] rounded-full bg-[#FFF600] text-[#2e2e2e] py-1 px-3  text-[clamp(16px,1.2vw+11px,20px)] '>
                Add To Cart
              </button>
            </div>
          </div>
          <div className=" flex mt-8 justify-start items-center ">
            <label className="text-[clamp(16px,1.2vw+11px,20px)] mb-14 text-[#4e4e4e]">Learn More</label>
            <Icons.Arrow_right className="w-4 h-4 ml-1 mb-14 " />
          </div>
        </MaxWidthWrapper>
      </section>
      <section className="bg-[#F5DCA3] relative ">
        <div className=" absolute z-40 right-[40%] ml-[4.6875rem] top-[-2px] w-auto h-auto">
          <Icons.Tringlee className="w-8 h-8" />
        </div>
        <MaxWidthWrapper className=" pt-12">
          <div className="w-auto h-auto ">
            <Icons.Thumb className=" w-6 h-6 " />
          </div>
          <div className=" relative w-auto h-auto flex flex-col items-center mt-6">
            <div className=" flex w-[9.69375rem] h-[8.98125rem] ml-[1.86875rem] relative " >
              <div className=" relative w-[2.74375rem] h-[8.6125rem] ">
                <Image
                  src='/OrangeTT.png'
                  fill
                  alt=''
                  className=" absolute "
                />
              </div>
              <div className=" ml-4 w-auto h-auto ">
                <div className="flex justify-start w-auto h-auto">
                  <Icons.Star className=" w-3 h-3 mr-[0.125rem] " />
                  <Icons.Star className=" w-3 h-3 mr-[0.125rem] " />
                  <Icons.Star className=" w-3 h-3 mr-[0.125rem] " />
                  <Icons.Star className=" w-3 h-3 mr-[0.125rem] " />
                </div>
                <div className=" w-[5.95625rem] h-[2.04375rem] text-[clamp(16px,1.2vw+11px,20px)] font-bold text-[#2e2e2e] mt-2">
                  Orange Smoothy
                </div>
                <div className=" text-[#4e4e4e] mt-3 text-[clamp(16px,1.2vw+11px,20px)] font-semibold">
                  R 29.00
                </div>
              </div>
              <div className=" w-[2.85625rem] h-[2.33125rem] ml-[1.2875rem] bottom-0 absolute ">
                <Image
                  src='/Berry.png'
                  fill
                  alt=''
                  className=" "
                />
              </div>
            </div>
            <div className=" w-[7.99375rem] h-auto mt-2 ">
              <div className=" text-[#2e2e2e] font-[500] text-[clamp(16px,1.2vw+11px,20px)] flex w-full h-auto ">
                <button className=" w-[2.2rem] h-[2.2rem] mr-3 rounded-full bg-[#EF9745] ">
                  -
                </button>
                <div className=" w-[2.2rem] h-[2.2rem] flex justify-center items-center mr-3 rounded-full bg-[#EF9745] ">
                  1
                </div>
                <button className=" w-[2.2rem] h-[2.2rem] rounded-full bg-[#EF9745] ">
                  +
                </button>
              </div>
              <button className='flex items-center justify-center font-semibold mt-4 w-full h-8 shadow-md shadow-[#fff70071] rounded-full bg-[#FFF600] text-[#2e2e2e] py-1 px-3  text-[clamp(16px,1.2vw+11px,20px)] '>
                Add To Cart
              </button>
            </div>
          </div>
          <div className=" flex mt-8 justify-start items-center ">
            <label className="text-[clamp(16px,1.2vw+11px,20px)] mb-14 text-[#4e4e4e]">Learn More</label>
            <Icons.Arrow_right className="w-4 h-4 ml-1 mb-14 " />
          </div>
        </MaxWidthWrapper>
      </section>
      <section className=" h-14 bg-[#412E1C] flex items-center ">
        <MaxWidthWrapper>
          mish
        </MaxWidthWrapper>
      </section>

     
      <ProductReel href='/products?sort=recent' title='Brand new' />
    </section>


  )
}

export default Homes;
