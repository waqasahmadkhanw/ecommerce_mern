//steps
//get product id from req.params
//get detail that should be updated
//validation
//findandupdate
//validation

import { Product } from "../../models/product.model.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asnycHandler from "../../utils/asyncHandler.js";

//send res
const updateProduct=asnycHandler(async(req,res)=>{
try {
    const {productid}=req.params
    if(!productid){
        throw new ApiError(409,"Product ID required")
    }
    const {name,price,description,stock}=req.body
    if(!name||!price||!description||stock===undefined){
        throw new ApiError(400,"All fields are required")
    }
    const dbProduct=await Product.findByIdAndUpdate(productid,{
        $set:{
        name,
        price,
        description,
        stock
        }
    },{new:true})
    return res.status(201).json(
        new ApiResponse(200,{dbProduct},"Product details are update successfully")
    )
} catch (error) {
    throw new ApiError(403,"Smoething went wrong while updating product details")
}
}) 
export default updateProduct