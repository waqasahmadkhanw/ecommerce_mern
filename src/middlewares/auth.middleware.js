//steps 
//get token from req.cookie or header
//if token found then verify by jwt
//check user on basis of verified user
//if user foundd then send it in req
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import asnycHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"


const AuthenticateUser=asnycHandler(async(req,_,next)=>{
try {
    const token=req.cookies.accessToken||req.header("Authorization")?.replace("Bearer ","")
    if(!token){
        throw new ApiError(401,"Invalid token")
    }
    const verifiedToken=jwt.verify(token,ACCESS_TOKEN_SECRET)
    const user=await User.findById(verifiedToken?._id).select("-password -refreshToken")
    if(!user){
        throw new ApiError(400,"User can not found with this token")
    }
    
    req.user=user
    next()
} catch (error) {
    throw new ApiError(402,error?.message||"Invalid accesstoken")
}
})
export default AuthenticateUser