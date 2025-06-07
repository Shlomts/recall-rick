import { Question } from "@recall-rick/common/shared-utils"
import { Collection, ObjectId } from "mongodb"
import { getDb } from "./mongo.client"

interface QuestionDB extends Question {
	_id: ObjectId
}
let collection: Collection<QuestionDB>

export async function initMessageRepo() {
	const db = await getDb()
	collection = db.collection<QuestionDB>("questions")
}

export const MessageRepo = {
	async getAll(): Promise<Question[]> {
		return await collection.find().toArray()
	},

	async getById(id: string): Promise<Question | null> {
		return await collection.findOne({ _id: new ObjectId(id) })
	},

	async create(data: Question): Promise<Question> {
		const result = await collection.insertOne(data as Question)
		return { ...data, _id: result.insertedId }
	},

	async update(id: string, data: Partial<Question>): Promise<Question | null> {
		delete data._id
		await collection.updateOne({ _id: new ObjectId(id) }, { $set: data })
		return this.getById(new ObjectId(id))
	},

	/**
	 * Finds a known question (case-insensitive) with at least one answer.
	 * @param question - The question string to search for.
	 * @returns Promise resolving to the known Question or null if not found.
	 */
	async findKnownQuestionWithAnswers(question: string): Promise<Question | null> {
		return await collection.findOne({
			question: { $regex: `^${question}$`, $options: "i" },
			answers: { $exists: true, $not: { $size: 0 } }
		})
	},
}
