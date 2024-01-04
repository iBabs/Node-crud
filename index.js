import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import router from './routes/user.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const PORT = 4190
const HOST = '0.0.0.0'

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.use('/', router)
app.get('/', (req, res)=>{
    res.send('Hi there')
})

app.all('*', (req, res)=>{       
    res.send('Page not found')
    res.sendStatus(404)
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



