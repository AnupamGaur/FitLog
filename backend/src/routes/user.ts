import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import { sign } from 'hono/jwt'
import { signininput, signupinput } from '@anupamgaur/common'
import bcrypt from 'bcrypt'
export const userRouter = new Hono<{
Bindings:{
  DATABASE_URL:string,
  JWT_SECRET:string
}
}>()

userRouter.post('/signup', async (c) => {
  const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())
    const body = await c.req.json();
    if(!signupinput.safeParse(body).success){
      c.status(400)
      return c.json({
        "msg":"Your inputs are not correct."
      })
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);
    const user = await prisma.user.create({
      data :{
        email : body.email,
        password : hashedPassword
      }
    })
    const token = await sign({
     id: user.id
    },c.env.JWT_SECRET)
    return c.json({ jwt: token })
  })
  
  userRouter.post('/signin', async (c) =>{
    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const body = await c.req.json()
    if(!signininput.safeParse(body).success){
      c.status(400)
      return c.json({
        "msg":"Your inputs are not correct."
      })
    }
    const user = await prisma.user.findUnique({
      where : {
        email : body.email,
        }
    })
    if (!user){
      c.status(403)
      return c.json({
        "msg":'Not a valid User'
      })
    }
    const isValid = await bcrypt.compare(body.password,user.password)
    if(!isValid){
      c.status(403)
      return c.json({
        "msg":'Not a valid User'
        })
        }
    const token = await sign({
      id: user.id
    },c.env.JWT_SECRET)
    return c.json({
      jwt:token
    })
  })
  