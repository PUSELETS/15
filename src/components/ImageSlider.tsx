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
interface ImageSliderProps {
  urls: string[]
}

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface ProductCarouselProps {
  products: Product[];
}

const ImageSlider = ({ products }: ProductCarouselProps) => {
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
    <div className='flex mt-6 items-center group relative w-auto h-[11.45rem]  overflow-hidden rounded-xl'>
      <div className=' z-10 inset-0 opacity-0 group-hover:opacity-100 transition'>
        <button
          onClick={(e) => {
            e.preventDefault()
            swiper?.slideNext()
          }}
          className={cn(
            activeStyles,
            'right-3 transition',
            {
              [inactiveStyles]: slideConfig.isEnd,
              'hover:bg-primary-300 text-primary-800 opacity-100':
                !slideConfig.isEnd,
            }
          )}
          aria-label='next image'>
          <ChevronRight className='h-4 w-4 text-zinc-700' />{' '}
        </button>
        <button
          onClick={(e) => {
            e.preventDefault()
            swiper?.slidePrev()
          }}
          className={cn(activeStyles, 'left-3 transition', {
            [inactiveStyles]: slideConfig.isBeginning,
            'hover:bg-primary-300 text-primary-800 opacity-100':
              !slideConfig.isBeginning,
          })}
          aria-label='previous image'>
          <ChevronLeft className='h-4 w-4 text-zinc-700' />{' '}
        </button>
      </div>
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
        slidesPerView={5/2}
        
        className=' h-full w-full '>
        {products.map((product, i) => (
          <SwiperSlide
            key={i}
            className='-z-10 flex justify-center relative h-full w-full'>
            <div className="relative w-[7.5rem] h-[7.5rem] ">
              <Image
                fill
                loading='eager'
                className='z-10 h-full w-full object-cover object-center '
                src={product.image}
                alt='Product image'
              />
            </div>
            <div className="flex w-[7.5rem]">
              <h3 className="font-semibold mt-2 text-[clamp(14px,1.0vw+10px,17px)] leading-[1] ">
                {product.name}
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>)
}

export default ImageSlider

