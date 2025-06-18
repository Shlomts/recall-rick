import { Request, Response } from "express"
import messageService from "../services/message.service"
import { Question } from "@recall-rick/common/shared-utils"


/**
 * Controller to fetch all messages.
 *
 * @param req - Express request object
 * @param res - Express response object
 * @returns Promise<void>
 *
 * @remarks
 * Responds with a list of all messages or an error message.
 */
export async function getAllMessages(
	req: Request,
	res: Response
): Promise<void> {
	try {
		const messages = await messageService.getAll()
		res.json(messages)
	} catch (err) {
		res.status(500).json({
			error: "Failed to fetch messages",
			details: (err as Error).message,
		})
	}
}

/**
 * Controller to fetch a message by its ID.
 *
 * @param req - Express request object, expects 'id' param
 * @param res - Express response object
 * @returns Promise<void>
 *
 * @remarks
 * Responds with the message if found, or a 404 error if not found.
 */
export async function getMessageById(
	req: Request,
	res: Response
): Promise<void> {
	try {
		const id = req.params.id
		const message = await messageService.getById(id)
		if (!message) {
			res.status(404).json({ error: "Message not found" })
			return
		}
		res.json(message)
	} catch (err) {
		res.status(500).json({
			error: "Failed to fetch message",
			details: (err as Error).message,
		})
	}
}

/**
 * Controller to create a new message.
 *
 * @param req - Express request object, expects a Question in the body
 * @param res - Express response object
 * @returns Promise<void>
 *
 * @remarks
 * Validates the message, creates it, emits a socket event, and responds with the created message.
 */
export async function createMessage(
	req: Request,
	res: Response
): Promise<void> {
	try {
		const msg = req.body as Question
		if (!msg || !msg.question || !msg.sentAt || !msg.from) {
			res.status(400).json({ error: "Could not create message" })
			return
		}
		delete msg._id
		msg.sentAt = new Date(msg.sentAt)
		const createdMsg = await messageService.create(msg)
		const io = req.app.get("io")
		if (io) io.emit("message-added", createdMsg)
		res.status(201).json(createdMsg)
	} catch (err) {
		res.status(500).json({
			error: "Failed to create message",
			details: (err as Error).message,
		})
	}
}

/**
 * Controller to update a message's answers.
 *
 * @param req - Express request object, expects 'id' param and answers in the body
 * @param res - Express response object
 * @returns Promise<void>
 *
 * @remarks
 * Updates the answers of a message, emits a socket event, and responds with the updated message.
 */
export async function updateMessage(
	req: Request,
	res: Response
): Promise<void> {
	try {
		const id = req.params.id
		const data = req.body
		const updated = await messageService.update(id, {answers: data.answers})
		if (!updated) {
			res.status(404).json({ error: "Message not found" })
			return
		}
		const io = req.app.get("io")
		if (io) io.emit("message-updated", updated)
		res.json(updated)
	} catch (err) {
		res.status(500).json({
			error: "Failed to update message",
			details: (err as Error).message,
		})
	}
}


