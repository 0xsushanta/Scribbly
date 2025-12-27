import exress,{ Router } from "express";
import { middleware } from "../../middlewares/auth.middleware";
import { room } from "../../controllers/room/room.controller";

const router:Router= exress.Router()
router.post("/room",middleware,room )
export default router