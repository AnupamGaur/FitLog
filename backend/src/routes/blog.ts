import { createbloginput, updatebloginput } from '@anupamgaur/common'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import { verify } from 'hono/jwt'

export const blogRouter = new Hono<{
  Bindings:{
    DATABASE_URL:string,
    JWT_SECRET:string
  },
  Variables: {
    userId: string
  }
  }>()

  blogRouter.use('/*',async (c,next) => {
    const header = c.req.header("Authorization") || ''
    const token = header.split(' ')[1]
    const response = await verify(token,c.env.JWT_SECRET)
    if(response.id){
      c.set("userId",String(response.id))    // Jugaad
      await next();
    }
    else{
      c.status(403)
      return c.json({
        "msg":"Unauthorized"
      })
    }
  })


blogRouter.post('/',async (c) => {
  const prisma = new PrismaClient({
   datasourceUrl : c.env.DATABASE_URL
  }).$extends(withAccelerate())
  const body = await c.req.json()
  if(!createbloginput.safeParse(body).success){
    c.status(400)
    return c.json({
      "msg":"Your inputs are not correct."
    })
  }
  const authorId = c.get("userId")
  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      published: body.published,
      authorId: authorId
    }
  })
  return c.json({
    "id":post.id
  })
})

blogRouter.put('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL
   }).$extends(withAccelerate())
   const body = await c.req.json()
   if(!updatebloginput.safeParse(body).success){
    c.status(400)
    return c.json({
      "msg":"Your inputs are not correct."
    })
  }
   const post = await prisma.post.update({
    where: {
      id: body.id
    },
     data: {
       title: body.title,
       content: body.content,
     }
   })
   return c.json({
     "id":post.id
   })
})


blogRouter.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL
   }).$extends(withAccelerate())
   const posts = await prisma.post.findMany()
   if(!posts) {
    c.status(404)
    return c.json({
      "msg":"No blogs yet"
    })
   }
  return c.json({posts})
})

blogRouter.get('/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL
   }).$extends(withAccelerate())
   const id = c.req.param('id')
   try {
   const post = await prisma.post.findFirst({
    where: {
      id: id
    }
   })
   return c.json({
    "blog":post
  })
  }
  catch {
    c.status(400)
    c.json({
      "msg": "Error Here",
      "id":id
    })
  }
})

