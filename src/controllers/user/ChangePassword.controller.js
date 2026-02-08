//steps
//get newpassword and oldpassword from req.body
//validation
//verify password
//validation

import { User } from "../../models/user.model.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asnycHandler from "../../utils/asyncHandler.js";

//save password return response
const changePassword=asnycHandler(async(req,res)=>{
const {oldPassword,newPassword}=req.body
if(!oldPassword&&!newPassword){
    throw new ApiError(400,"password are required!")
}
const user=await User.findById(req.user?._id)
if(!user){
    throw new ApiError(402,"User can not found")
}

const isValidPassword=await user.isPasswordCorrect(oldPassword)
if(!isValidPassword){
    throw new ApiError(402,"Invalid Password")
}
user.password=newPassword
await user.save({validateBeforeSave:false})
return res.status(201).json(
    new ApiResponse(200,"Password changed successfully")
)
})
export default changePassword