import User from '../model/user.model.js'
import bcrypt from "bcrypt";

const signup=async(req,res)=>{
// console.log(req.body);
const {email,username,password}=req.body
if(!email||!username||!password){
    return res.status(401).json({message:"All fields are required"})
}
// becrypt using await itself
const hashPassword = bcrypt.hashSync(password, 10);
const newUser=await new User({email,username,password:hashPassword})

await newUser.save()

res.status(200).json({message:"User Created Successfully",email})

}
export {signup}

