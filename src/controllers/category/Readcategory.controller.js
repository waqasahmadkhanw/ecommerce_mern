import { Category } from "../../models/category.model.js"
import ApiError from "../../utils/ApiError.js"
import ApiResponse from "../../utils/ApiResponse.js"
import asnycHandler from "../../utils/asyncHandler.js"

const ReadCategory=asnycHandler(async(req,res)=>{
const {id}=req.params
if(!id){
    throw new ApiError(403,"Category ID is Required")
}
const categorydb=await Category.findById(id)
if(!categorydb){
    throw new ApiError(403,"Category not found")
}
return res.status(201).json(
    new ApiResponse(200,categorydb,"Single category fetched successfully")
)
})
const ReadAllCategory=asnycHandler(async(req,res)=>{
    const allcategory=await Category.find({})
    if(allcategory){
    throw new ApiError(403,"Category not found")
}
return res.status(200).json(
    new ApiResponse(200,allcategory,"All category fetched successfully")
)
})
export {ReadAllCategory,ReadCategory}