import { v4 } from "uuid"
import { Reply } from "../models/message.model"
import { MessageService } from "./message.service"
import { callAI } from "../utils/ai-client"

export class BotService {
	constructor(private messageService: MessageService) {}

	async generateReply(input: string): Promise<Reply> {
		return {
			id: v4(),
			sentAt: new Date(),
			from: "bot",
			question: await callAI(input),
		}
	}
}
