import express from 'express'
import {
    updateDriverProfile,
    getOrders,
    acceptOrder,
    getCoordes,
    deletePost,
    finishOrder,
}from '../controllers/driverPost.js'


const router = express.Router()

router.put("/", updateDriverProfile)
router.get("/", getOrders)
router.get("/coords", getCoordes)
router.put("/:id", acceptOrder)
router.delete("/:id", deletePost)
router.put("/finish", finishOrder)

export default router