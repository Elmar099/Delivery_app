import express from 'express'
import { 
    addPost, 
    deletePost, 
    getPost, 
    getPosts, 
    getProfile,
    updateOrder, 
    updatePost,
    updateProfile,

} from '../controllers/post.js'

const router = express.Router()

router.get("/", getPosts)
router.get("/:id", getPost)
router.get("/profile", getProfile)
router.post("/", addPost)
router.delete("/:id", deletePost)
router.put("/:id", updatePost)
router.put("/", updateProfile)
router.put("/update/:id", updateOrder)

export default router