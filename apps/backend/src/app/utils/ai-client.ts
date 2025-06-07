export async function callAI(question: string): Promise<string> {
	//NEED TO CONNECT AI ASAP
	const sentences = [
		`Hey there, Morty! I turned myself into a sentence, Morty! I'm Sentence Rick!`,
		`Wubba lubba dub dub! Looks like you need an answer, Morty!`,
		`Alright, Morty, let's get this done. Don't make it weird.`,
		`Another question, huh? Don't worry, Rick's got this.`,
		`Okay, Morty, buckle up! Rick is about to drop some knowledge.`,
	]

	const randomIndex = Math.floor(Math.random() * sentences.length)

	return sentences[randomIndex]
}
