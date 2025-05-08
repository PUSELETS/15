'use client'

import { TQueryValidator } from '@/lib/validators/query-validator'

import { trpc } from '@/app/_trpc/client'
import Link from 'next/link'
import ProductListing from './ProductListing'
import { useEffect, useRef } from 'react'
import { useIntersection } from '@mantine/hooks'
import InfiniteScroll from 'react-infinite-scroll-component'

interface ProductReelProps {
  title: string
  subtitle?: string
  href?: string
  query: TQueryValidator
}

const FALLBACK_LIMIT = 4

const ProductReel = (props: ProductReelProps) => {
  const { title, subtitle, href, query } = props

  const { data: queryResults, isLoading , fetchNextPage , hasNextPage , isFetchingNextPage } =
    trpc.getInfiniteProducts.useInfiniteQuery(
      {
        limit: query.limit ,
        query,
      },
      {
        getNextPageParam: (lastPage) => {

          if(lastPage.cursor + 4 > lastPage.documents.length){
            return false
          }
          return lastPage.cursor + 4
        },
        initialCursor: 0
      },

    )

    const product = queryResults?.pages.flatMap(
      (page) => page.documents
    ) as any
  
    let map = []
    if (product && product.length) {
      map = product
    } else if (isLoading) {
      map = new Array<null>(
        query.limit ?? FALLBACK_LIMIT
      ).fill(null)
    }

  return ( 
    <section className='py-12'>
      <div className='md:flex md:items-center md:justify-between mb-4'>
        <div className='max-w-2xl px-4 lg:max-w-4xl lg:px-0'>
          {title ? (
            <h1 className='text-2xl font-bold text-gray-900 sm:text-3xl'>
              {title}
            </h1>
          ) : null}
          {subtitle ? (
            <p className='mt-2 text-sm text-muted-foreground'>
              {subtitle}
            </p>
          ) : null}
        </div>

        {href ? (
          <Link
            href={href}
            className='hidden text-sm font-medium text-blue-600 hover:text-blue-500 md:block'>
            Shop the collection{' '}
            <span aria-hidden='true'>&rarr;</span>
          </Link>
        ) : null}
      </div>

      <div className='relative'>
        <div className='mt-6 flex items-center w-full'>
          <InfiniteScroll
          dataLength={product? product.length : 0}
          next={()=>fetchNextPage()}
          hasMore = {hasNextPage? true : false}
          loader={<div>laoding...</div>}
          >
          <div className='w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8'>
          {map?.map((product: any, i: number) => (
              <ProductListing
                key={`products-${i}`}
                product={product}
                index={i}
              />
            ))}
          </div>
          </InfiniteScroll>
        </div>
      </div>
    </section>
  )
}

export default ProductReel

