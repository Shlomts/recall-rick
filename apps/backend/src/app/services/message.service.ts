import { Question } from "@recall-rick/common/shared-utils"
import { MessageRepo } from "../db/message.repo"
import { BotService } from "./bot.service"

/**
 * Service for managing messages, including CRUD operations and bot replies.
 */
export class MessageService {
	/**
	 * Retrieves all messages from the repository.
	 * @returns Promise resolving to an array of Question objects.
	 */
	async getAll(): Promise<Question[]> {
		return MessageRepo.getAll()
	}

	/**
	 * Retrieves a message by its ID.
	 * @param id - The ID of the message to retrieve.
	 * @returns Promise resolving to a Question or null if not found.
	 */
	async getById(id: string): Promise<Question | null> {
		return MessageRepo.getById(id)
	}

	/**
	 * Creates a new message, possibly generating a bot reply if the question is known.
	 * @param msg - The message to create.
	 * @returns Promise resolving to the created Question.
	 */
	async create(msg: Question): Promise<Question> {
		msg = await this.getRickplyToKnownQuestion(msg)
		return await MessageRepo.create(msg)
	}

	/**
	 * Updates a message by its ID with the provided data.
	 * @param id - The ID of the message to update.
	 * @param data - Partial Question data to update.
	 * @returns Promise resolving to the updated Question or null if not found.
	 */
	async update(id: string, data: Partial<Question>): Promise<Question | null> {
		return MessageRepo.update(id, data)
	}

	/**
	 * Checks if the question is already known and generates a Rick-style reply if so.
	 * @param newMessage - The new message to check and possibly update with a bot reply.
	 * @returns Promise resolving to the updated Question.
	 */
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
