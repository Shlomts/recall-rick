export interface Message {
	sentAt: Date
	from: string
	question: string
}

export interface Reply extends Message {
	id: string
}

export interface Question extends Message {
	_id: string | any
	answers: Reply[]
}
