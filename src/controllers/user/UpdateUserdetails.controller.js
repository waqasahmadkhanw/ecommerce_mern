//steps
//get data from req.body 
//validation 
//find user by logedin user id

import { User } from "../../models/user.model.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asnycHandler from "../../utils/asyncHandler.js";

//send the response
const updateUserdetails=asnycHandler(async(req,res)=>{
const {name,email}=req.body
if(!email||!name){
    throw new ApiError(403,"All fields are required!")
}
const updateduser=await User.findByIdAndUpdate(req.user?._id,{
   $set:{
    name,
    email 
   }
},{new:true}).select("-password")
return res.status(201).json(new ApiResponse(201,updateduser,"User account updated successfully!"))
})
export default updateUserdetails