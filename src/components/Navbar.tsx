import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'
import { Icons } from './Icons'
import { buttonVariants } from './ui/button'
import NavItems from './NavItems'
import MobileNav from './MobileNav'
import Cart from './Cart'
import UserAccountNav from './UserAccountNav'
import { getServerSideUser } from '@/lib/user'
import localFont from 'next/font/local'
import { useForm } from 'react-hook-form'
import Cartt from './Cartt'

const tahoma = localFont({
  src: "../../public/fonts/tahoma.ttf",
})

const Navbar = async () => {

  const user = await getServerSideUser() as any

  return (
    <div className={`${tahoma.className} sticky z-50 top-0 inset-x-0 h-16 [font-size-adjust:ex-height_0.52] `}>
      <header className='relative bg-[#feffef]'>
        <MaxWidthWrapper className='bg-[#feffef]'>
          <div className='h-10 hidden sm:flex items-center fib-12 text-[clamp(11px,0.8vw+8px,13px)] justify-between'>
            <Icons.Envelope className='w-5 h-5 mr-1' />
            <label className='text-[#2e2e2e] mr-3'>dimamabolo15@gmail.com</label>
            <div className='bg-[#d6d6d6] rounded-lg w-[1px] h-5'></div>
            <Icons.Map_pin_area className='w-5 ml-3 h-5 mr-1' />
            <label className='text-[#2e2e2e] mr-3'>Polokwane</label>
            <div className='bg-[#d6d6d6] rounded-lg w-[1px] h-5'></div>
            <Icons.Truck className='w-5 h-5 ml-3 mr-1' />
            <label className='text-[#2e2e2e] mr-3'>Free shipping for orders over R400</label>
            <div className='bg-[#d6d6d6] rounded-lg w-[1px] h-5'></div>
            <Icons.Phone className='w-5 h-5 ml-3 mr-1' />
            <label className='text-[#2e2e2e] mr-3'>072 020 7630</label>
            <div className='flex flex-1 items-center justify-end space-x-6'>
              <div className='flex justify-normal items-center'>
                <Icons.User_Circle className='w-5 h-5 ml-3 mr-1 flex justify-end' />
                {user ? (
                  <label className='text-[#2e2e2e] m-0 text-sm'>{user.name}</label>
                ) : <label className='text-[#2e2e2e] m-0 text-sm'>User-Name...</label>}
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
      <header className='shadow-sm bg-[#ffffff]'>
        <MaxWidthWrapper className='mb-8 '>
          <div className='h-14 items-center flex justify-between'>
            <div className='flex'>
              <MobileNav />
              <div className='hidden sm:flex items-center'>
                <Icons.Logo className='w-6 h-6' />
                <div className='w-32'></div>
              </div>
            </div>
            <div className=' hidden sm:flex items-center space-x-4 text-[#2e2e2e] fib-14 text-[clamp(12px,0.9vw+9px,15px)] font-bold'>
              <label className=''>Home</label>
              <label className=''>About</label>
              <label className=''>Blog</label>
              <label className=''>Contact</label>
            </div>
            <div className='flex items-center ml-4 lg:ml-6'>
              <button className='hidden sm:flex items-center rounded-full text-[#2e2e2e] py-[0.125rem] px-1 border-[1px] border-[#2e2e2e] fib-12 text-[clamp(11px,0.8vw+8px,13px)]'>
                  Sign-Out
                <Icons.Sign_out className='w-4 h-4 ml-1' />
              </button>
              <div className='ml-10'>
                <Cartt />
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  )
}

export default Navbar