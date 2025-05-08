import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export default (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next()
    }

    try{
        // получаю (если есть заголовок) сам токен без типа "Bearer"
        const token = req.headers.authorization?.split(' ')[1]
        if (!token){
            res.status(403).json({ message:"User Unauthorized" })
        }

        const decodedData = jwt.verify(token, process.env.JWT_KEY)
        req.user = decodedData
        next()

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Server Error" })
    }
}