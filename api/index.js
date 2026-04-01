import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import {DatabaseConnect} from './database/dbConnect.js'
import UserRouter from './router/user.route.js'
const app=express()
const port=3333


DatabaseConnect()

app.use("/api/user",UserRouter)
app.listen(port,()=>console.log(`server is running on ${port} !!!`))

