import bcrypt from 'bcrypt'
import { validationResult } from "express-validator"
import User from "./models/User.js"
import Role from "./models/Role.js"

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

        } catch (err) {
            console.error(err)
            res.status(400).json("Login failed")
        }
    }

    async getUsers(req, res){
        try {


            res.json("it's works")

        } catch (err) {
            console.error(err)
            res.status(400).json("Registration failed")
        }
    }

}

export default new authController()
