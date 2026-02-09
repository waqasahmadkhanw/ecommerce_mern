//steps to generate tokens
//get userid //find user  from db on the basis of userid
//validation 
//if user found then call our custom methods to generate tokens
//save refreshtoeken in db
//return both access sand refreshtoken
import { User } from "../models/user.model.js"
import ApiError from "../utils/ApiError.js"
const generateAccessandRefreshtokens=async(usereId)=>{
try {
    const user=await User.findById(usereId)
    if(!user){
        throw new ApiError(403,"This user can noyt registered")
    }
    const accessToken=user.generateAccessToken()
    const refreshToken=user.generateRefreshToken()
    user.refreshToken=refreshToken
    await user.save({ validateBeforeSave: false })
    return {accessToken,refreshToken}
} catch (error) {
    throw new ApiError(402,error,"Something went wrong while generating access and refresh tokens")
}

}

export default generateAccessandRefreshtokens