import { environment } from '../../environments/environment'

const BASE_URL = environment.production
	? "/api/messages"
	: "http://localhost:3333/api/messages"

export const apiService = {
	query,
	get,
	post,
	put,
	remove,
}

type EntityId = {
	_id: string
}

async function query<T>(entityType: string, delay = 0): Promise<T[]> {
	const res = await fetch(BASE_URL)
	if (!res.ok) throw new Error("Failed to fetch entities")
	return res.json()
}

async function get<T extends EntityId>(
	entityType: string,
	entityId: string
): Promise<T> {
	const res = await fetch(`${BASE_URL}/${entityId}`)
	if (!res.ok) throw new Error("Failed to fetch entity")
	return res.json()
}

async function post<T>(entityType: string, newEntity: T): Promise<T> {
	const res = await fetch(BASE_URL, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(newEntity),
	})
	if (!res.ok) throw new Error("Failed to create entity")
	return res.json()
}

async function put<T extends EntityId>(
	entityType: string,
	updatedEntity: T
): Promise<T> {
	const res = await fetch(`${BASE_URL}/${updatedEntity._id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(updatedEntity),
	})
	if (!res.ok) throw new Error("Failed to update entity")
	return res.json()
}

async function remove<T extends EntityId>(
	entityType: string,
	entityId: string
): Promise<void> {
	const res = await fetch(`${BASE_URL}/${entityId}`, { method: "DELETE" })
	if (!res.ok) throw new Error("Failed to delete entity")
}
