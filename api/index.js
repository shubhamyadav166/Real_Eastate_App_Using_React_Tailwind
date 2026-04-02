import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import {DatabaseConnect} from './database/dbConnect.js'
import UserRouter from './router/user.route.js'
import AuthRouter from './router/auth.route.js'
const app=express()

const port=3333

DatabaseConnect()
app.use(express.json())
app.use("/api/user",UserRouter)

app.use("/api/auth",AuthRouter)
app.listen(port,()=>console.log(`server is running on ${port} !!!`))

