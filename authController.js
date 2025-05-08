import User from "./models/User.js"
import Role from "./models/Role.js"

class authController{

    async registration(req, res){
        try {

        } catch (err) {
            console.log(err)
        }
    }

    async login(req, res){
        try {

        } catch (err) {
            console.log(err)
        }
    }

    async getUsers(req, res){
        try {


            res.json("it's works")

        } catch (err) {
            console.log(err)
        }
    }

}

export default new authController()
