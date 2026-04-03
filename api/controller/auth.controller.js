import User from '../model/user.model.js'
import bcrypt from "bcrypt";
import {asyncHandler} from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js';


const signup=asyncHandler(async(req,res)=>{
// console.log(req.body);
const {email,username,password}=req.body
if(!email||!username||!password){
  throw new ApiError(400,"All fields are required...!!!!!!!!!!")
}

const existedUser=await User.findOne({
  $or:[{email},{username}]
})
if(existedUser){
  throw new ApiError(400,"User Already Exist Please Sign in")
}
// becrypt using await itself
const hashPassword = await bcrypt.hash(password, 10);
const newUser= new User({email,username,password:hashPassword})

await newUser.save()

res.status(200).json({message:"User Created Successfully",email})

})
export {signup}

