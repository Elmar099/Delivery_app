import express from 'express'
import { register, login, logout, reset} from '../controllers/auth.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.post('/reset', reset)



export default router