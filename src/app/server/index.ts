export const dynamic = "force-dynamic";
import { Query } from 'appwrite';

import { z } from "zod";
import { authRouter } from "./auth-router";
import { publicProcedure, router } from "./trpc";
import { QueryValidator } from "@/lib/validators/query-validator";
import { databases, db } from "../database";

export const appRouter = router({
    auth: authRouter,
    getInfiniteProducts: publicProcedure.input(z.object({
        limit: z.number().min(1).max(100),
        cursor: z.number(),
        query: QueryValidator,
    })).query(async ({ input }) => {
        const { query, cursor } = input
        const { sort, limit, ...queryOpts } = query
        
        const select = Object.values(queryOpts)

        console.log(cursor, 'cursor in the building')

        const data = await db.products.list(
            [
                Query.limit(limit),
                Query.offset(cursor)
            ]
        )

        return {...data , cursor}

    })
})

export type AppRouter = typeof appRouter