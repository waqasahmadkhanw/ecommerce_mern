import app from "./app.js";
import DbConnection from "./db/index.js";
import dotenv from "dotenv"
dotenv.config({
    path:"./.env"
})
DbConnection()
.then(()=>{
app.listen(process.env.PORT, () => {
  console.log(`Mongodb Server is running on PORT:${process.env.PORT}`)
})
})
.catch((error)=>{
    console.log("mogodb sever is failed to connect",error)
})