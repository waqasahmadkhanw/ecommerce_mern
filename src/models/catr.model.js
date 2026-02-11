import mongoose, { Schema } from "mongoose";
///steps
//make schema 
//ref of user //ref of product
//we make ref of product as a seprate mini schema(in this schema we use quantity)
//then write in cart schema
//we take total price
const itemsSchems=new Schema({
   product:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Product",
    required:true
   },
    quantity:{
        type:Number,
        required:true,
        default:1
    },
    price:{
        type:Number,
        required:true
    }
})
const cartSchema=new Schema({
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
    unique:true
},
items:[itemsSchems],
totalAmount:{
    type:Number,
    required:true,
    default:0

},
// totalquantity:{
//     type:Number,
//     required:true,
//     default:0
// },
},{timestamps:ture})
export const Cart=mongoose.model("Cart",cartSchema)