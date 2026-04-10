'use client'

import { PRODUCT_CATEGORIES } from './config'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Icons } from './Icons'


const MobileNav = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const pathname = usePathname()

  // whenever we click an item in the menu and navigate away, we want to close the menu
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // when we click the path we are currently on, we still want the mobile menu to close,
  // however we cant rely on the pathname for it because that won't change (we're already there)
  const closeOnCurrent = (href: string) => {
    if (pathname === href) {
      setIsOpen(false)
    }
  }

  // remove second scrollbar when mobile menu is open
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
        className='lg:hidden relative mr-4 inline-flex items-center justify-center rounded-md pr-4 text-[#6E6E6E]'>
        <Icons.List className='h-6 w-6' aria-hidden='true' />
      </button>
    )

  return (
    <div>
      <div className='relative z-40 lg:hidden'>
        <div className='fixed inset-0 bg-black bg-opacity-50' />
      </div>

      <div className='fixed overflow-y-scroll overscroll-y-none h-screen inset-0 z-40 flex'>
        <div className='w-[18.4375rem] h-screen'>
          <div className='relative flex w-full max-w-sm flex-col overflow-y-auto h-screen bg-[#FBFF6C] shadow-xl'>
            <div className='flex px-6 h-14 items-center'>
              <button
                type='button'
                onClick={() => setIsOpen(false)}
                className='relative inline-flex items-center justify-center rounded-md text-[#2e2e2e]'>
                <X className='h-5 w-5' aria-hidden='true' />
              </button>
            </div>

            <div className=' flex flex-col p-6 border-t [font-size-adjust:ex-height_0.52] text-[clamp(11px,0.8vw+8px,13px)] border-gray-200 '>
              <div className='flex items-center w-auto h-auto'>
                <Icons.Map_pin_area className='w-5 h-5 mr-1' />
                <label className='text-[#2e2e2e] mr-3'>Polokwane</label>
              </div>
              <div className='flex items-center w-auto mt-2 h-auto'>
                <Icons.Envelope className='w-5 h-5 mr-1' />
                <label className='text-[#2e2e2e] mr-3'>dimamabolo15@gmail.com</label>
              </div>
              <div className='flex items-center w-auto mt-2 h-auto'>
                <Icons.Truck className='w-5 h-5 mr-1' />
                <label className='text-[#2e2e2e] mr-3'>Delivary Availible</label>
              </div>
              <div className='flex items-center w-auto mt-2 h-auto'>
                <Icons.Phone className='w-5 h-5 mr-1' />
                <label className='text-[#2e2e2e] mr-3'>072 020 7630</label>
              </div>

            </div>
            <div className=' p-6 mt-16'>
              <div className=' flex flex-col justify-start text-[#2e2e2e] fib-14 text-[clamp(16px,1.2vw+11px,20px)] font-bold'>
                <label className='mb-1'>Home</label>
                <div className='bg-[#747474] rounded-lg w-[7.71875rem] h-[1px]'></div>
                <label className='my-1'>About</label>
                <div className='bg-[#747474] rounded-lg w-[7.71875rem] h-[1px]'></div>
                <label className='my-1'>Blog</label>
                <div className='bg-[#747474] rounded-lg w-[7.71875rem] h-[1px]'></div>
                <label className='my-1'>Contact</label>
                <div className='bg-[#747474] rounded-lg w-[7.71875rem] h-[1px]'></div>
              </div>
            </div>
            <div className='flex items-center justify-center w-auto h-[7.03125rem]'>
              <button className='flex items-center rounded-full text-[#2e2e2e] py-[0.125rem] px-1 border-[1px] border-[#2e2e2e] fib-12 text-[clamp(11px,0.8vw+8px,13px)]'>
                Sign-Out
                <Icons.Sign_out className='w-4 h-4 ml-1' />
              </button>
            </div>

            <div className=' hidden sm:flow-root'>
              <Link
                onClick={() => closeOnCurrent('/sign-in')}
                href='/sign-in'
                className=' font-medium text-gray-900'>
                Sign in
              </Link>
            </div>
            <div className=' hidden sm:flow-root'>
              <Link
                onClick={() => closeOnCurrent('/sign-up')}
                href='/sign-up'
                className='font-medium text-gray-900'>
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileNav