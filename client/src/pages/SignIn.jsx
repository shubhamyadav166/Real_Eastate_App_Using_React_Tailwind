import React from 'react'
import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
const SignIn = () => {


const [error,setError]=useState('')
const [loading,setLoading]=useState(false)
  const [data,setData]=useState({email:"",password:""})
  let navigate=useNavigate()

  const handleChange=(e)=>{
    
    console.log(data);
    
    setData({...data,[e.target.name]:e.target.value})
   
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
      setLoading(true)
      let res=await fetch("/api/auth/signin",
          {
           method:'POST',
            credentials: "include",
           headers:{
             'Content-Type':'application/json', 
         },
          body:JSON.stringify(data)
        }
      )
      console.log(res);
      
    
      let result=await res.json()
    if(res.ok===true){
        alert("Login Successfully")
      }
      console.log(result);
      if(result.success===false){
        setError("This is not vrified user")
        setLoading(false)
        return
      }
     
      setLoading(false)
      setError(null)
      navigate('/')
    } catch (err) {
      console.log(err);
      setLoading(false)
      setError("Somthing went Wrong")
    }
    setData({username:"",email:"",password:""})
  }

  return (
    <div>
      <h1 className='font-semibold text-3xl my-7 text-center '>Sign In</h1>

      <form onSubmit={handleSubmit} className='flex flex-col items-center gap-5 w-full px-5'> 
       
        <input onChange={handleChange} value={data.email} name="email" type="text" placeholder='Email' className=' border  rounded p-2 w-full sm:w-1/4' required/>
        <input onChange={handleChange} value={data.password} name="password" type="text" placeholder='Password' className=' border  rounded p-2 w-full sm:w-1/4' required />
        <button disabled={loading} className='rounded p-2 w-full sm:w-1/4 bg-gray-600 text-xl text-white uppercase hover:opacity-95 disabled:opacity-80'>
        {loading?"Loading... ":"Sign In"}</button>
      </form>
      <div className='flex justify-center w-full'> 
        <div className='w-full lg:w-1/4 p-2'>
        <span> Dont Have an Account? &nbsp;</span>
        <Link className='text-blue-500 hover:underline' to="/sign-up">
        sign up
        </Link>
        </div>
      </div>
      <div className='flex justify-center  p-2'><p className='text-red-500 text-xl w-full sm:w-1/4'>{error}</p></div>
    </div>
  )
}



export default SignIn
