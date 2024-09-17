import { useParams } from "react-router-dom"
import { FullBlog } from "../components/FullBlog"


export const Blog = () => {
  const {id} = useParams();
  return (
    <div >
      <FullBlog id={id || ''}></FullBlog>
    </div>
  )
}