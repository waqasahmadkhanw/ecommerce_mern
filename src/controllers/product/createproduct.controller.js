//steps 
//get data from req.body
//validation 
//check product if already in db
//validation create 
//validation 

import { Product } from "../../models/product.model.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asnycHandler from "../../utils/asyncHandler.js";

//send proper res
const createProduct=asnycHandler(async(req,res)=>{
const {name,description,stock,price}=req.body||{}
if(!name||!description||stock===undefined||price===undefined){
    throw new ApiError(406,"All fields are required")
}
const existedProduct=await Product.findOne({name})
if(existedProduct){
    throw new ApiError(403,"Product with this name already existed!!")
}
const productCreation=await Product.create({
    name,
    description,
    stock,
    price
})
if(!productCreation){
    throw new ApiError(403,"Something went wrong while creating Product!")
}
return res.status(201).json(
    new ApiResponse(200,productCreation,"Product created successfully")
)
})
export default createProduct