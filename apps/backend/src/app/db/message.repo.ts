import { Question } from "../models/message.model"
import { Collection, ObjectId } from "mongodb"
import { getDb } from "./mongo.client"

let collection: Collection<Question>

export async function initMessageRepo() {
	const db = await getDb()
	collection = db.collection<Question>("questions")
}

export const MessageRepo = {
	async getAll(): Promise<Question[]> {
		return await collection.find().toArray()
	},

	async getById(id: string): Promise<Question | null> {
		return await collection.findOne({ _id: id })
	},

	async create(data: Question): Promise<Question> {
		const result = await collection.insertOne(data as Question)
		return { ...data, _id: result.insertedId }
	},

	async update(id: string, data: Partial<Question>): Promise<Question | null> {
		await collection.updateOne({ _id: id }, { $set: data })
		return this.findById(id)
	},

	async delete(id: string): Promise<void> {
		await collection.deleteOne({ _id: id })
	},
}
