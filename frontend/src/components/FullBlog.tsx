import { useBlog } from "../hooks"

export const FullBlog = ({id}:{id : string}) => {
  const {blog,loading} = useBlog(id)
  return (
    <div>
    Title is: {blog?.title}
    </div>
  )
}