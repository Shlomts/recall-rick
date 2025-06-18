import { v4 } from "uuid"
import { Reply } from "@recall-rick/common/shared-utils"
import AIService from "./ai-client.service"
import CacheService from "./cache.service"

/**
 * Service for generating bot replies using AI.
 */
export default {
	/**
	 * Generates a Rick-style reply using AI or cache based on the input.
	 *
	 * @param input - The user's question or input string.
	 * @returns Promise resolving to a Reply object.
	 */
	generateRickply: async (input: string): Promise<Reply> => {
		const cachedAnswers = CacheService.findKnownQuestionWithAnswers(input)
		let answer: string
		if (cachedAnswers && cachedAnswers.length > 0) {
			answer = createAnswer(cachedAnswers[0])
		} else {
			answer = await AIService.callAI(input)
			if (!answer) {
				answer = `Wubba lubba dub dub! Something went wrong. Try again later.`
			} else {
				CacheService.addOrUpdateCache(input, [answer])
			}
		}
		return {
			id: v4(),
			sentAt: new Date(),
			from: "bot",
			question: answer,
		}
	},
}

/**
 * Picks a random Rick-style repeated-question phrase and returns it with the cached answer.
 * @param cachedAnswer - The answer to append after the phrase.
 * @returns A string with a random phrase and the cached answer.
 */
function createAnswer(cachedAnswer: string): string {
	const phrases = [
		"Oh great, this timeline again.",
		"Didn't we already portal past this?",
		"I could swear we looped this one.",
		"Yup, classic repeat-a-tron behavior.",
		"Here comes the déjà vu parade.",
		"You sure this isn’t a rerun?",
		"Universe really likes this joke.",
		"Guess we’re back at square meh.",
		"Multiverse recycling program in full swing.",
		"Even my meeseeks are bored of this.",
	]
	const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)]
	return `AGAIN?? ${randomPhrase} ${cachedAnswer}`
}
