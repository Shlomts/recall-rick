import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from "@angular/core"
import { Question, Reply } from "@recall-rick/common/shared-utils"
import { v4 } from "uuid"
@Component({
	selector: "chat-message",
	templateUrl: "./chat-message.component.html",
	styleUrls: ["./chat-message.component.scss"],
	standalone: false,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessageComponent {
	@Input() from!: "user" | "bot"
	@Input() msg!: Question
	@Output() reply = new EventEmitter<{ original: Question; reply: Reply }>()

	showReplies = false
	newReplyText = ""

	toggleReplies() {
		this.showReplies = !this.showReplies
	}

	submitReply() {
		if (!this.newReplyText.trim()) return

		const newReply: Reply = {
			id: v4(),
			sentAt: new Date(),
			from: "user",
			question: this.newReplyText,
		}

		this.reply.emit({ original: this.msg, reply: newReply })
		this.newReplyText = ""
	}
}
