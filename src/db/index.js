// Here we will write code for database connection
//We need mongoose to make db connection
//Make async arrow function 
//Use trycatch because error can happened

import mongoose from "mongoose"
console.log("mongodburi",process.env.MONGODB_URI)
const DbConnection=async()=>{
try {
    const Db=await mongoose.connect(`${process.env.MONGODB_URI}`)
    console.log(`mongo db is connected:${Db.connection.host}`)
} catch (error) {
    console.log("mongodb is failed to connect",error)
    process.exit(1)
}
}
export default DbConnection