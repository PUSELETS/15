import { limit, startAfter, getDoc, doc, QueryConstraint, where } from "firebase/firestore";
import { z } from "zod";
import { authRouter } from "./auth-router";
import { publicProcedure, router } from "./trpc";
import { OAuth2Client } from 'google-auth-library';
import { database } from '../firebase';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const SCOPES = ['https://www.googleapis.com/auth/userinfo.email','https://www.googleapis.com/auth/userinfo.profile'];

const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

export const appRouter = router({
    auth: authRouter,

    

    getPosts: publicProcedure
        .input(z.object({ limit: z.number().default(2), cursor: z.string().optional() }))
        .query(async ({ input }) => {
            // Set default limit if not provided
            const limitValue = input.limit ?? 2;

            // Build Firestore query constraints
            const queries: QueryConstraint[] = [limit(limitValue + 1)];
            if (input.cursor) {
                const cursorDoc = await getDoc(doc(database.db, "product_info", input.cursor));
                if (!cursorDoc.exists()) throw new Error(`Cursor document ${input.cursor} not found`);
                queries.push(startAfter(cursorDoc));
            }
            // Call database.products.list with constraints
            const documents = await database.products.list(queries);

            const hasNextPage = documents.length > limitValue;
            return {
                posts: documents.slice(0, limitValue),
                nextCursor: hasNextPage ? documents[documents.length - 1].id : null,
            };
        })
})

export type AppRouter = typeof appRouter