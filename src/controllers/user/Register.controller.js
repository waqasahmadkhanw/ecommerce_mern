//steps to register a user
 //01_get data from req.body (name,email,password,role)
 //02_this data comes from fronted basically it is stored in schema
 //03_check every field if empty then throw error(some())
 //04_check with email password or name if user already exist then throw error
 //08_validation
 //09_create user in database
 //10_validation
 //response

import { User } from "../../models/user.model.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asnycHandler from "../../utils/asyncHandler.js";

 //return proper response
 const Register=asnycHandler(async(req,res)=>{
const {name,email,password,role}=req.body
if( [name,email,password,role].some((field)=>field?.trim()=="")){
    throw new ApiError(403,"All fields are required!")
}
const existedUser=await User.findOne({
    $or:[{email},{name}]
})
if (existedUser){
    throw new ApiError(402," User  with this email or password already existed,Please login")
}
const user=await User.create({
  name,
  email,
  password,
  role  
})
if(!user){
    throw new ApiError(401,"Something went wron while creating a user!!")
}
const createduser=await User.findById(user._id).select("-password")
return res.status(200).json(
    new ApiResponse(201,createduser,"User Registered successfully!")
)
 })
 export default Register

