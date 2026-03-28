'use client'

import { useSearchParams, useRouter } from 'next/navigation';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Info, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { AuthCredentialsValidator, TAuthCredentialsValidator } from '@/lib/validators/account-credentials-validator';
import { trpc } from '@/app/_trpc/client';
import { toast } from 'sonner';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { Suspense, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const Page = () => {


  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  })

  const { mutate: signIn, isLoading } = trpc.auth.signIn.useMutation({

    onSuccess: async () => {

      toast.success('Signed in successfully')

      router.refresh()

      router.push('/')
    },
    onError: (err) => {
      if (err.data?.code === 'UNAUTHORIZED') {
        toast.error('Invalid email or password.')
      }
    },
  })

  const onSubmit = ({
    email,
    password,
  }: TAuthCredentialsValidator) => {
    signIn({ email, password })
  }

  return (
    <>
      <div className='container relative flex pt-20 flex-col items-center justify-center lg:px-0'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col items-center space-y-2 text-center'>

            <h1 className='text-2xl font-semibold tracking-tight'>
              Sign in to your account
            </h1>

            <Link
              className={buttonVariants({
                variant: 'link',
                className: 'gap-1.5',
              })}
              href='/sign-up'>
              Don&apos;t have an account?
              <ArrowRight className='h-4 w-4' />
            </Link>
          </div>

          <div className='grid gap-6 w-full max-w-md sm:max-w-xs p-4 text-gray-900 shadow mt-8 space-y-6'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='grid gap-2'>
                <div className='grid gap-1 py-2 '>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    {...register('email')}
                    className={cn({
                      'focus-visible:ring-red-500':
                        errors.email,
                    })}
                    placeholder='you@example.com'
                  />
                  {errors?.email && (
                    <p className='text-sm text-red-500'>
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className='grid gap-1 py-2'>
                  <Label htmlFor='password'>Password</Label>
                  <Input
                    {...register('password')}
                    type='password'
                    className={cn({
                      'focus-visible:ring-red-500':
                        errors.password,
                    })}
                    placeholder='Password'
                  />
                  {errors?.password && (
                    <p className='text-sm text-red-500'>
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <Button disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  )}
                  Sign in
                </Button>

              </div>
            </form>
          </div>
        </div>
        // Small UI text + card (buttons, tags, metadata)
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <h3 className="fib-14 text-[clamp(12px,0.9vw+9px,15px)] font-semibold">Small Card Title</h3>
          <p className="mt-2 fib-12 text-[clamp(11px,0.8vw+8px,13px)] text-gray-600">Very compact description text…</p>
        </div>

// Standard card (most common size)
        <div className="rounded-xl border bg-white p-6 shadow-md">
          <h2 className="fib-19 text-[clamp(16px,1.2vw+11px,20px)] font-bold">Standard Card Title</h2>
          <p className="mt-3 fib-16 text-[clamp(14px,1.0vw+10px,17px)] text-gray-700 leading-relaxed">
            Comfortable reading size for body text inside cards.
          </p>
          <button className="mt-5 fib-16 text-[clamp(14px,1.0vw+10px,17px)] px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-medium">
            Action Button
          </button>
        </div>

// Slightly larger card (feature highlight)
        <div className="rounded-2xl border bg-gradient-to-br from-white to-gray-50 p-8 shadow-lg">
          <h2 className="fib-26 text-[clamp(22px,1.7vw+15px,28px)] font-extrabold tracking-tight">Feature Headline</h2>
          <p className="mt-4 fib-19 text-[clamp(16px,1.2vw+11px,20px)] text-gray-700 max-w-prose">
            Bigger title + comfortable body text for marketing/feature sections.
          </p>
        </div>
// Tight horizontal chips / tags
        <ul className="flex flex-wrap gap-3">
          {['React', 'Tailwind', 'TypeScript', 'Next.js'].map(tag => (
            <li key={tag} className="fib-14 text-[clamp(12px,0.9vw+9px,15px)] px-4 py-1.5 bg-blue-100 text-blue-800 rounded-full font-medium">
              {tag}
            </li>
          ))}
        </ul>

// Button group – medium size
        <div className="flex flex-wrap gap-4">
          <button className="fib-19 text-[clamp(16px,1.2vw+11px,20px)] px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold shadow-sm hover:bg-indigo-700">
            Primary
          </button>
          <button className="fib-19 text-[clamp(16px,1.2vw+11px,20px)] px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50">
            Secondary
          </button>
          <button className="fib-19 text-[clamp(16px,1.2vw+11px,20px)] px-6 py-3 text-gray-700 hover:text-indigo-700 font-semibold">
            Ghost
          </button>
        </div>

// Navigation items (desktop style)
        <nav className="flex space-x-8">
          <a className="fib-16 text-[clamp(14px,1.0vw+10px,17px)] font-medium text-gray-700 hover:text-indigo-600" href="#">Home</a>
          <a className="fib-16 text-[clamp(14px,1.0vw+10px,17px)] font-medium text-gray-700 hover:text-indigo-600" href="#">Products</a>
          <a className="fib-16 text-[clamp(14px,1.0vw+10px,17px)] font-medium text-gray-700 hover:text-indigo-600" href="#">Pricing</a>
          <a className="fib-16 text-[clamp(14px,1.0vw+10px,17px)] font-medium text-indigo-600 font-semibold" href="#">Contact</a>
        </nav>
// Tight vertical list (blog cards, comments, etc.)
        <div className="space-y-6 divide-y divide-gray-200">
          <article className="pt-6 first:pt-0">
            <h3 className="fib-22 text-[clamp(18px,1.4vw+13px,24px)] font-bold">Article Title</h3>
            <p className="mt-2 fib-16 fib-16 text-[clamp(14px,1.0vw+10px,17px)] text-gray-600 line-clamp-2">Excerpt text goes here…</p>
          </article>
          {/* repeat */}
        </div>

// Medium section separation (pricing tiers, testimonials)
        <div className="space-y-12">
          <section className="rounded-2xl bg-white p-8 shadow-lg">
            <h2 className="fib-35 text-[clamp(30px,2.4vw+21px,38px)] font-bold tracking-tight">Section Heading</h2>
            <p className="mt-5 fib-19 text-[clamp(16px,1.2vw+11px,20px)] text-gray-600">Content with generous breathing room.</p>
          </section>
          {/* next section */}
        </div>

// Large hero / content blocks
        <div className="space-y-16 md:space-y-20">
          <div className="text-center">
            <h1 className="fib-65 text-[clamp(54px,5.0vw+38px,70px)] md:fib-76 md:text-[clamp(62px,6.0vw+44px,82px)] font-extrabold tracking-tight">Hero Headline</h1>
            <p className="mt-6 fib-26 text-[clamp(22px,1.7vw+15px,28px)] md:fib-30 md:text-[clamp(26px,2.0vw+18px,32px)] text-gray-700 max-w-3xl mx-auto">
              Large readable subheadline
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* feature cards */}
          </div>
        </div>
// Narrow content (blog post, documentation)
        <div className="mx-auto max-w-3xl px-5 sm:px-8 lg:px-12">
          <article className="prose prose-lg max-w-none">
            <h1 className="fib-56 text-[clamp(46px,4.2vw+32px,60px)] md:fib-65 md:text-[clamp(54px,5.0vw+38px,70px)] " >Blog Post Title</h1>
            <p className="fib-22 text-[clamp(18px,1.4vw+13px,24px)] leading-relaxed">Main article body text…</p>
          </article>
        </div>

// Wide marketing / landing page container
        <div className="mx-auto max-w-7xl px-6 lg:px-10 xl:px-12">
          <h1 className="fib-76 text-[clamp(62px,6.0vw+44px,82px)] md:fib-89 md:text-[clamp(72px,7.2vw+50px,96px)] leading-[1] font-black text-center">Very Large Hero</h1>
          {/* sections */}
        </div>

// Ultra-wide hero with massive type
        <div className="mx-auto max-w-screen-2xl px-6 md:px-12 lg:px-16">
          <h1 className="fib-89 text-[clamp(72px,7.2vw+50px,96px)] md:fib-104 md:text-[clamp(80px,8.5vw+55px,110px)] text-center font-extrabold leading-none tracking-tight">
            Massive Statement
          </h1>
        </div>
      </div>

    </>
  )
}

export default Page