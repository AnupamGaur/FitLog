import {string, z} from 'zod'

export const signupinput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})


export const signininput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})


export const createbloginput = z.object({
  title: z.string(),
  content: z.string(),
  published: z.boolean()
})


export const updatebloginput = z.object({
  title: z.string(),
  content: z.string()
})

export type signupinput = z.infer<typeof signupinput>
export type signininput = z.infer<typeof signininput>
export type createbloginput = z.infer<typeof createbloginput>
export type updatebloginput = z.infer<typeof updatebloginput>