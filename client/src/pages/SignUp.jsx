import { useState } from 'react'
import {Link} from 'react-router-dom'

const SignUp = () => {
const [error,setError]=useState('')
const [loading,setLoading]=useState(false)
  const [data,setData]=useState({username:"",email:"",password:""})

  const handleChange=(e)=>{
    console.log(data);
    
    setData({...data,[e.target.name]:e.target.value})
   
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
      setLoading(true)
      let res=await fetch("/api/auth/signup",
          {
           method:'POST',
           headers:{
             'Content-Type':'application/json', 
         },
          body:JSON.stringify(data)
        }
      )
      console.log(res);
      
    
      let result=await res.json()
    if(res.ok===true){
        alert(result.message)
      }
      console.log(result);
      if(result.success===false){
        setError(result.message)
        setLoading(false)
        return
      }
     
      setLoading(false)
      
    } catch (err) {
      console.log(err);
      setLoading(false)
      setError("Somthing went Wrong")
    }
    setData({username:"",email:"",password:""})
  }

  return (
    <div>
      <h1 className='font-semibold text-3xl my-7 text-center '>Sign Up</h1>

      <form onSubmit={handleSubmit} className='flex flex-col items-center gap-5 w-full px-5'> 
        <input onChange={handleChange} value={data.username} name="username" type="text" placeholder='Username' className=' border  rounded p-2 w-full sm:w-1/4' />
        <input onChange={handleChange} value={data.email} name="email" type="text" placeholder='Email' className=' border  rounded p-2 w-full sm:w-1/4' />
        <input onChange={handleChange} value={data.password} name="password" type="text" placeholder='Password' className=' border  rounded p-2 w-full sm:w-1/4' />
        <button disabled={loading} className='rounded p-2 w-full sm:w-1/4 bg-gray-600 text-xl text-white uppercase hover:opacity-95 disabled:opacity-80'>
        {loading?"Loading... ":"Sign Up"}</button>
      </form>
      <div className='flex justify-center w-full'> 
        <div className='w-full lg:w-1/4 p-2'>
        <span>Have an Account? &nbsp;</span>
        <Link className='text-blue-500 hover:underline' to="/sign-in">
        sign in
        </Link>
        </div>
      </div>
      <p className='text-red-500 text-xl'>{error}</p>
    </div>
  )
}

export default SignUp
