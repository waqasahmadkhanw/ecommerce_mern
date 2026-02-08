import cookieParser from "cookie-parser"
import express from "express"
import cors from "cors"//Allows frontend to talk to backend
const app=express()//to make an app
app.use(cors({
    origin:process.env.CORS_ORIGIN,// e.g. http://localhost:6000
    credentials:true // allow cookies/auth headers
}))
app.use(express.json({limit:"16kb"}))//Parses JSON body
app.use(express.urlencoded({extended:true,limit:"16kb"}))//parses form data
app.use(express.static("public"))//Serves files from /public
app.use(cookieParser())//Reads cookies from requests
// ================= ROUTES =================//
//http://localhost:6000/api/v1/user/register
import registerRouter from "./routes/user.route.js"
app.use("/api/v1/user",registerRouter)
export default app