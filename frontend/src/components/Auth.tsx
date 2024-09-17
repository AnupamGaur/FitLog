import { signupinput } from "@anupamgaur/common"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {Backend_url} from '../../config.ts'
import axios from 'axios'
import { useBlog } from "../hooks/index.ts"
export const Auth = ({type} : {type:"signup"|"signin"}) => {
  const navigate = useNavigate()
  const [postInputs,setPostInputs] = useState<signupinput>({
    password:"",
    email:"",
    })

    const makereq = async () => {
      try {
     const response = await axios.post(`${Backend_url}/api/v1/user${type === "signup"? "/signup":"/signin"}`,{
        "email":postInputs.email,
        "password":postInputs.password
    })
    const res = response.data
    console.log(res)
    localStorage.setItem('token',res.jwt)
    navigate('/blogs')
  } catch {
        (err: any) => console.log("erroe check kr",err)
  }
      console.log('req is made')
    }
  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <div className="flex justify-center flex-col space-y-3">
          <div className="font-bold text-3xl">Create an Account</div>
          <div className="text-gray-500">{type === "signup"?"Already Have an Account?":"Don't Have an Account?"} 
            <Link className="underline underline-offset-2 pl-2" to={type === "signup"? "/signin" : "/signup"}>
            {type === "signup"?"SignIn":"SignUp"}</Link>
            </div>
            <div>
              <div className="font-semibold">Email</div>
              <input className = "border mt-3 h-7 w-full"type="text" onChange={e => {
                setPostInputs({
                  ...postInputs,
                  email:e.target.value
                })
                }}/>
            </div>
            <div>
              <div className="font-semibold">Password</div>
              <input className = "border mt-3 h-7 w-full"type="password" onChange={e => {
                setPostInputs({
                  ...postInputs,
                  password:e.target.value
                })
                }}/>
            </div>
            <div className="bg-black h-8 w-full text-white flex items-center justify-center" onClick={makereq}>{type === "signup"?"Sign Up":"Sign In"}</div>
        </div>
      </div>
    </div>
  )
}