import * as z from "zod"

export const userAuthSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8)
})

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})