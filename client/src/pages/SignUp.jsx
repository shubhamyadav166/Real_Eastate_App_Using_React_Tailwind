import {Link} from 'react-router-dom'

const SignUp = () => {
  return (
    <div>
      <h1 className='font-semibold text-3xl my-7 text-center '>Sign Up</h1>

      <form className='flex flex-col items-center gap-5 w-full px-5'> 
        <input type="text" placeholder='Username' className=' border  rounded p-2 w-full sm:w-1/4' />
        <input type="text" placeholder='Email' className=' border  rounded p-2 w-full sm:w-1/4' />
        <input type="text" placeholder='Password' className=' border  rounded p-2 w-full sm:w-1/4' />
        <button className='   rounded p-2 w-full sm:w-1/4 bg-gray-600 text-xl text-white uppercase hover:opacity-95 disabled:opacity-80'>Sign Up</button>
      </form>
      <div className='flex justify-center w-full'>
        <div className='w-full lg:w-1/4 p-2'>
        <span>Have an Account? &nbsp;</span>
        <Link className='text-blue-500 hover:underline' to="/sign-in">
        sign in
        </Link>
        </div>
      </div>
    </div>
  )
}

export default SignUp
