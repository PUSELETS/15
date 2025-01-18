import { optional, z } from 'zod'

export const QueryValidator = z.object({
  category: z.string().optional(),
  sort: z.string(),
  limit: z.number(),
})

export type TQueryValidator = z.infer<typeof QueryValidator>