import { v4 } from "uuid"
import { Reply } from "../models/message.model"
import { callAI } from "../utils/ai-client"

export class BotService {
	static async generateRickply(input: string, answers: string[] = []): Promise<Reply> {
		return {
			id: v4(),
			sentAt: new Date(),
			from: "bot",
			question: await callAI(input, answers),
		}
	}
}
