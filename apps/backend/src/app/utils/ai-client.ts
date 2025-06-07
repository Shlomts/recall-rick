import { GoogleGenAI } from "@google/genai"

export async function callAI(
	question: string,
	answers: string[]
): Promise<string> {
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
					text: `please answer the following question using the following answers 
					as if you were rick sanchez from rick & morty, please use the answers
					as if they were the only possible answers and poke the questioner for asking more then once:
					Q: ${question}
					${answers.map((answer, index) => `A: ${answer}`).join("\n")}
					`,
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
}
