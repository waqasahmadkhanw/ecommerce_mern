import { Category } from "../../models/category.model.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse";
import asnycHandler from "../../utils/asyncHandler.js";

const createCategory=asnycHandler(async(req,res)=>{
const {name,description}=req.body
if(!name||!description){
    throw new ApiError(406,"All fields are required")
}
const existedCategory=await Category.find({name})
if(existedCategory){
    throw new ApiError(405,"PLease add another category .this category already in db")
}
const newCategory=new Category.create({
    name,
    description
})
if(!newCategory){
    throw new ApiError(406,"Something went wrong while creating new  category!!")
}
return res.status(201).json(
    new ApiResponse(200,newCategory,"Category created successfully!!")
)
})
export default createCategory