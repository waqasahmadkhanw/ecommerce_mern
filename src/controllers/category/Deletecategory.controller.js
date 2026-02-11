import { Category } from "../../models/category.model.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asnycHandler from "../../utils/asyncHandler.js";

const deletecategory=asnycHandler(async(req,res)=>{
const {id}=req.params
if(!id){
    throw new ApiError(403,"Category Id is Required")
}
const deleted=await Category.findByIdAndDelete(id)
if(!deleted){
    throw new ApiError(407,"Something went wrong while deleteing category")
}
return res.statu(201).json(
    new ApiResponse(200,{deleted},"Category deleted successfully")
)
})
export default deletecategory