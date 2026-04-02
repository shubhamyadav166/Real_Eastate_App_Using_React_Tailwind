import express from 'express'
import { asyncHandler } from '../utils/asyncHandler.js'
import {signup} from '../controller/auth.controller.js'
const router =express.Router()

router.post("/signup",asyncHandler(signup))

export default router
