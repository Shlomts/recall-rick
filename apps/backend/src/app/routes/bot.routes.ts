import express from "express"
import { getBotReply } from "../controllers/bot.controller"

const router = express.Router()

router.post("/ask", getBotReply)

export default router
