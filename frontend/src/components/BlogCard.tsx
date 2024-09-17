import { Link } from "react-router-dom"

interface Blogcard {
  id: string
  authorName: string
  title: string
  content: string
  publishedDate : string
}

export const BlogCard = ({authorName,title,content,publishedDate,id}:Blogcard) => {

  return(
    
    <div >
      
    <div className="flex justify-center flex-col items-center  ">
    <div className="cursor-pointer w-1/2">
    <Link to={`/blog/${id}`}>
    <div>
    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
    <span className="font-medium text-gray-600 dark:text-gray-300">{authorName.slice(0,1)}</span>
</div>  {authorName} {publishedDate}
    </div>
    <div className="font-bold text-2xl">{title}</div>
    <div>{content.slice(0,100)+"..."}</div>
    <div>{Math.ceil(content.length/100)} min read</div>
    <div className="bg-slate-200 h-0.5 mb-5"></div>
    </Link>
    </div>
    </div>
    </div>
    
  )
}