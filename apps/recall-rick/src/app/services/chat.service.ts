import { Injectable } from "@angular/core"
import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import { BehaviorSubject, from, Observable, throwError } from "rxjs"
import { catchError, retry, tap } from "rxjs/operators"
import { storageService } from "./async-storage.service"
import { Message } from "../models/message.model"

const ENTITY = "messages"

@Injectable({
	providedIn: "root",
})
export class ChatService {
	constructor(private http: HttpClient) {
		const messages = JSON.parse(localStorage.getItem(ENTITY) || "null")
		if (!messages || messages.length === 0) {
			localStorage.setItem(ENTITY, JSON.stringify(this._createMessages()))
		}
	}

	private _messages$ = new BehaviorSubject<Message[]>([])
	public messages$ = this._messages$.asObservable()

	public query() {
		return from(storageService.query<Message>(ENTITY)).pipe(
			tap((messages) => {
				this._messages$.next(messages)
			}),
			retry(1),
			catchError(this._handleError)
		)
	}

	public save(message: Message) {
		return message._id ? this._edit(message) : this._add(message)
	}

	private _add(message: Message) {
		return from(storageService.post(ENTITY, message)).pipe(
			tap((newMessage) => {
				const messages = [...this._messages$.value]
				messages.push(newMessage)
				this._messages$.next(messages)
				return newMessage
			}),
			retry(1),
			catchError(this._handleError)
		)
	}

	private _edit(message: Message) {
		return from(storageService.put(ENTITY, message)).pipe(
			tap((updatedMessage) => {
				const messages = [...this._messages$.value]
				const messageIdx = messages.findIndex(
					(_message) => _message._id === message._id
				)
				messages[messageIdx] = updatedMessage
				this._messages$.next(messages)
				return updatedMessage
			}),
			retry(1),
			catchError(this._handleError)
		)
	}

	public getById(messageId: string): Observable<Message> {
		return from(storageService.get<Message>(ENTITY, messageId)).pipe(
			retry(1),
			catchError(this._handleError)
		)
	}

	public getEmptyMesssage(): Partial<Message> {
		return { question: "" }
	}

	private _createMessages() {
		const messages: Message[] = [
			{
				_id: "a1B2c3D",
				sentAt: new Date("2025-05-30T08:13:00"),
				from: "user",
				question: "What time is the meeting today?",
			},
			{
				_id: "e4F5g6H",
				sentAt: new Date("2025-5-28T14:45:00"),
				from: "user",
				question: "Where can I find the project documentation?",
			},
			{
				_id: "i7J8k9L",
				sentAt: new Date("2025-6-1T09:27:00"),
				from: "user",
				question: "How do I reset my password?",
			},
			{
				_id: "m0N1o2P",
				sentAt: new Date("2025-6-2T11:39:00"),
				from: "user",
				question: "Can I deploy to production today?",
			},
			{
				_id: "q3R4s5T",
				sentAt: new Date("2025-6-3T17:20:00"),
				from: "user",
				question: "What’s the Wi-Fi password in the office?",
			},
			{
				_id: "u6V7w8X",
				sentAt: new Date("2025-6-4T07:54:00"),
				from: "user",
				question: "Who is on call this weekend?",
			},
			{
				_id: "y9Z0a1B",
				sentAt: new Date("2025-6-5T13:35:00"),
				from: "user",
				question: "How do I join the Zoom call?",
			},
			{
				_id: "c2D3e4F",
				sentAt: new Date("2025-6-6T10:12:00"),
				from: "user",
				question: "What’s the backend API URL?",
			},
			{
				_id: "g5H6i7J",
				sentAt: new Date("2025-6-7T15:03:00"),
				from: "user",
				question: "Where can I find the design specs?",
			},
			{
				_id: "k8L9m0N",
				sentAt: new Date("2025-6-8T20:15:00"),
				from: "user",
				question: "Is the staging environment broken?",
			},
		]
		return messages
	}

	private _handleError(err: HttpErrorResponse) {
		return throwError(() => err)
	}
}
