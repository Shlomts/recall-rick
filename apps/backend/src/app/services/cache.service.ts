
/**
 * FIFO cache for up to 10 questions and their answers.
 * Provides add, update, and find functions.
 */
const questionCache: Record<string, string[]> = {}
let cacheOrder: string[] = []

/**
 * Finds a known question (case-insensitive) with at least one answer from the cache.
 * If not found in cache, returns null.
 * @param question - The question string to search for.
 * @returns The answers array if found, otherwise null.
 */
function findKnownQuestionWithAnswers(question: string): string[] | null {
	const key = Object.keys(questionCache).find(
		q => q.toLowerCase() === question.toLowerCase()
	)
	return key ? questionCache[key] : null
}

/**
 * Adds or updates a question and its answers in the cache, maintaining FIFO order and max size 10.
 * If the question exists, it updates the answers and moves it to the end (most recent).
 */
function addOrUpdateCache(question: string, answers: string[]) {
	let key = Object.keys(questionCache).find(
		q => q.toLowerCase() === question.toLowerCase()
	) || question
	const exists = !!questionCache[key]
	if (!exists) {
		if (cacheOrder.length >= 10) {
			const oldest = cacheOrder.shift()
			if (oldest) delete questionCache[oldest]
		}
		cacheOrder.push(key)
	} else {
		cacheOrder = cacheOrder.filter(q => q !== key)
		cacheOrder.push(key)
	}
	questionCache[key] = answers
}

export default {
	findKnownQuestionWithAnswers,
	addOrUpdateCache,
}
