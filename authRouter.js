import { Router } from "express"
import { check } from "express-validator"
import controller from "./authController.js"
import authMiddleware from "./middlewares/authMiddleware.js";
import roleMiddleware from "./middlewares/roleMiddleware.js";

const router = new Router()

router.post('/reg', [
    check("username", "Username is empty").not().isEmpty(),
    check("password", "Password must be longer than 5 symbols").isLength({min: 6})
],
    controller.registration)

router.post('/auth', controller.login)

router.get('/users', roleMiddleware(["ADMIN"]), controller.getUsers)


export default router
