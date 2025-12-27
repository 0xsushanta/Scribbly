import express, { Router } from "express"
import { signup } from "../../controllers/user/signup.controller"
import { signin } from "../../controllers/user/signin.controller"
const router:Router=express.Router()
router.post("/signup", signup)
router.post("/signin",signin)
export default router