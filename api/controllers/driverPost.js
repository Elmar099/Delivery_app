import {db} from '../db.js'
import jwt  from 'jsonwebtoken';

export const updateDriverProfile = (req, res) => {
    const token = req.cookies.access_token
    if(!token) return res.status(401).json("Not authneticated!")

    jwt.verify(token, "jwtkey", (err, userInfo)=> {
        if (err) return res.status(403).json("Token not valid")


        const q = "UPDATE drivers SET f_name=?, l_name=?, drivers_license=?, license_plate=? WHERE `id` = ?"

        const values = [
            req.body.f_name, 
            req.body.l_name,
            req.body.drivers_license,
            req.body.license_plate,
        ]

        db.query(q, [...values, userInfo.id], (err, data)=> {
            if (err) return res.status(500).json(err)

            return res.status(200).json("Profile has been updated!")
        })
    })
}

export const getOrders = (req, res) => {
    const q = "SELECT orders.id, title, details, locate, address, did FROM orders, restaurants WHERE uid = restaurants.id AND did IS NULL AND requested = 1"

    db.query(q, (err, data) => {
        if(err) return res.send(err)

        return res.status(200).json(data)
    })
}

export const acceptOrder = (req, res) => {
    const token = req.cookies.access_token
    if(!token) return res.status(401).json("Not authneticated!")

    jwt.verify(token, "jwtkey", (err, userInfo)=> {
        if (err) return res.status(403).json("Token not valid")
        // const l = "SELECT * FROM drivers WHERE id=?"
        // db.query(l,[userInfo.id], (err, data) => {
        //     if (data.number_orders <= 1){
        //         const i = "SELECT * FROM orders WHERE "
        //         return res.json("can't have more than 2")
        //     }
        // })
        const postId = req.body.postId
        const q = "UPDATE orders SET `did`=? WHERE `id` = ? "
        const p = "UPDATE drivers SET `number_orders`= `number_orders` + 1 WHERE `id` = ?"
        
        // const values = [
        //     req.body.did,
        // ]
        db.query(p, [userInfo.id], (err, data) => {
            if(err) return res.status(500).json(err)
            db.query(q, [userInfo.id, postId], (err, data)=> {
                if (err) return res.status(500).json(err)
    
                return res.json("Post has been updatedLOLOLO!")
            })
        })
    })
}