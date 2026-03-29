"use client"
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import type SwiperType from 'swiper'
import { useEffect, useState } from 'react'
import { EffectCards, EffectCoverflow, EffectFlip, Pagination } from 'swiper/modules'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Icons } from './Icons'
import MaxWidthWrapper from './MaxWidthWrapper'

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
}

interface ProductCarouselProps {
    products: Product[];
}

const ProductSlider = ({ products }: ProductCarouselProps) => {
    const [swiper, setSwiper] = useState<null | SwiperType>(
        null
    )
    const [activeIndex, setActiveIndex] = useState(0)
    const [slideConfig, setSlideConfig] = useState({
        isBeginning: true,
        isEnd: activeIndex === (products.length ?? 0) - 1,
    })
    useEffect(() => {
        swiper?.on('slideChange', ({ activeIndex }) => {
            setActiveIndex(activeIndex)
            setSlideConfig({
                isBeginning: activeIndex === 0,
                isEnd: activeIndex === (products.length ?? 0) - 1,
            })
        })
    }, [swiper, products])
    const activeStyles =
        'active:scale-[0.97] grid opacity-100 hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-square h-8 w-8 z-50 place-items-center rounded-full border-2 bg-white border-zinc-300'
    const inactiveStyles = 'hidden text-gray-400'
    return (
        <div className='flex mt-6 items-center group relative w-auto h-[14.6875rem]  overflow-hidden rounded-xl'>
            
            <MaxWidthWrapper>
                <Swiper
                effect={'coverflow'}
                pagination={{
                    renderBullet: (_, className) => {
                        return `<span class="rounded-full transition ${className}"></span>`
                    },
                }}
                onSwiper={(swiper) => setSwiper(swiper)}
                spaceBetween={0}
                modules={[Pagination, EffectCards]}
                slidesPerView={2}

                className=' h-full w-full '>
                {products.map(( product, i ) => (
                    <SwiperSlide
                        key={i}
                        className='-z-10 flex justify-center relative h-full w-full'>
                        <div className="" >
                            <div className=" flex flex-col pb-2 w-[9.71875rem] h-[14.66875rem] sm:w-[15.125rem] sm:h-[22.825rem] rounded-[15px] bg-[#469674]">
                                <div className="flex pt-2 px-2 justify-end h-8 w-auto">
                                    <button className="">
                                        <Icons.Thumb className='w-5 h-5 sm:w-6 sm:h-6' />
                                    </button>
                                </div>
                                <div className="relative w-[9.075rem] h-[9.075rem] sm:w-[14.125rem] sm:h-[14.125rem] mx-1">
                                    <Image
                                        src={product.image}
                                        fill
                                        alt=''
                                        className=" absolute "
                                    />
                                </div>
                                <div className="flex justify-between mt-1 mx-2 h-auto w-auto">
                                    <div className=" flex flex-col w-auto h-auto">
                                        <div className="flex justify-start w-auto h-auto">
                                            <Icons.Star className=" w-3 h-3 mr-1" />
                                            <Icons.Star className=" w-3 h-3 mr-1" />
                                            <Icons.Star className=" w-3 h-3 mr-1" />
                                            <Icons.Star className=" w-3 h-3 mr-1" />
                                        </div>
                                        <label className="text-[#2e2e2e] mt-1 fib-14 text-[clamp(12px,0.9vw+9px,15px)] font-[1000]">
                                            {product.name}
                                        </label>
                                        <label className="text-[#FF8633] mt-2 sm:mt-3 fib-14 text-[clamp(12px,0.9vw+9px,15px)] font-[1000]">
                                            R5,100.00
                                        </label>
                                    </div>
                                    <div className="flex items-center sm:items-end">
                                        <button className='flex items-center shadow-md rounded-full bg-[#FFA833] text-[#2e2e2e] py-1 px-2 sm:px-3  text-[clamp(12px,0.9vw+9px,15px)] font-semibold'>
                                            <span className="hidden sm:flex">Add</span>
                                            <Icons.Shopping_cart className='w-5 h-5 sm:ml-1 ' />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            </MaxWidthWrapper>
        </div>)
}

export default ProductSlider

