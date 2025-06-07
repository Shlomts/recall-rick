import { Component } from "@angular/core"
import { ChatService } from "../../../services/chat.service"
import { Question } from "@recall-rick/common/shared-utils"
@Component({
	selector: "chat-add",
	standalone: false,
	templateUrl: "./chat-add.component.html",
	styleUrl: "./chat-add.component.scss",
})
export class ChatAddComponent {
	userInput: string = ""

	constructor(private chatService: ChatService) {}

	sendMessageToServer(): void {
		const text = this.userInput.trim()
		if (!text) return

		const message: Partial<Question> = {
			sentAt: new Date(),
			from: "user",
			question: text,
			answers: [],
		}

		this.chatService.save(message as Question).subscribe({
			next: () => {
				this.userInput = "" // Clear input on successful send
			},
			error: (err) => console.error("Error sending message:", err),
		})
	}
}
