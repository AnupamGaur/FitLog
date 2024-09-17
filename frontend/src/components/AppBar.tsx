import { Link } from "react-router-dom"

export const AppBar = () => {
  return (
    <div className="flex justify-between px-10 py-4 border border-b mb-6">
      <div className="font-bold">Medium</div>
      <div className="flex">
      <Link to={'/publish'}>
      <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-1 mr-14">New</button>
      </Link>
      <div>MAnupam</div>
      </div>
      

    </div>
  )
}