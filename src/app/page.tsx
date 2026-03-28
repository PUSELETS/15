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
    name: 'Colored Baggage',
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
    name: 'Carry on Luggage',
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
      <header className='relative mt-4 sm:mt-10 '>
        <MaxWidthWrapper className=" sm:hidden " >
          <section className=" w-auto h-auto flex justify-center ">
            <div className="relative w-[20.4375rem] h-[20.4375rem]">
              <div className=" z-10 w-[10.525rem] h-[13.6625rem] ml-[9.31875rem] pt-6 " >
                <h1 className=" text-[clamp(30px,2.4vw+21px,38px)]  leading-[1] text-[#2e2e2e] font-[1000]">
                  Carry Your World With Confident.
                </h1>
                <p className="mt-2 text-[clamp(16px,1.2vw+11px,20px)] text-[#4e4e4e]">
                  Quality suitcase for every destination.
                </p>
                <button className='flex items-center mt-12 shadow-md rounded-full bg-[#FFA833] text-[#2e2e2e] py-1 px-3  text-[clamp(12px,0.9vw+9px,15px)] font-semibold'>
                  Get Yours
                  <Icons.Arrow_right className='w-5 h-5 ml-1 ' />
                </button>
              </div>
              <Image
                src='/Poly LLine.png'
                fill
                alt=''
                className="absolute z-[-5] "
              />
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
      <section className=" ">
        <MaxWidthWrapper className=" py-6 sm:py-12">
          <div className="flex ">
            <div className=" w-[23.16875rem] h-auto ">
              <h2 className=" text-[#2e2e2e] text-[clamp(22px,1.7vw+15px,28px)] sm:text-[clamp(30px,2.4vw+21px,38px)] font-[1000]  ">
                <span className="hidden sm:flex">Browser</span> Our Hottest <span className=" text-[#FF8633] ">Category</span>
              </h2>
            </div>
          </div>
          <ProductCarousel products={products} />
        </MaxWidthWrapper>
      </section>
      <section className=" sm:py-8">
        <MaxWidthWrapper className=" my-0 flex justify-center">
          <div className=" hidden sm:flex justify-center w-auto items-center h-auto space-x-[2.58125rem] rounded-3xl bg-orange-300">
            <h1 className=" text-[#2e2e2e] fib-56 font-[1000] text-[clamp(46px,4.2vw+32px,60px)] ">
              Unpack Happiness
            </h1>
            <div className=" w-[10rem] relative h-[23.46875rem] ">
              <Image
                src='/Pixeboddyy.png'
                fill
                alt=''
                className=" absolute "
              />
            </div>
          </div>
          <div className=" flex justify-center h-[12.63125rem] w-[20.4375rem] sm:hidden relative ">
            <Image
                src='/Polygraye.png'
                fill
                alt=''
                className=" absolute "
              />
          </div>
        </MaxWidthWrapper>
      </section>
      <section className=" pt-6 sm:pt-12">
        <MaxWidthWrapper className="">
          <div className="flex flex-col ">
            <div className=" sm:w-[24.1375rem] sm:h-[2.175rem] ">
              <h2 className=" text-[#2e2e2e] text-[clamp(22px,1.7vw+15px,28px)] sm:text-[clamp(30px,2.4vw+21px,38px)] font-[1000]  ">
                Best Selling <span className=" text-[#FF8633] ">Suitcase</span>
              </h2>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
      <ProductSlider products={Categoryy} />
      <ProductSlider products={Categoryy} />
      <section className="py-12 hidden sm:flex">
        <MaxWidthWrapper>
          <div className="flex w-auto h-auto bg-[#F7FCD7] rounded-3xl">
            <div className="relative w-[21.46875rem] ml-[3.9875rem] h-[20.66875rem] " >
              <Image
                src='/Pixelliy.png'
                fill
                alt=''
                className=" absolute "
              />
            </div>
            <div className="flex flex-col ml-9">
              <h3 className="fib-22 text-[clamp(18px,1.4vw+13px,24px)] font-[1000] text-[#FF8633]">
                About Us
              </h3>
              <h3 className="fib-22 mt-6 text-[clamp(18px,1.4vw+13px,24px)] font-[1000] text-[#2e2e2e]">
                Born from the Road. Built for <br /> Your Journey
              </h3>
              <div className="w-[36.6875rem] h-[7.6375rem] mt-4">
                <p className="fib-16 text-[clamp(14px,1.0vw+10px,17px)] leading-[1.2] text-[#4e4e4e]">
                  At TA, travel isn't just a hobby , it's what drives us. We know the feeling: that mix
                  of excitement and nerves before a big trip. The last thing you need is a suitcase
                  that lets you down halfway through. So we design and source luggage that's
                  ready for real life , from bumpy airport trolleys and rainy streets to dusty
                  backroads and endless check-ins. Durable shells, whisper-quiet wheels,
                  clever compartments, and designs that still turn heads...
                </p>
              </div>
              <div className="mt-5">
                <button className='flex items-center shadow-md rounded-full bg-[#FFA833] text-[#2e2e2e] py-1 px-3  text-[clamp(12px,0.9vw+9px,15px)] font-semibold'>
                  Learn More
                  <Icons.Arrow_right className='w-5 h-5 ml-1 ' />
                </button>
              </div>
              <div className="h-auto w-auto mt-8 flex space-x-4">
                <button className="w-8 h-8 bg-[#e1e1e1] flex items-center justify-center rounded-full">
                  <Icons.Twitter className='w-5 h-5' />
                </button>
                <button className="w-8 h-8 bg-[#e1e1e1] flex items-center justify-center  rounded-full">
                  <Icons.Instagram className='w-5 h-5' />
                </button>
                <button className="w-8 h-8 bg-[#e1e1e1] flex items-center justify-center  rounded-full">
                  <Icons.Whatsap className='w-5 h-5' />
                </button>
                <button className="w-8 h-8 bg-[#e1e1e1]  flex items-center justify-center rounded-full">
                  <Icons.Facebook className='w-5 h-5' />
                </button>
                <button className="w-8 h-8 bg-[#e1e1e1] flex items-center justify-center  rounded-full">
                  <Icons.Telegram className='w-5 h-5' />
                </button>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
      <section className="py-12 shadow-sm hidden sm:flex">
        <MaxWidthWrapper className="">
          <div className="flex flex-col ml-12">
            <div className=" w-[24.1375rem] h-[2.175rem] ">
              <h2 className=" text-[#2e2e2e] text-[clamp(30px,2.4vw+21px,38px)] font-[1000]  ">
                Most Popular <span className=" text-[#FF8633] ">Products</span>
              </h2>
            </div>
            <div className="w-auto h-auto mt-8">
              <div className="grid grid-flow-col gap-6">
                {Categoryy.map((Categoryy) => (
                  <div
                    key={Categoryy.name}
                    className="">
                    <div className=" flex flex-col w-[15.125rem] h-[22.825rem] rounded-[15px] bg-[#F7FCD7]">
                      <div className="flex pt-4 px-4 justify-end h-12 w-auto">
                        <button className="">
                          <Icons.Thumb className='w-6 h-6' />
                        </button>
                      </div>
                      <div className="relative w-[14.125rem] h-[14.125rem] mx-2">
                        <Image
                          src={Categoryy.image}
                          fill
                          alt=''
                          className=" absolute "
                        />
                      </div>
                      <div className="flex justify-between mt-2 mx-4 h-auto w-auto">
                        <div className=" flex flex-col w-auto h-auto">
                          <div className="flex justify-start w-auto h-auto">
                            <Icons.Star className=" w-4 h-4 mr-1" />
                            <Icons.Star className=" w-4 h-4 mr-1" />
                            <Icons.Star className=" w-4 h-4 mr-1" />
                            <Icons.Star className=" w-4 h-4 mr-1" />
                          </div>
                          <label className="text-[#2e2e2e] mt-1 fib-14 text-[clamp(12px,0.9vw+9px,15px)] font-[1000]">
                            {Categoryy.name}
                          </label>
                          <label className="text-[#FF8633] mt-3 fib-14 text-[clamp(12px,0.9vw+9px,15px)] font-[1000]">
                            R5,100.00
                          </label>
                        </div>
                        <div className="flex items-end">
                          <button className='flex items-center shadow-md rounded-full bg-[#FFA833] text-[#2e2e2e] py-1 px-3  text-[clamp(12px,0.9vw+9px,15px)] font-semibold'>
                            Add
                            <Icons.Shopping_cart className='w-5 h-5 ml-1 ' />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
      <ProductReel href='/products?sort=recent' title='Brand new' />


    </section>


  )
}

export default Homes;
