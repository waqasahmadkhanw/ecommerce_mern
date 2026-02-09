//steps for log out user
//remove refreshtoken
//on what basis we logout??????(authuser)
//clearcookies

import { User } from "../../models/user.model.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asnycHandler from "../../utils/asyncHandler.js";
import options from "../Options.js";

//send proper response
const logoutuser=asnycHandler(async(req,res)=>{
const userid=req.user?._id
console.log("LOGOUT USER:", req.user?._id);

const updatedUser=await User.findByIdAndUpdate(userid,{
$unset:{
    refreshToken:1
}
},
{new:true}
)

console.log("UPDATED USER:", updatedUser);
return res.status(201)
.clearCookie("refreshToken",options)
.clearCookie("accessToken",options)
.json(new ApiResponse(200,{},"User Logout successfully!"))
})
export default logoutuser