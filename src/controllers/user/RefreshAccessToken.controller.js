//steps
//get token from req.cookies ||req.body
//validation 
//verify token
//user find on basis of that token
//generate tokens for that user
//send tokens in cookie

import { User } from "../../models/user.model.js";
import ApiError from "../../utils/ApiError.js";
import asnycHandler from "../../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import generateAccessandRefreshtokens from "../GenerateAccessandRefreshtoken.js";
import ApiResponse from "../../utils/ApiResponse.js";
import options from "../Options.js";

//send response
const refreshAccessToken=asnycHandler(async(req,res)=>{
const incomingtoken=req.cookies.refreshToken||req.body.refreshToken
if(!incomingtoken){
    throw new ApiError(403,"Invalid refresh token")
}
const decodedToken=jwt.verify(incomingtoken,process.env.REFRESH_TOKEN_SECRET)
const user=await User.findById(decodedToken?._id)
if(!user){
    throw new ApiError(400,"User can not found")
}
if(user.refreshToken!==incomingtoken){
    throw new ApiError(401,"refreshtoken is expired or used"); 
}
const {accesstoken,newrefreshToken}=await generateAccessandRefreshtokens(user?._id)
return res.status(201)
.cookie("accesstoken",accesstoken,options)
.cookie("refreshToken",newrefreshToken,options)
.json(
    new ApiResponse(200,"User token refreshed successfully")
)
})

export default refreshAccessToken