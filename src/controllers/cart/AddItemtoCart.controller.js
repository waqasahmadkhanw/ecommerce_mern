import { Cart } from "../../models/catr.model";
import { Product } from "../../models/product.model";
import ApiError from "../../utils/ApiError";
import asnycHandler from "../../utils/asyncHandler";

/*
========================
2️⃣ ADD ITEM TO CART
========================
Steps:
• Get loggedin user id 
• Get productId + quantity from req.body
• Validate
• Find product
• Valiation
• Get user's cart (or create one)
• Find itemIndex with findIndex Method(to find product if already in cart
||findindex methid return product index if product exist otherwise return -1)
• If product exists → increase quantity
• Else → push new item
• Recalculate totalPrice
*/
const addItem=asnycHandler(async(req,res)=>{
const userId=req.user?._id
const {productid,quantity}=req.body
if(!productid||quantity<1){
    throw new ApiError(404,"All fields are required")
}
const product=await Product.findOne(productid)
if(!product){
    throw new ApiError(404,"Product not found")
}
const cart=await Cart.findById({user:userId})
if(!cart){
cart=await Cart.create({
        user:userId,
        items:[],
        totalAmount:0
    })
const itemIndex=cart.items.findIndex(item=>item.product.toString===productid)
if(itemIndex >-1 ){
    cart.items[itemIndex].quantity +=quantity
}else{
cart.items.push({
    user:userId,
    product:product?._id,
    price:product.price
})}
cart.totalAmount=cart.items.reduce((acc,item)=>acc + item.price*item.quantity,0)}
 await cart.save()
   return res.status(200).json(new ApiResponse(200, cart, "Item added to cart"));
})
export default addItem