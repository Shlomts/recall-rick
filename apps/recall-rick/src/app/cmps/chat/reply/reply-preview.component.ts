import { Component, EventEmitter, Input, Output } from "@angular/core"
import { Message } from "../../../models/message.model"

@Component({
	selector: "reply-preview",
	standalone: false,
	templateUrl: "./reply-preview.component.html",
	styleUrl: "./reply-preview.component.scss",
})
export class ReplyPreviewComponent {
	@Input() message!: Message
	@Output() replied = new EventEmitter<Message>()

	newReply = ""

	submitReply() {
		const reply: Message = {
			_id: this.generateId(),
			sentAt: new Date(),
			from: "user",
			question: this.newReply,
		}

		this.message.replies = [...(this.message.replies || []), reply]
		this.replied.emit(reply)
		this.newReply = ""
	}

	private generateId(): string {
		return Math.random().toString(36).substring(2, 9)
	}
}
