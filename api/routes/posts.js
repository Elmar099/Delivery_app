import express from 'express'
import { 
    addPost, 
    deletePost, 
    getPost, 
    getPosts, 
    updatePost,
    updateProfile
} from '../controllers/post.js'

const router = express.Router()

router.get("/", getPosts)
router.get("/:id", getPost)
router.post("/", addPost)
router.delete("/:id", deletePost)
router.put("/:id", updatePost)
router.put("/", updateProfile)
export default router