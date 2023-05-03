import express from 'express'
import authRoutes from './routes/auth.js'
import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'
import cookieParser from 'cookie-parser'
import driverRoutes from './routes/driverPosts.js'
import cors from 'cors'


const app = express()

app.use(cors());
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/driverPosts', driverRoutes)



app.listen(process.env.REACT_APP_SERVER_PORT, () => {
    console.log(`App server now listening on port ${process.env.REACT_APP_SERVER_PORT}`)
})