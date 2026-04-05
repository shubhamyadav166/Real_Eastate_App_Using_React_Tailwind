import User from '../model/user.model.js'
import bcrypt from "bcrypt";
import {asyncHandler} from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js';
import jwt from "jsonwebtoken";

const generateToken=(id)=>{
const token = jwt.sign({ id:id},process.env.JWTSECRET,{expiresIn:"1d"});
return token
}


const signup=asyncHandler(async(req,res)=>{
// console.log(req.body);
const {email,username,password}=req.body
// if(!email||!username||!password){
//   throw new ApiError(400,"All fields are required...!!!!!!!!!!")
// }
if([username,email,password].some(field=>!field||field.trim()==="")){
  throw new ApiError(400,"All Fields are required ")
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
 
const {name=username,Mail=email}=newUser._doc
console.log(name,Mail);

// const createdUser=User.findById(newUser._id).select("-password")

res.status(200).json({
  success:true,
  message:` User of this name: ${name} Created Successfully`,

})

})


// sign in function 
const signIn=asyncHandler(async(req,res)=>{

const {email,password}=req.body

const existedUser=await User.findOne({email})
if(!existedUser){
  throw new ApiError(404,"User not found Please Sign Up")
}

// becrypt compare using await itself
const hashPassword =bcrypt.compareSync(password, existedUser.password);
if(!hashPassword){
  throw new ApiError(401, "Wrong Credentials", false)
}
// Token creation 

const token=generateToken(existedUser._id)

const {password:pass,...rest}=existedUser._doc
res.cookie("token", token,
  {
  httpOnly: true,
  secure: false,       // false for localhost
  sameSite: "strict",     // IMPORTANT
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/",
})
.status(200)
.json({
  success:true,
  message:"Login Successfully ",

})

})


export {signup,signIn,generateToken}



