import { Router } from "express"
import controller from "./authController.js"

const router = new Router()

router.post('/reg', controller.registration)
router.post('/auth', controller.login)
router.get('/users', controller.getUsers)

export default router
