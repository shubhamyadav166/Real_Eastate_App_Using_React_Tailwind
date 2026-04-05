import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import {DatabaseConnect} from './database/dbConnect.js'
import UserRouter from './router/user.route.js'
import AuthRouter from './router/auth.route.js'
import cors from 'cors'
const app=express()

const port=3333

DatabaseConnect()
app.use(cors({
  origin: "http://localhost:5173/",
  credentials: true
}));
app.use(express.json())
app.use("/api/user",UserRouter)

app.use("/api/auth",AuthRouter)
app.listen(port,()=>console.log(`server is running on ${port} !!!`))

app.use((err,req,res,next)=>{
    const status=err.statusCode||500
    const message=err.message||'Internal Server Error'
    return res.status(status).json({
        success:false,
        status,
        message
    })

})