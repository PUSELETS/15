import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'
import { Icons } from './Icons'
import { buttonVariants } from './ui/button'
import NavItems from './NavItems'
import MobileNav from './MobileNav'
import Cart from './Cart'
import UserAccountNav from './UserAccountNav'
import { getServerSideUser, deleteCookies } from '@/lib/user'
import { useForm } from 'react-hook-form'
import Cartt from './Cartt'

const Navbar = async () => {

  const user = await getServerSideUser() 

  return (
    <div className=' sticky z-50 top-0 inset-x-0 h-16'>
      <header className='relative bg-[#ffffff]'>
        <MaxWidthWrapper>
          <div className=''>
            <div className='h-16 items-center flex justify-between'>
              <MobileNav />

              

              <div className=' flex items-center'>
                <div className='flex flex-1 items-center justify-end space-x-6'>
                  {user ? null : (
                    <Link
                      href='/sign-in'
                      className={buttonVariants({
                        variant: 'ghost',
                      })}>
                      Sign in
                    </Link>
                  )}

                  {user ? null : (
                    <span
                      className='h-6 w-px bg-gray-200'
                      aria-hidden='true'
                    />
                  )}

                  {user ? (
                    <UserAccountNav user={user} />
                  ) : (
                    <Link
                      href='/sign-up'
                      className={buttonVariants({
                        variant: 'ghost',
                      })}>
                      Create account
                    </Link>
                  )}

                  {user ? (
                    <span
                      className='h-6 w-px bg-gray-200'
                      aria-hidden='true'
                    />
                  ) : null}

                  {user ? null : (
                    <div className='flex lg:ml-6'>
                      <span
                        className='h-6 w-px bg-gray-200'
                        aria-hidden='true'
                      />
                    </div>
                  )}
                </div>
                <div className='ml-4 flow-root lg:ml-6'>
                   
                   <Cartt />
                </div>
                
              </div>
              <div className='hidden z-50 lg:ml-8 lg:block lg:self-stretch'>
                
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  )
}

export default Navbar