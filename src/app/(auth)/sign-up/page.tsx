'use client'
import React, { useEffect } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icons } from "@/components/Icons";
//import { AuthCredentialsValidator, TAuthCredentialsValidator } from "../lib/validators/account-credentials-validator";
import { trpc } from "@/app/_trpc/client";
import { toast } from 'sonner'
import { z } from "zod";
import { ZodError } from 'zod'
import { useRouter } from 'next/navigation'
import { setPayload } from "@/lib/email";



function Page() {

    const AuthCredentialsValidator = z.object({

        email: z.string().email(),
        password: z.string().min(8, {
            message: "Password must be at least 8 characters long."
        }),

    })
    type TAuthCredentialsValidator = z.infer<typeof AuthCredentialsValidator>
    const {
        register,
        handleSubmit,
        formState: { errors } } = useForm<TAuthCredentialsValidator>({
            resolver: zodResolver(AuthCredentialsValidator)
        })
    const router = useRouter()
    const { mutate, isLoading } = trpc.auth.createUser.useMutation({
        onError: (err) => {
            if (err.data?.code === 'CONFLICT') {
                toast.error(
                    'This email is already in use. Sign in instead?'
                )
                return
            }
            if (err instanceof ZodError) {
                toast.error(err.issues[0].message)

                return
            }
            toast.error(
                'Something went wrong. Please try again.'
            )
        },
        onSuccess: async ({ Email }) => {

            toast.success(
                `Verification email sent to ${Email}.`
            )
            router.push('/verify-email?to=' + Email)
        },
    })
    const onSubmit = ({
        email,
        password,
    }: TAuthCredentialsValidator) => {
        mutate({ email, password })
    }

    const handleGoogleLogin = () => {
    // This does a full-page redirect – no popup, no COOP issues ever
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?` +
      new URLSearchParams({
        client_id: '998739097556-70fouava5r7dph2jhvhj5i84fbjk9h6f.apps.googleusercontent.com',
        redirect_uri: 'https://15canary.netlify.app/api/OAuth',  // your callback page
        response_type: 'code',
        scope: 'openid email profile',
        access_type: 'offline',
        prompt: 'consent',           // forces refresh token first time
      });
  };


    return (
        <>
            <div className='container relative flex pt-20 flex-col items-center justify-center lg:px-0'>
                <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
                    <div className='flex flex-col items-center space-y-2 text-center'>

                        <h1 className='text-2xl font-semibold tracking-tight'>
                            Create an account
                        </h1>
                        <Link
                            className={buttonVariants({
                                variant: 'link',
                                className: 'gap-1.5',
                            })}
                            href='/sign-in'>
                            Already have an account? Sign-in
                            <ArrowRight className='h-4 w-4' />
                        </Link>
                    </div>

                    <div className='grid gap-6 w-full max-w-md sm:max-w-xs p-4 text-gray-900 shadow mt-8 space-y-6'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div  className='grid gap-2'>

                                <div className='grid gap-1 py-2'>
                                    <Label htmlFor='password'>Email</Label>
                                    <Input
                                        {...register('email')}
                                        className={cn({
                                            'focus-visible:ring-red-500':
                                                errors.email,
                                        })}
                                        placeholder='you@example.com'
                                    />
                                    {errors?.email && (
                                        <p className="text-red-500">
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
                                        placeholder='password'
                                    />
                                    {errors?.password && (
                                        <p className="text-red-500">
                                            {errors.password.message}
                                        </p>
                                    )}
                                </div>

                                <Button disabled={isLoading}>
                                    {isLoading && (
                                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                    )}
                                    Sign up
                                </Button>

                            </div>
                        </form>
                        <button onClick={handleGoogleLogin} className="px-4 mt-4 py-2 bg-blue-600 text-white rounded">
                            Sign in with Google
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page
