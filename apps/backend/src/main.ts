import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { initMessageRepo } from "./app/db/message.repo"
import messageRoutes from "./app/routes/message.routes"
import path from "path"
import { Server } from "socket.io"

dotenv.config()

const PORT = process.env.PORT || 3333

async function bootstrap() {
	try {
		await initMessageRepo()

		const app = express()

		app.use("/", express.static(path.join(__dirname, "assets")))

		app.use(cors())
		app.use(express.json())

		app.use("/api/messages", messageRoutes)

		app.get("/api/health", (_, res) => {
			res.json({ status: "ok" })
		})

		const server = app.listen(PORT, () => {
			console.log(`Server running at http://localhost:${PORT}`)
		})
		const io = new Server(server, {
			cors: { origin: "*" },
		})
		app.set("io", io)
	} catch (err) {
		console.error("Failed to start server:", err)
		process.exit(1)
	}
}

bootstrap()
