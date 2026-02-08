//steps 
//get data from req.body
//validation 
//check product if already in db
//validation create 
//validation 

import asnycHandler from "../../utils/asyncHandler.js";

//send proper res
const createProduct=asnycHandler(async(req,res)=>{
const {name,description,stock,category,price}=req.body
})
export default createProduct