import { Question } from "../models/message.model"
import { MessageRepo } from "../db/message.repo"

export class MessageService {
	async getAll(): Promise<Question[]> {
		return MessageRepo.getAll()
	}

	async getById(id: string): Promise<Question | null> {
		return MessageRepo.getById(id)
	}

	async create(msg: Question): Promise<Question> {
		return MessageRepo.create(msg)
	}

	async update(id: string, data: Partial<Question>): Promise<Question | null> {
		return MessageRepo.update(id, data)
	}

	async delete(id: string): Promise<void> {
		return MessageRepo.delete(id)
	}

	async isReplyToKnownQuestion(newMessage: string): Promise<Question | null> {
		return null
		// return MessageRepo.isReplyToKnownQuestion(newMessage)
	}
}
