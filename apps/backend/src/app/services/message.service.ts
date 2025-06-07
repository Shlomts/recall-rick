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
		msg = await this.getRickplyToKnownQuestion(msg)
		return await MessageRepo.create(msg)
	}

	async update(id: string, data: Partial<Question>): Promise<Question | null> {
		return MessageRepo.update(id, data)
	}

	async delete(id: string): Promise<void> {
		return MessageRepo.delete(id)
	}

	async getRickplyToKnownQuestion(newMessage: Question): Promise<Question> {
		const knownMessages = await MessageRepo.getAll()
		const knownMessage = knownMessages.find(
			(msg) =>
				msg.question.toLocaleLowerCase() ===
					newMessage.question.toLocaleLowerCase() && msg.answers.length > 0
		)

		if (knownMessage) {
			const answers = knownMessage.answers.map((answer) => answer.question)
			newMessage.answers = [
				await BotService.generateRickply(newMessage.question, answers),
			]
		}

		return newMessage
	}
}
