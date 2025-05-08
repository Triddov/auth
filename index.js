import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRouter from "./authRouter.js"

dotenv.config()
const PORT = process.env.PORT || 80
const DB_MONGO_URL = process.env.DB_MONGO_URL || " "

const app = express()

app.use(express.json())
app.use('/api', authRouter)
 

const startApp = async () => {
    try{
        await mongoose.connect(DB_MONGO_URL)
        app.listen(PORT, () => console.log(`=== SERVER RUNNING ON ${PORT} ===`))

    } catch (err) {
        console.error(err)
    }

}

startApp()





