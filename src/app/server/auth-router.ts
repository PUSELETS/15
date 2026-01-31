import { AuthCredentialsValidator } from "../../lib/validators/account-credentials-validator";
import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import { v4 as uuid } from "uuid";
import { TRPCError } from "@trpc/server";
import { SignJWT } from "jose";
import { getJwtSecretKey } from "../../lib/auth";
import { setPayload } from "@/lib/email";
import { where } from "firebase/firestore";
import { database } from "../firebase";


export const authRouter = router({
    createUser: publicProcedure
        .input(z.object({
            email: z.string().email(),
            password: z.string().min(8, {
                message: "Password must be at least 8 characters long."
            }),
            
        }))
        .mutation(async ({ input }) => {
            const { email, password } = input

            //check if user exist
            const document = await database.customer.list([where("email", "==", email )]);

            if (document.length !== 0)
                throw new TRPCError({ code: 'CONFLICT' })

            //create user

            const token = uuid()
            const data = {
                email,
                password,
                Token: token,
                varified: false
            }

            await database.customer.create(data)

            const URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=`
            const tokenUrl = `${token}`
            const cancatinateUrl = URL + tokenUrl

            setPayload(cancatinateUrl)

            return { success: true, Email: email, url: cancatinateUrl } 
        }),

    verifyEmail: publicProcedure
        .input(z.object({ token: z.string() }))
        .query(async ({ input }) => {
            const { token } = input

            const respon = await database.customer.list([where("Token", "==", token)]);

            const isV = await database.customer.update({ verified: true }, respon.documents[0].$id );

            if (!isV)
                throw new TRPCError({ code: 'UNAUTHORIZED' })

            return { success: true }
        }),

    signIn: publicProcedure
        .input(AuthCredentialsValidator)
        .mutation(async ({ input }) => {
            const { email, password } = input
            //check if user exist
            const userExist = await database.customer.list([where("email", "==", email)]);

            if (userExist.length == 0)
                throw new TRPCError({ code: 'CONFLICT' })

            try {

                const payload = {
                    email: email,
                    password: password
                }

                const token = await new SignJWT(payload)
                    .setProtectedHeader({ alg: 'HS256' })
                    .setJti(uuid())
                    .setIssuedAt()
                    .setExpirationTime('5m')
                    .sign(new TextEncoder().encode(getJwtSecretKey()))

                return { success: true, token: token }

            } catch (err) {
                throw new TRPCError({
                    code: 'UNAUTHORIZED',
                    message: 'Invalid email or password'
                })
            }
        }),
})








