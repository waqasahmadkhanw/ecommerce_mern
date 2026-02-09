//steps to write code login user
//get data from req.body 
//validation 
//check user from db
//validation
//generate tokens
//check password 
//send tokens in cookies

import { User } from "../../models/user.model.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asnycHandler from "../../utils/asyncHandler.js";
import generateAccessandRefreshtokens from "../GenerateAccessandRefreshtoken.js";
import options from "../Options.js";

// 
const Loginuser=asnycHandler(async(req,res)=>{
const {username,email,password}=req.body ||{}
console.log("name property we get",name,email,password)
if(!username&&!email||!password){
throw new ApiError(401,"All fields are required")
}
const user=await User.findOne({
    $or:[{email},{username}]
})
if(!user){
    throw new ApiError(405,"You email or password is incorrect")
}
const isValidPassword=await user.isPasswordCorrect(password)
if(!isValidPassword){
    throw new ApiError(403,"Invalid crenditials!!")
}
const login=await User.findById(user._id).select("-password -refreshToken")

const {accessToken,refreshToken}=await generateAccessandRefreshtokens(user._id)
return res.status(201)
.cookie("accessToken",accessToken,options)
.cookie("refreshToken",refreshToken,options)
.json(
    new ApiResponse(200,{user:login,accessToken,refreshToken}," User login Successfully")
)
})
export default Loginuser