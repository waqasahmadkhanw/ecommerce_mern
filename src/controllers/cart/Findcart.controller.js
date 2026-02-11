import { Cart } from "../../models/catr.model.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asnycHandler from "../../utils/asyncHandler.js";

const getCart=asnycHandler(async(req,res)=>{
const id=req?.user
if(!id){
    throw new ApiError(403,"Invalid user credentials")
}
const cart=await Cart.findById(id)
if(!cart){
return res.status(201).json(
    new ApiResponse(200,{items:{},totalAmount:0},"User does not have cart")
)
}

return res.status(201).json(
    new ApiResponse(200,cart,"User does not have cart")
)
})
export default getCart