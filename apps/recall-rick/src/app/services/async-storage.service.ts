export const storageService = {
	/**
	 * Queries all entities of a given type from localStorage.
	 * @param entityType - The type of entity to query.
	 * @param delay - Optional delay in milliseconds before resolving.
	 * @returns Promise resolving to an array of entities.
	 */
	query,
	/**
	 * Retrieves a single entity by its ID from localStorage.
	 * @param entityType - The type of entity.
	 * @param entityId - The ID of the entity to retrieve.
	 * @returns Promise resolving to the entity.
	 */
	get,
	/**
	 * Creates a new entity in localStorage.
	 * @param entityType - The type of entity.
	 * @param newEntity - The entity to create.
	 * @returns Promise resolving to the created entity.
	 */
	post,
	/**
	 * Updates an existing entity in localStorage.
	 * @param entityType - The type of entity.
	 * @param updatedEntity - The entity with updated data.
	 * @returns Promise resolving to the updated entity.
	 */
	put,
	/**
	 * Removes an entity by its ID from localStorage.
	 * @param entityType - The type of entity.
	 * @param entityId - The ID of the entity to remove.
	 * @returns Promise resolving to void.
	 */
	remove,
	/**
	 * Generates a random string ID for new entities.
	 * @param length - Optional length of the ID (default is 7).
	 * @returns A random string ID.
	 */
	makeId,
}

type EntityId = {
	_id: string
}

async function query<T>(entityType: string, delay = 300): Promise<T[]> {
	var entities = JSON.parse(localStorage.getItem(entityType) || "null") || []
	if (delay) {
		return new Promise((resolve) => setTimeout(resolve, delay, entities))
	}
	return entities
}

async function get<T extends EntityId>(
	entityType: string,
	entityId: string
): Promise<T> {
	const entities = await query<T>(entityType)
	const entity = entities.find((entity) => entity._id === entityId)
	if (!entity)
		throw new Error(
			`Cannot get, Item ${entityId} of type: ${entityType} does not exist`
		)
	return entity
}

async function post<T>(entityType: string, newEntity: T): Promise<T> {
	newEntity = { ...newEntity, _id: makeId() }
	const entities = await query<T>(entityType)
	entities.push(newEntity)
	_save(entityType, entities)
	return newEntity
}

async function put<T extends EntityId>(
	entityType: string,
	updatedEntity: T
): Promise<T> {
	const entities = await query<T>(entityType)
	const idx = entities.findIndex((entity) => entity._id === updatedEntity._id)
	entities[idx] = updatedEntity
	_save(entityType, entities)
	return updatedEntity
}

async function remove<T extends EntityId>(
	entityType: string,
	entityId: string
): Promise<void> {
	const entities = await query<T>(entityType)
	const idx = entities.findIndex((entity) => entity._id === entityId)
	if (idx !== -1) entities.splice(idx, 1)
	else
		throw new Error(
			`Cannot remove, item ${entityId} of type: ${entityType} does not exist`
		)
	_save(entityType, entities)
}

function _save<T>(entityType: string, entities: T[]) {
	localStorage.setItem(entityType, JSON.stringify(entities))
}

function makeId(length = 7) {
	var txt = ""
	var possible =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
	for (var i = 0; i < length; i++) {
		txt += possible.charAt(Math.floor(Math.random() * possible.length))
	}
	return txt
}
