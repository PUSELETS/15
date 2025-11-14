'use client'

import { Icons } from '@/components/Icons';
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
import { useRouter, useSearchParams } from 'next/navigation';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { Suspense, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const Page = () => {

  const searchParams = useSearchParams()
  const origin = searchParams.get('origin')
  const router = useRouter()

  const exchangeCode = trpc.oauth2.exchangeCode.useMutation({
    onSuccess: () => {
      router.refresh()
    },
    onError: (error) => console.error('Exchange Error:', error),
  });

  const googleLogin = useGoogleLogin({
    onSuccess: ({ code }) => {
      exchangeCode.mutate({ code }); // Send code to tRPC
      toast.success('Signed in successfully')


      router.push('/')


      router.refresh()
    },
    onError: (error) => console.error('Google Login Error:', error),
    flow: 'auth-code', // Use authorization code flow
  });

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

      if (origin) {
        router.push(`/${origin}`)
      }

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
        <div className='mt-4'>
          <button
            onClick={() => googleLogin()}
            style={{
              backgroundColor: '#4285F4',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </>
  )
}

export default Page