import { Component, Input, Output, EventEmitter } from "@angular/core"
import { Message } from "../../../models/message.model"

@Component({
	selector: "chat-message",
	templateUrl: "./chat-message.component.html",
	styleUrls: ["./chat-message.component.scss"],
	standalone: false,
})
export class ChatMessageComponent {
	@Input() from!: "user" | "bot"
	@Input() msg!: Message
	@Output() reply = new EventEmitter<{ original: Message; reply: Message }>()

	showReplies = false
	newReplyText = ""

	toggleReplies() {
		this.showReplies = !this.showReplies
	}

	submitReply() {
		if (!this.newReplyText.trim()) return

		const newReply: Message = {
			_id: Math.random().toString(36).substring(2, 9),
			sentAt: new Date(),
			from: "user",
			question: this.newReplyText,
		}

		this.reply.emit({ original: this.msg, reply: newReply })
		this.newReplyText = ""
	}
}
