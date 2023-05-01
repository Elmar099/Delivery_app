import express from 'express'
import {
    updateDriverProfile,
    getOrders
}from '../controllers/driverPost.js'

const router = express.Router()

router.put("/", updateDriverProfile)
router.get("/", getOrders)

export default router