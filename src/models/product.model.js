import mongoose, { Schema } from "mongoose";

const productSchema=new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
    },
    stock:{
        type:Number,
        required:true,
        min:1,
        default:0
    },
},{timestamps:true})


export const Product=mongoose.model("Product",productSchema)