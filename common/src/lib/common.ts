export interface Message {
	sentAt: Date
	from: "user" | "bot"
	question: string
}

export interface Reply extends Message {
	id: string
}

export interface Question extends Message {
	_id: string | any
	answers: Reply[]
}
