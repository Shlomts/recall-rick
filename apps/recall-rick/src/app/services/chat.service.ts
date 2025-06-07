import { Injectable } from "@angular/core"
import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import { BehaviorSubject, from, Observable, throwError } from "rxjs"
import { catchError, retry, tap } from "rxjs/operators"
import { apiService } from "./api.service"
import { Question, Reply } from "@recall-rick/common/shared-utils"
import io from "socket.io-client"
import { environment } from "../../environments/environment"

const ENTITY = "messages"
const SOCKET_URL = environment.production
	? window.location.origin
	: "http://localhost:3333"

@Injectable({
	providedIn: "root",
})
export class ChatService {
	private socket = io(SOCKET_URL)
	constructor(private http: HttpClient) {
		this._listenToSocket()
	}

	private _messages$ = new BehaviorSubject<Question[]>([])
	public messages$ = this._messages$.asObservable()

	public query() {
		return from(apiService.query<Question>(ENTITY)).pipe(
			tap((messages) => {
				this._messages$.next(messages)
			}),
			retry(1),
			catchError(this._handleError)
		)
	}

	public save(message: Question) {
		return message._id ? this._edit(message) : this._add(message)
	}

	private _add(message: Question) {
		return from(apiService.post(ENTITY, message)).pipe(
			retry(1),
			catchError(this._handleError)
		)
	}

	private _edit(message: Question) {
		return from(apiService.put(ENTITY, message)).pipe(
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

	public getById(messageId: string): Observable<Question> {
		return from(apiService.get<Question>(ENTITY, messageId)).pipe(
			retry(1),
			catchError(this._handleError)
		)
	}

	public getEmptyMesssage(): Partial<Question> {
		return { question: "" }
	}

	private _createMessages() {
		const messages: Question[] = [
			{
				_id: "a1B2c3D",
				sentAt: new Date("2025-05-30T08:13:00"),
				from: "user",
				question: "What time is the meeting today?",
				answers: [],
			},
			{
				_id: "e4F5g6H",
				sentAt: new Date("2025-5-28T14:45:00"),
				from: "user",
				question: "Where can I find the project documentation?",
				answers: [],
			},
			{
				_id: "i7J8k9L",
				sentAt: new Date("2025-6-1T09:27:00"),
				from: "user",
				question: "How do I reset my password?",
				answers: [],
			},
			{
				_id: "m0N1o2P",
				sentAt: new Date("2025-6-2T11:39:00"),
				from: "user",
				question: "Can I deploy to production today?",
				answers: [],
			},
			{
				_id: "q3R4s5T",
				sentAt: new Date("2025-6-3T17:20:00"),
				from: "user",
				question: "What’s the Wi-Fi password in the office?",
				answers: [],
			},
			{
				_id: "u6V7w8X",
				sentAt: new Date("2025-6-4T07:54:00"),
				from: "user",
				question: "Who is on call this weekend?",
				answers: [],
			},
			{
				_id: "y9Z0a1B",
				sentAt: new Date("2025-6-5T13:35:00"),
				from: "user",
				question: "How do I join the Zoom call?",
				answers: [],
			},
			{
				_id: "c2D3e4F",
				sentAt: new Date("2025-6-6T10:12:00"),
				from: "user",
				question: "What’s the backend API URL?",
				answers: [],
			},
			{
				_id: "g5H6i7J",
				sentAt: new Date("2025-6-7T15:03:00"),
				from: "user",
				question: "Where can I find the design specs?",
				answers: [],
			},
			{
				_id: "k8L9m0N",
				sentAt: new Date("2025-6-8T20:15:00"),
				from: "user",
				question: "Is the staging environment broken?",
				answers: [],
			},
		]
		return messages
	}

	private _handleError(err: HttpErrorResponse) {
		return throwError(() => err)
	}

	private _listenToSocket() {
		this.socket.on("message-added", (message: Question) => {
			const messages = [...this._messages$.value, message]
			this._messages$.next(messages)
		})
		this.socket.on("message-updated", (updatedMessage: Question) => {
			const messages = this._messages$.value.map((msg) =>
				msg._id === updatedMessage._id ? updatedMessage : msg
			)
			this._messages$.next(messages)
		})
	}
}
