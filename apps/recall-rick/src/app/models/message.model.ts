export interface Message {
	_id: string
	sentAt: Date
	from: "user" | "bot"
	question: string
	answers?: string[]
}
