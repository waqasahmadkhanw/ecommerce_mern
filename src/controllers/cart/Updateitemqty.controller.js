//steps
//get loggedin user id
//get product id and quantity
//validation
//find user cart
//if not cart throw error
//if cart is present then find that prouct which should be updated
//if no match product throw error otherwise increase qty

import { Cart } from "../../models/catr.model.js";
import ApiError from "../../utils/ApiError.js";
import asnycHandler from "../../utils/asyncHandler.js";

//send response
const updateitemQty=asnycHandler(async(req,res)=>{
const userid=req.user._id
const {productid,quantity}=req.body
if(!productid||quantity<1){
    throw new ApiError(400,"All fields are required")
}
const cart=await Cart.findOne({user:userid})
if(!cart){
    throw new ApiError(404,"Cart not found")
}
const item=await cart.items.find(item=>item.product.toString()===productid)
if (!item) throw new ApiError(404, "Product not in cart");
item.quantity=quantity
//recalculate
cart.totalAmount=cart.items.reduce((acc,item)=>acc+item.quantity*item.price)
await cart.save()
return res.status(200).json(new ApiResponse(200, cart, "Cart updated successfully"));
})
export default updateitemQty