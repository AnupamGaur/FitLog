import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks"

export const Blogs = () => {
  const {blogs, loading} = useBlogs()
  if(loading){
    return(
      <div>Loading...</div>
    )
  }
  return (
    <div >
            <AppBar/>
      {blogs.map(blog => 
        <div><BlogCard authorName="Venky J." content={blog.content} publishedDate="12/23/12" title={blog.title} id={blog.id}/>
        </div>
      )}

    </div>
  )
}



