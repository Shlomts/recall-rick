import { v4 } from "uuid"
import { Reply } from "@recall-rick/common/shared-utils"
import { callAI } from "../utils/ai-client"

/**
 * Service for generating bot replies using AI.
 */
export default {
	/**
	 * Generates a Rick-style reply using AI based on the input and optional answers.
	 *
	 * @param input - The user's question or input string.
	 * @param answers - Optional array of previous answers for context.
	 * @returns Promise resolving to a Reply object.
	 */
	generateRickply: async (input: string, answers: string[] = []): Promise<Reply> => {
		return {
			id: v4(),
			sentAt: new Date(),
			from: "bot",
			question: await callAI(input, answers),
		}
	}
}
