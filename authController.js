import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from "dotenv"
import { validationResult } from "express-validator"
import User from "./models/User.js"
import Role from "./models/Role.js"

dotenv.config()


const generateAccessToken = (id, roles) => {
    const payload = {
        id, roles
    }
    return jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "12h" })
}

class authController{

    async registration(req, res){
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: 'failed', errors: errors})
            }

            const { username, password } = req.body
            const candidate = await User.findOne({username})
            if (candidate) {
                return res.status(403).json({message: `User already exists`})
            }

            const hashedPassword = bcrypt.hashSync(password, 7)
            const userRole = await Role.findOne({value: "USER"})
            const user = new User({username, password: hashedPassword, roles: [userRole.value]})
            await user.save()

            return res.status(201).json({message: `Successfully registered`})

        } catch (err) {
            console.error(err)
            res.status(400).json("Registration failed")
        }
    }

    async login(req, res){
        try {
            const { username, password } = req.body
            const user = await User.findOne({username})
            if (!user) {
                return res.status(400).json({message: `User does not exists`})
            }

            const isPasswordValid = bcrypt.compareSync(password, user.password)
            if (!user) {
                return res.status(400).json({message: `Password is incorrect :( `})
            }

            const token = generateAccessToken(user._id, user.roles)

            return res.json({token})

        } catch (err) {
            console.error(err)
            res.status(400).json("Login failed")
        }
    }

    async getUsers(req, res){
        try {
            const users = await User.find()

            res.json(users)

        } catch (err) {
            console.error(err)
            res.status(400).json("Registration failed")
        }
    }

}

export default new authController()
