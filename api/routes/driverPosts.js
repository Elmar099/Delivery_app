import express from 'express'
import {
    updateDriverProfile,
    getOrders,
    acceptOrder,
}from '../controllers/driverPost.js'


const router = express.Router()

router.put("/", updateDriverProfile)
router.get("/", getOrders)
router.put("/:id", acceptOrder)

export default router