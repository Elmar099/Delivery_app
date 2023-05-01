import express from 'express'
import authRoutes from './routes/auth.js'
import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'
import cookieParser from 'cookie-parser'
import driverRoutes from './routes/driverPosts.js'


const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/driverPosts', driverRoutes)



app.listen(8800, () => {
    console.log('listening on port: 8800')
})