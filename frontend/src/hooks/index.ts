import axios from "axios"
import { useEffect, useState } from "react"
import { Backend_url } from "../../config"

interface blog {
    authorId: string,
content: string
id: string
published: boolean
title: string 
}

export const useBlogs = () => {
const [blogs,setBlogs] = useState<blog[]>([])
const [loading,setLoading] = useState(true)
useEffect(() => {
axios.get(`${Backend_url}/api/v1/blog/bulk`,
  {
    headers:{
    Authorization : ` Bearer ${localStorage.getItem('token')}`
  }
}
).then(
  (res) => {
    setBlogs(res.data.posts)
    setLoading(false)
  }
).catch((err) => console.log('Fetch could not becompleted Err:',err))
},[])
return (
  {
    blogs,
    loading
  }
)
}

export const useBlog = (id : string) => {
  const [blog,setBlog] = useState<blog>()
  const [loading,setLoading] = useState(true)
  useEffect(() => {
  axios.get(`${Backend_url}/api/v1/blog/${id}`,
    {
      headers:{
      Authorization : `Bearer ${localStorage.getItem('token')}`
    }
  }
  ).then(
    (res) => {
      setBlog(res.data.blog)
      setLoading(false)
    }
    
  ).catch((err) => console.log('Fetch could not becompleted Err:',err))
  },[id])
  return (
    {
      blog,
      loading
    }
  )
  }