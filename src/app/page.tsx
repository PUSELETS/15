
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { header } from "../components/Header";
import { rate } from "../components/rate";
import { suthead } from "../components/paragraph";
import {
  ArrowDownToLine,
  CheckCircle,
  Leaf,
} from 'lucide-react'
import ProductReel from "@/components/ProductReel";
import Image from "next/image";
import localFont from "next/font/local";
import type { NextPage } from 'next';
import { getServerSideUser } from "@/lib/user";


const rounded = localFont({
  src: "./fonts/Milker.otf",
})

const kelvenica = localFont({
  src: "./fonts/helvetica-rounded-bold-5871d05ead8de.otf",
})


const perks = [
  {
    name: 'Instant Delivery',
    Icon: ArrowDownToLine,
    description:
      'Get your assets delivered to your email in seconds and download them right away.',
  },
  {
    name: 'Guaranteed Quality',
    Icon: CheckCircle,
    description:
      'Every asset on our platform is verified by our team to ensure our highest quality standards. Not happy? We offer a 30-day refund guarantee.',
  },
  {
    name: 'For the Planet',
    Icon: Leaf,
    description:
      "We've pledged 1% of sales to the preservation and restoration of the natural environment.",
  },
]

const Homes: NextPage = () => {

  
 
  return (
    
      <section className="relative">
        <section className="circle w-full h-[12.90625rem]">
            <Image
              src="/upgrade.png"
              alt='product category image'
              fill
              className=' object-center'
            />
        </section>
      <MaxWidthWrapper className="">
        <div className={`mx-auto text-start flex flex-col items-start max-w-3xl ${rounded.className}`}>
          
          <header.logo className=' w-[17.25rem] h-[3.25rem] mt-[14.40625rem]' />
          <suthead.logo className=' w-[15.63125rem] h-[i.94375rem] mt-[0.5rem]' />
          <rate.logo className="w-[6.275rem] h-[1.075rem] mt-[0.75rem]" />
          <button className="flex content-center items-center justify-center mt-[3.61875rem] bg-[#60A5FA] w-[8.65rem] h-[3rem] rounded-[5px] text-[0.875rem] text-[#2E2E2E]">
            order now
          </button>
        </div>
        <ProductReel
          href='/products?sort=recent'
          title='Brand new'
        />
      </MaxWidthWrapper>
      <section className='border-t border-gray-200 bg-[#ffffff]'>
        <MaxWidthWrapper className='py-20'>
          <div className='grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0'>
            {perks.map((perk) => (
              <div
                key={perk.name}
                className='text-center md:flex md:items-start md:text-left lg:block lg:text-center'>
                <div className='md:flex-shrink-0 flex justify-center'>
                  <div className='h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900'>
                    {<perk.Icon className='w-1/3 h-1/3' />}
                  </div>
                </div>

                <div className='mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6'>
                  <h3 className='text-base font-medium text-gray-900'>
                    {perk.name}
                  </h3>
                  <p className='mt-3 text-sm text-muted-foreground'>
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
      
      </section>
  

  )
}

export default Homes;
