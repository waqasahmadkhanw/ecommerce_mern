import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
const userSchema=new Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true
    },
    email:{
        type:String,
        required:[true, "email must be required"],
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:[true,"password must be required"]
    },
    // Image:{
    //     type:String,
    //     required:true
    // },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    refreshToken:{
        type:String
    }
},{timestamps:true}

)
//hash password before save data in db
userSchema.pre("save",async function () {
    if(!this.isModified("password")) return;
  this.password=await bcrypt.hash(this.password,10)
});
//make custom method to check password 
userSchema.methods.isPasswordCorrect=async function(password){
 return await bcrypt.compare(password,this.password)
};
//make custom method to generateacesstoken
userSchema.methods.generateAccessToken=function(){
return jwt.sign({
 _id:this._id,
 email:this.email,
 name:this.name
}, 
process.env.ACCESS_TOKEN_SECRET, 
{ expiresIn:process.env.ACCESS_TOKEN_EXPIRY});
};
//make custom method to generarefreshtoken
userSchema.methods.generateRefreshToken=function(){
return jwt.sign({
 _id:this._id,
},
process.env.REFRESH_TOKEN_SECRET,
{expiresIn:process.env.REFRESH_TOKEN_EXPIRY})}
export const User=mongoose.model("User",userSchema)