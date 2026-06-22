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
        <div className='flex flex-col min-w-0 shrink-0 grow-0 border-0 p-0 basis-11/12 pl-5 sm:basis-2/5 md:basis-1/3 md:pl-[30px]' >
          <div className='relative min-h-[clamp(23.13rem,48vh,32rem)] max-w-[clamp(19.06rem,42vw,28rem)] '>
            <Image
              fill
              loading='eager'
              className='h-auto w-full rounded-[10px] object-cover object-center transition-opacity duration-300 opacity-100'
              src={product.imageUrl}
              alt='Product image'
            />
          </div>
          <h3 className='mt-4 font-medium text-sm text-black'>
            {product.name}
          </h3>
          <p className='mt-1 text-sm text-gray-500'>

          </p>
          <p className='mt-1 font-medium text-sm text-gray-900'>
            {formatPrice(product.price)}
          </p>
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