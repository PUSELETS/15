'use client'

import { useEffect, useState } from 'react'
import { Skeleton } from './ui/skeleton'
import Link from 'next/link'
import { cn, formatPrice } from '@/lib/utils'
import Image from 'next/image'
import ImageSlider from './ImageSlider'

interface ProductListingProps {
  product: any
  index: number
}

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
              <div className="flex flex-col justify-center items-center">
                <div
                  className="relative rounded-[30px] overflow-hidden border w-[18.4375rem] h-[18.4375rem] "
                >
                  <Image
                    fill
                    loading="eager"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    src={product.imageUrl}
                    alt={product.name}
                  />
                </div>

                <h3 className="mt-4 font-medium text-sm text-black">
                  {product.name}
                </h3>
                <p className="mt-1 font-medium text-sm text-gray-900">
                  {formatPrice(product.price)}
                </p>
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