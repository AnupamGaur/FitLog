import { useState } from "react"
import { AppBar } from "../components/AppBar"
import axios from "axios"
import { Backend_url } from "../../config"

export const Publish = () => {
  const [title,setTitle] = useState('')
  const [content, setContent] = useState('')
  return (
    <div >
      <AppBar/>
      <input type="text" placeholder="Title" className="border ml-6" onChange={(e) => {setTitle(e.target.value)}} />
<textarea id="message" rows={4} className="mt-6 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..." onChange={(e) => {setContent(e.target.value)}}></textarea>
<button className="mt-6 rounded-md bg-blue-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" type="button" onClick={() => {
  axios.post(`${Backend_url}/api/v1/blog`,
    {
      "title":title,
      "content":content,
      "published":true
    },
    {
      headers:{
      Authorization:`Bearer ${localStorage.getItem('token')}`
    }
  }
  )
}}>
  Publish
</button>
    </div>
    
  )
}