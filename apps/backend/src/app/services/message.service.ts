import { Question } from "../models/message.model"
import { MessageRepo } from "../db/message.repo"
import { BotService } from "./bot.service"

export class MessageService {
	async getAll(): Promise<Question[]> {
		return MessageRepo.getAll()
	}

	async getById(id: string): Promise<Question | null> {
		return MessageRepo.getById(id)
	}

	async create(msg: Question): Promise<Question> {
		this.getRickplyToKnownQuestion(msg)
		return MessageRepo.create(msg)
	}

	async update(id: string, data: Partial<Question>): Promise<Question | null> {
		return MessageRepo.update(id, data)
	}

	async delete(id: string): Promise<void> {
		return MessageRepo.delete(id)
	}

	async getRickplyToKnownQuestion(
		newMessage: Question
	): Promise<Question | null> {
		const knownMessages = await MessageRepo.getAll()
		const knownMessage = knownMessages.find(
			(msg) =>
				msg.question.toLocaleLowerCase() ===
				newMessage.question.toLocaleLowerCase()
		)
		if (knownMessage) {
			newMessage.answers = [ await BotService.generateRickply(newMessage.question)]
		}

		return newMessage
	}
}
