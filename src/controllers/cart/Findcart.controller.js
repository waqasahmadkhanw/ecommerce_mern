import { Cart } from "../../models/catr.model.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asnycHandler from "../../utils/asyncHandler.js";

const findCart=asnycHandler(async(req,res)=>{
const id=req?.user
if(!id){
    throw new ApiError(403,"Invalid user credentials")
}
const cart=await Cart.findById(id)
return res.status(201).json(
    new ApiResponse(200,{items:{},user:user?.req},"User does not have cart")
)
})
export default findCart