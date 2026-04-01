import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import {DatabaseConnect} from './databse/dbConnect.js'
const app=express()
const port=3333

DatabaseConnect()

app.get("/",(req,res)=>{
    res.send("Hello this is home page")
})
app.listen(port,()=>console.log(`server is running on ${port} !!!`))

