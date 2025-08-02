'use client'

import { ShoppingCart, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Separator } from './ui/separator'
import Link from 'next/link'
import { buttonVariants } from './ui/button'
import Image from 'next/image'
import { ScrollArea } from './ui/scroll-area'
import { useEffect, useState } from 'react'
import { useCart } from "./hooks/use-cart"
import { formatPrice } from "@/lib/utils"
import CartItem from "./CartItems"


const MobileNav = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const { items } = useCart()
    const itemCount = items.length

    const [isMounted, setIsMounted] = useState<boolean>(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const cartTotal = items.reduce(
        (total, { product }) => total + product.Price,
        0
    )

    const fee = 1

    const pathname = usePathname()

    useEffect(() => {
        setIsOpen(false)
    }, [pathname])

    const closeOnCurrent = (href: string) => {
        if (pathname === href) {
            setIsOpen(false)
        }
    }

    useEffect(() => {
        if (isOpen)
            document.body.classList.add('overflow-hidden')
        else document.body.classList.remove('overflow-hidden')
    }, [isOpen])

    if (!isOpen)
        return (
            <button
                type='button'
                onClick={() => setIsOpen(true)}
                className=' relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400'>
                <ShoppingCart aria-hidden='true' className="h-6 w-6 flex-shrink-0 text-[#6E6E6E] group-hover:text-[#4E4E4E]" />
                <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                    {isMounted ? itemCount : 0}
                </span>
            </button>
        )

    return (
        <div >
            <div className='relative z-40 sm:hidden'>
                <div className='fixed inset-0 bg-black bg-opacity-25' />
            </div>

            <div className='overflow-y-auto overscroll-y-none h-full inset-0 z-40 flex fixed '>
                <div className='w-full h-full'>
                    <div className='relative flex w-full max-w-sm flex-col overflow-y-scroll bg-white pb-12 shadow-xl'>
                        <div className='flex px-4 pb-2 pt-5'>
                            <button
                                type='button'
                                onClick={() => setIsOpen(false)}
                                className='relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400'>
                                <X className='h-6 w-6' aria-hidden='true' />
                            </button>
                        </div>

                        <div className="space-y-2 px-6">
                            <h2>Cart ({itemCount})</h2>
                        </div>

                        {itemCount > 0 ? (
                            <div className='h-full flex-col items-center justify-center space-y-1'>
                                <div className='flex w-full flex-col px-6'>
                                    {items.map(({ product }) => (
                                        <CartItem
                                            product={product}
                                            key={product.$id}
                                        />
                                    ))}
                                </div>
                                <div className='space-y-4 px-6'>
                                    <Separator />
                                    <div className='space-y-1.5 text-sm'>
                                        <div className='flex'>
                                            <span className='flex-1'>Shipping</span>
                                            <span>Free</span>
                                        </div>
                                        <div className='flex'>
                                            <span className='flex-1'>
                                                Transaction Fee
                                            </span>
                                            <span>{formatPrice(fee)}</span>
                                        </div>
                                        <div className='flex'>
                                            <span className='flex-1'>{formatPrice(cartTotal + fee)}</span>
                                            <span>
                                                {formatPrice(1)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className='space-y-6 border-t border-gray-200 px-4 py-6'>
                                        <div className='flow-root'>
                                            <Link
                                                href='/cart'
                                                className={buttonVariants({
                                                    className: 'w-full',
                                                })}>
                                                Continue to Checkout
                                            </Link>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ) : (
                            <div className='flex h-full flex-col items-center justify-center space-y-1'>
                                <div
                                    aria-hidden='true'
                                    className='relative mb-4 h-60 w-60 text-muted-foreground'>
                                    <Image
                                        src='/hippo-empty-cart.png'
                                        fill
                                        alt='empty shopping cart hippo'
                                    />
                                </div>
                                <div className='text-xl font-semibold'>
                                    Your cart is empty
                                </div>
                                <div className='space-y-6 border-t border-gray-200 px-4 py-6'>
                                    <div className='flow-root'>
                                        <Link
                                            href='/products'
                                            className={buttonVariants({
                                                variant: 'link',
                                                size: 'sm',
                                                className:
                                                    'text-sm text-muted-foreground',
                                            })}>
                                            Add items to your cart to checkout
                                        </Link>
                                    </div>
                                </div>

                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MobileNav