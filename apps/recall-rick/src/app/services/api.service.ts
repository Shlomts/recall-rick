import { environment } from '../../environments/environment'

const BASE_URL = environment.production
	? "/api/messages"
	: "http://localhost:3333/api/messages"

/**
 * Service for making HTTP requests to the backend API for message entities.
 */
export const apiService = {
	/**
	 * Queries all entities of a given type from the backend.
	 * @param entityType - The type of entity to query.
	 * @param delay - Optional delay in milliseconds before resolving.
	 * @returns Promise resolving to an array of entities.
	 */
	query,
	/**
	 * Retrieves a single entity by its ID.
	 * @param entityType - The type of entity.
	 * @param entityId - The ID of the entity to retrieve.
	 * @returns Promise resolving to the entity.
	 */
	get,
	/**
	 * Creates a new entity in the backend.
	 * @param entityType - The type of entity.
	 * @param newEntity - The entity to create.
	 * @returns Promise resolving to the created entity.
	 */
	post,
	/**
	 * Updates an existing entity in the backend.
	 * @param entityType - The type of entity.
	 * @param updatedEntity - The entity with updated data.
	 * @returns Promise resolving to the updated entity.
	 */
	put,
	/**
	 * Removes an entity by its ID from the backend.
	 * @param entityType - The type of entity.
	 * @param entityId - The ID of the entity to remove.
	 * @returns Promise resolving to void.
	 */
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
