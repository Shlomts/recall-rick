import { MongoClient, Db } from "mongodb"

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017"
const DB_NAME = "recall-rick"

let client: MongoClient

export async function getDb(): Promise<Db> {
	if (!client) {
		client = new MongoClient(MONGO_URI)
		await client.connect()
	}
	return client.db(DB_NAME)
}
