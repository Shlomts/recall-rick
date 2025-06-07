import { Question } from "@recall-rick/common/shared-utils"
import { MessageRepo } from "../db/message.repo"
import BotService from "./bot.service"

/**
 * Service for managing messages, including CRUD operations and bot replies.
 */
const messageService = {
	/**
	 * Retrieves all messages from the repository.
	 * @returns Promise resolving to an array of Question objects.
	 */
	getAll: async (): Promise<Question[]> => {
		return MessageRepo.getAll()
	},
	/**
	 * Retrieves a message by its ID.
	 * @param id - The ID of the message to retrieve.
	 * @returns Promise resolving to a Question or null if not found.
	 */
	getById: async(id: string): Promise<Question | null> => {
		return MessageRepo.getById(id)
	},

	/**
	 * Creates a new message, possibly generating a bot reply if the question is known.
	 * @param msg - The message to create.
	 * @returns Promise resolving to the created Question.
	 */
	create: async (msg: Question): Promise<Question> => {
		msg = await messageService.getRickplyToKnownQuestion(msg)
		return await MessageRepo.create(msg)
	},

	/**
	 * Updates a message by its ID with the provided data.
	 * @param id - The ID of the message to update.
	 * @param data - Partial Question data to update.
	 * @returns Promise resolving to the updated Question or null if not found.
	 */
	update: async (id: string, data: Partial<Question>): Promise<Question | null> => {
		return MessageRepo.update(id, data)
	},

	/**
	 * Checks if the question is already known and generates a Rick-style reply if so.
	 * @param newMessage - The new message to check and possibly update with a bot reply.
	 * @returns Promise resolving to the updated Question.
	 */
	getRickplyToKnownQuestion: async (newMessage: Question): Promise<Question> => {
		const knownMessage = await MessageRepo.findKnownQuestionWithAnswers(newMessage.question)

		if (knownMessage) {
			const answers = knownMessage.answers.map((answer) => answer.question)
			newMessage.answers = [
				await BotService.generateRickply(newMessage.question, answers),
			]
		}

		return newMessage
	}
}
export default messageService