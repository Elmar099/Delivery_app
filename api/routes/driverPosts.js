import express from 'express'
import {
    updateDriverProfile,
    getOrders,
    acceptOrder,
    getCoordes,
    finishOrder,
}from '../controllers/driverPost.js'


const router = express.Router()

router.put("/", updateDriverProfile)
router.get("/", getOrders)
router.get("/coords", getCoordes)
router.put("/:id", acceptOrder)
router.delete("/finish", finishOrder)

export default router