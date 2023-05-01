import express from 'express'
import {
    updateDriverProfile,
}from '../controllers/driverPost.js'

const router = express.Router()

router.put("/", updateDriverProfile)

export default router