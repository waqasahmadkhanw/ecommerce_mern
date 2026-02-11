import ApiError from "../../utils/ApiError.js"
import ApiResponse from "../../utils/ApiResponse.js"
import asnycHandler from "../../utils/asyncHandler.js"

const updateCategory=asnycHandler(async(req,res)=>{
const {id} =req.body
if(!id){
    throw new ApiError(408,"Category ID is required")
}
const {name,description}=req.body
if(!name||!description){
    throw new ApiError(403,"All fields are required!")
}
const updatedvalues=await Category.findByIdAndUpdate(id,{
    $set:{
        name,
        description
    }
},{new:true})
if(!updatedvalues){
    throw new ApiError(403,"Something went wrong while updating the category")
}
return res.status(201).json(
    new ApiResponse(200,updatedvalues,"Category updated successfully")
)
})
export default updateCategory