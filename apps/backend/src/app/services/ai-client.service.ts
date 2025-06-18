import { GoogleGenAI } from "@google/genai"

/**
 * Service for interacting with Google GenAI to generate Rick-style replies.
 */
const AIService = {
	/**
	 * Calls the AI model to generate a Rick-style answer based on the question.
	 * @param question - The user's question.
	 * @returns Promise resolving to the AI's reply as a string.
	 */
	callAI: async (question: string): Promise<string> => {
		const ai = new GoogleGenAI({
			apiKey: process.env.GEMINI_API_KEY,
		})
		const config = {
			temperature: 1.5,
		}
		const model = "gemini-2.0-flash-lite"
		const contents = [
			{
				role: "user",
				parts: [
					{
						text: `Answer the following question as if you were Rick Sanchez from Rick & Morty. Be sarcastic, witty, and use Rick's style and catchphrases, pls make it short and make sure you answer the question.\nQ: ${question}`,
					},
				],
			},
		]

		const response = await ai.models.generateContentStream({
			model,
			config,
			contents,
		})

		let sentences: string[] = []
		for await (const chunk of response) {
			sentences.push(chunk.text)
		}

		return sentences.join(" ")
	},
}

export default AIService
