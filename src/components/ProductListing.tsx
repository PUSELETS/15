'use client'

import { useEffect, useState } from 'react'
import { Skeleton } from './ui/skeleton'
import Link from 'next/link'
import { cn, formatPrice } from '@/lib/utils'
import Image from 'next/image'
import ImageSlider from './ImageSlider'
import localFont from 'next/font/local'

interface ProductListingProps {
  product: any
  index: number
}

const cour = localFont({
  src: "../../public/fonts/cour.ttf",
})

const verdana = localFont({
  src: "../../public/fonts/verdana.ttf",
})

const ProductListing = ({ product, index }: ProductListingProps) => {

  const [isVisible, setIsVisible] = useState<boolean>(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, index * 75)

    return () => clearTimeout(timer)
  }, [index])

  if (!product || !isVisible) return <ProductPlaceholder />

  if (isVisible && product) {
    return (
      <Link
        className={cn(
          'invisible h-full w-full cursor-pointer group/main',
          {
            'visible animate-in fade-in-5': isVisible,
          }
        )}
        href={`/product/${product.id}`}>
        <div
          key={product.id}
          className="flex-shrink-0 w-full h-full" // gap control
        >
          <div className="relative">
            {/* Your exact card */}
            <Link
              href={`/product/${product.id}`}
              className={cn(
                'block cursor-pointer group/main',
                { 'visible animate-in fade-in-5': true }
              )}
            >
              <div className={`${verdana.className}  relative [font-size-adjust:ex-height_0.52] leading-[1] flex flex-col justify-center items-start `}>
                <div
                  className="relative rounded-[20px] mb-4 overflow-hidden border w-[18.75rem] h-[20.8625rem] "
                >
                  <Image
                    fill
                    loading="eager"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    src={product.imageUrl}
                    alt={product.name}
                  />
                </div>
                
                <h3 className="font-semibold mb-2 text-[clamp(22px,1.7vw+15px,28px)] text-black">
                  {product.name}
                </h3>
                <p className="mb-2 font-semibold  text-[clamp(22px,1.7vw+15px,28px)] text-black">
                  {formatPrice(product.price)}
                </p>
                <label className=' text-black mb-8 text-[clamp(11px,0.8vw+8px,13px)]'>
                  {product.shortDiscript}
                </label>
                <div className='flex items-start'>
                  <button className={`${cour.className} mr-3 relative flex justify-center py-[10px] px-[20px] items-center w-auto h-auto border-[1px] border-[#FF0007] rounded-[10px] bg-[#FF0007] text-white text-[clamp(16px,1.2vw+11px,20px)] `}>
                    ADD TO CART
                  </button>
                  <button className={`${cour.className} relative flex justify-center py-[10px] px-[20px] items-center w-auto h-auto rounded-[10px] border-[1px] border-black bg-white text-black text-[clamp(16px,1.2vw+11px,20px)] `}>
                    CUSTOMIZE
                  </button>
                </div>
                
              </div>
            </Link>
          </div>
        </div>
      </Link>
    )
  }
}

const ProductPlaceholder = () => {
  return (
    <div className='flex flex-col w-full'>
      <div className='relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl'>
        <Skeleton className='h-full w-full' />
      </div>
    </div>
  )
}

export default ProductListing