import {db} from '../db.js'
import jwt  from 'jsonwebtoken';

export const getPosts = (req, res) => {
    const q = req.query.cat
    ? "SELECT * FROM orders WHERE cat=?"
    : "SELECT * FROM orders"; 

    db.query(q, [req.query.cat], (err, data) => {
        if (err) return res.status(500).json(err)

        return res.status(200).json(data)
    })
}
export const getPost = (req, res) => {
    const q = "SELECT p.id, `username`, `title`, `locate`, `desc`, `cat` FROM restaurants u JOIN orders p ON u.id=p.uid WHERE p.id = ?"
    db.query(q, [req.params.id], (err, data)=> {
        if (err) return res.status(500).json(err)

        return res.status(200).json(data[0])
    })
}
export const addPost = (req, res) => {
    const token = req.cookies.access_token
    if(!token) return res.status(401).json("Not authneticated!")

    jwt.verify(token, "jwtkey", (err, userInfo)=> {
        if (err) return res.status(403).json("Token not valid")

        const q = "INSERT INTO orders(`title`, `locate`, `desc`, `uid`) VALUES (?)"
        
        const values = [
            req.body.title, 
            req.body.locate,
            req.body.desc,
            userInfo.id
        ]

        db.query(q, [values], (err, data)=> {
            if (err) return res.status(500).json(err)

            return res.json("Post has been created!")
        })
    })
}
//check cookie
export const deletePost = (req, res) => {
    const token = req.cookies.access_token
    if(!token) return res.status(401).json("Not authneticated!")

    jwt.verify(token, "jwtkey", (err, userInfo)=> {
        if (err) return res.status(403).json("Token not valid")

        const postId = req.params.id
        const q = "DELETE FROM orders WHERE `id` = ? AND `uid` = ?"

        db.query(q, [postId, userInfo.id], (err, data) => {
            if (err) return res.status(403).json("You can only delete your posts!")

            return res.status(200).json("Post deleted")
        })
    })
}
export const updatePost = (req, res) => {
    const token = req.cookies.access_token
    if(!token) return res.status(401).json("Not authneticated!")

    jwt.verify(token, "jwtkey", (err, userInfo)=> {
        if (err) return res.status(403).json("Token not valid")

        const postId = req.params.id
        const q = "UPDATE orders SET `title`=?, `locate`=?, `desc`=? WHERE `id` = ? AND `uid` = ?"
        
        const values = [
            req.body.title,
            req.body.locate, 
            req.body.desc,
        ]

        db.query(q, [...values, postId, userInfo.id], (err, data)=> {
            if (err) return res.status(500).json(err)

            return res.json("Post has been updated!")
        })
    })
}

export const updateProfile = (req, res) => {
    const token = req.cookies.access_token
    if(!token) return res.status(401).json("Not authneticated!")

    jwt.verify(token, "jwtkey", (err, userInfo)=> {
        if (err) return res.status(403).json("Token not valid")


        const q = "UPDATE restaurants SET name=?, address=?, license_number=? WHERE id = ?"

        const values = [
            req.body.name, 
            req.body.address,
            req.body.license_number,
        ]

        db.query(q, [...values, userInfo.id], (err, data)=> {
            if (err) return res.status(500).json(err)

            return res.status(200).json("Profile has been updated!")
        })
    })
}