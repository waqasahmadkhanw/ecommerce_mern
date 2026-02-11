import { Product } from "../../models/product.model.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asnycHandler from "../../utils/asyncHandler.js";

const deleteAllProducts=asnycHandler(async(req,res)=>{

 const result=await Product.deleteMany({})
     return res.status(201).json(
        new ApiResponse(200,{ deletedCount: result.deletedCount } ," All Products deleted successfully"))
})
const deleteProduct=asnycHandler(async(req,res)=>{

    const {productid}=req.params
    if(!productid){
        throw new ApiError(406,"Invalid Product id")
    }
    const deletedProduct=await Product.findByIdAndDelete(productid)
    return res.status(201).json(
        new ApiResponse(200,deletedProduct, "Product deleted successfully")
    )

})
export {deleteAllProducts,deleteProduct}