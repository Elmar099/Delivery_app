import { db } from "../db.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = (req, res)=> {
    //check existing user
    var q 
    if (req.body.accType == "restaurants") {
        q = `SELECT * FROM restaurants WHERE email = ? OR username = ?`
    } 
    else{
        q = `SELECT * FROM drivers WHERE email = ? OR username = ?`
    }

    db.query(q, [req.body.email, req.body.name], (err, data) => {
        if (err) return res.json(err)
        if (data.length) return res.status(409).json("User already exists!")
        
        //Hash the password and create a user
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)

        var q 
        if (req.body.accType == "restaurants") {
            q = "INSERT INTO restaurants(`username`, `email`, `password`) VALUES (?)"
        } 
        else{
            q = "INSERT INTO drivers(`username`, `email`, `password`) VALUES (?)"
        }
        const values = [
            req.body.username,
            req.body.email,
            hash,
        ]

        db.query(q, [values], (err, data) => {
            if(err) return res.json(err)
        return res.status(200).json('User has been created!')    
        })
    })
}

export const reset = (req, res)=> {
    var q 
    if (req.body.accType == "restaurants") {
        q = `SELECT * FROM restaurants WHERE email = ?`
    } 
    else{
        q = `SELECT * FROM drivers WHERE email = ?`
    }
    db.query(q, [req.body.email], (err, data) => {
        if(err) return res.json(err)
    if (data.length === 0) return res.status(409).json("User not found!")
    })

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)
    
    var q 
        if (req.body.accType == "restaurants") {
            q = "UPDATE restaurants SET password = ? WHERE email = ?"
        } 
        else{
            q = "UPDATE drivers SET password = ? WHERE email = ?"
        }
        const values = [
            hash,
            req.body.email,
        ]

        db.query(q, values, (err, data) => {
            if(err) return res.json(err)
        return res.status(200).json('User has been created!')    
        })

}

export const login = (req, res)=> {
    //Check User exists
    var q 
    if (req.body.accType == "restaurants") {
        q = "SELECT * FROM restaurants WHERE username = ?"
    } 
    else{
        q = "SELECT * FROM drivers WHERE username = ?"
    }


    db.query(q, [req.body.username], (err, data) => {
        if(err) return res.json(err)
    if (data.length === 0) return res.status(409).json("User not found!")

    //Check password
    const isCorrect = bcrypt.compareSync(req.body.password, data[0].password)
        if(!isCorrect) return res.status(400).json("Wrong username or password")  
        
        const token = jwt.sign({ id: data[0].id}, "jwtkey")
        const {password, ...other} = data[0]

        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(data[0])
    })
}

export const logout = (req, res)=> {
    res.clearCookie("access_token", {
        sameSite: 'none', 
        secure: true, 
    }).status(200).json("User has been logged out!")
}

