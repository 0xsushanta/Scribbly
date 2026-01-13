import exress,{ Router } from "express";
import { middleware } from "../../middlewares/auth.middleware";
import { room } from "../../controllers/room/room.controller";
import { getChat } from "../../controllers/room/chat.controller";

const router:Router= exress.Router()
router.post("/room",middleware,room )
router.get("/chats/:roomId",getChat)
export default router