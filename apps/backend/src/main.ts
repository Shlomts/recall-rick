import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { initMessageRepo } from "./app/db/message.repo"
import messageRoutes from "./app/routes/message.routes"
import botRoutes from "./app/routes/bot.routes"

dotenv.config()

const PORT = process.env.PORT || 3333

async function bootstrap() {
	try {
		await initMessageRepo()

		const app = express()

		app.use(cors())
		app.use(express.json())

		app.use("/api/messages", messageRoutes)
		app.use("/api/bot", botRoutes)

		app.get("/api/health", (_, res) => {
			res.json({ status: "ok" })
		})

		app.listen(PORT, () => {
			console.log(`Server running at http://localhost:${PORT}`)
		})
	} catch (err) {
		console.error("Failed to start server:", err)
		process.exit(1)
	}
}

bootstrap()
