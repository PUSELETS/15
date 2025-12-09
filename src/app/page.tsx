
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
import { Menu, X, ChevronDown, Star, ShoppingCart, Eye, Heart } from 'lucide-react';
import { getServerSideUser } from "@/lib/user";


const rounded = localFont({
  src: "./fonts/Milker.otf",
})

const kelvenica = localFont({
  src: "./fonts/helvetica-rounded-bold-5871d05ead8de.otf",
})


const Homes: NextPage = () => {



  return (
    <>
    {/* Main Banner */}
      <section className="pt-4 pb-12 border-b-4 border-dotted border-gray-200" id="top">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Left Banner */}
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <Image src="/assets/images/left-banner-image.jpg" alt="We Are Hexashop" width={800} height={600} className="w-full" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
                <div className="pl-16 text-white">
                  <h4 className="text-5xl font-bold mb-4">We Are Hexashop</h4>
                  <p className="text-lg italic mb-8">Awesome, clean &amp; creative HTML5 Template</p>
                  <a href="#" className="inline-block border-2 border-white px-10 py-4 font-semibold hover:bg-white hover:text-[#2a2a2a] transition">
                    Purchase Now!
                  </a>
                </div>
              </div>
            </div>

            {/* Right Grid */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { title: 'Women', subtitle: 'Best Clothes For Women', img: '/assets/images/baner-right-image-01.jpg' },
                { title: 'Men', subtitle: 'Best Clothes For Men', img: '/assets/images/baner-right-image-02.jpg' },
                { title: 'Kids', subtitle: 'Best Clothes For Kids', img: '/assets/images/baner-right-image-03.jpg' },
                { title: 'Accessories', subtitle: 'Best Trend Accessories', img: '/assets/images/baner-right-image-04.jpg' },
              ].map((item) => (
                <div key={item.title} className="relative group overflow-hidden rounded-lg shadow-lg">
                  <Image src={item.img} alt={item.title} width={400} height={400} className="w-full" />
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-center text-white p-6">
                    <div>
                      <h4 className="text-2xl font-bold mb-3">{item.title}</h4>
                      <p className="mb-6">Lorem ipsum dolor sit amet, conservisii ctetur adipiscing elit incid.</p>
                      <a href="#" className="inline-block border-2 border-white px-6 py-3 hover:bg-white hover:text-[#2a2a2a] transition">Discover More</a>
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h4 className="text-2xl font-bold">{item.title}</h4>
                    <span className="italic text-sm">{item.subtitle}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Men's Section */}
      <section className="py-24 border-b-4 border-dotted border-gray-200" id="men">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Men&apos;s Latest</h2>
            <p className="text-gray-500 italic">Details to details is what makes Hexashop different from the other themes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Classic Spring', price: '$120.00', img: '/assets/images/men-01.jpg' },
              { name: 'Air Force 1 X', price: '$90.00', img: '/assets/images/men-02.jpg' },
              { name: 'Love Nana ‘20', price: '$150.00', img: '/assets/images/men-03.jpg' },
            ].map((product) => (
              <div key={product.name} className="group">
                <div className="relative overflow-hidden rounded-lg">
                  <Image src={product.img} alt={product.name} width={400} height={500} className="w-full" />
                  <div className="absolute inset-x-0 -bottom-20 group-hover:bottom-8 opacity-0 group-hover:opacity-100 transition-all duration-500 flex justify-center space-x-4">
                    <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-[#2a2a2a] hover:text-white transition"><Eye /></a>
                    <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-[#2a2a2a] hover:text-white transition"><Heart /></a>
                    <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-[#2a2a2a] hover:text-white transition"><ShoppingCart /></a>
                  </div>
                </div>
                <div className="text-center pt-6">
                  <h4 className="text-xl font-bold mb-2">{product.name}</h4>
                  <span className="text-lg text-gray-500">{product.price}</span>
                  <div className="flex justify-center mt-3 text-yellow-500">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Repeat for Women, Kids, Explore, Social, Subscribe, Footer... */}
      {/* You can copy-paste the same pattern */}

      {/* Footer */}
      <footer className="bg-[#2a2a2a] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <Image src="/assets/images/white-logo.png" alt="Hexashop" width={160} height={60} className="mb-6" />
              <ul className="space-y-3 text-sm opacity-90">
                <li>16501 Collins Ave, Sunny Isles Beach, FL 33160</li>
                <li>hexashop@company.com</li>
                <li>010-020-0340</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6">Shopping &amp; Categories</h4>
              <ul className="space-y-3"><li><a href="#" className="hover:text-gray-300">Men’s Shopping</a></li><li><a href="#" className="hover:text-gray-300">Women’s Shopping</a></li><li><a href="#" className="hover:text-gray-300">Kid&apos;s Shopping</a></li></ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6">Useful Links</h4>
              <ul className="space-y-3"><li><a href="#" className="hover:text-gray-300">Homepage</a></li><li><a href="#" className="hover:text-gray-300">About Us</a></li><li><a href="#" className="hover:text-gray-300">Help</a></li><li><a href="#" className="hover:text-gray-300">Contact Us</a></li></ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6">Help &amp; Information</h4>
              <ul className="space-y-3"><li><a href="#" className="hover:text-gray-300">Help</a></li><li><a href="#" className="hover:text-gray-300">FAQ&apos;s</a></li><li><a href="#" className="hover:text-gray-300">Shipping</a></li><li><a href="#" className="hover:text-gray-300">Tracking ID</a></li></ul>
            </div>
          </div>
          <div className="border-t border-white/30 mt-12 pt-8 text-center">
            <p className="text-sm opacity-90">Copyright © 2025 HexaShop Co., Ltd. All Rights Reserved.</p>
            <div className="flex justify-center space-x-8 mt-6 text-2xl">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-linkedin-in"></i></a>
              <a href="#"><i className="fab fa-behance"></i></a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Homes;
