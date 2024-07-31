import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import router from './routes/student.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from "./routes/userRoute.js"
import errorHandler from './middleware/errorHandler.js'

dotenv.config()
//trying something
const PORT = 4190
const HOST = '0.0.0.0'

const app = express()

app.use(bodyParser.json())
app.use(express.urlencoded())
app.use(express.json())
// app.use(express.static('public'))
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: true }))




app.use(cors())
app.use(errorHandler)

app.use('/', router)
app.use('/user', userRouter)

app.all('*', (req, res)=>{       
        res.status(404).send('Page not found')
})

// coneect to db

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(PORT,HOST,()=>{
        console.log('We are listening at '+PORT)
    })
    console.log('connected to db')
})
.catch((error)=>{
    console.log(error)
})



