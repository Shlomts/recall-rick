import { Component } from "@angular/core"
import { ChatService } from "../../../services/chat.service"
import { Question } from "@recall-rick/common/shared-utils"
import { UserService } from "../../../services/user.service"
import { ErrorModalComponent } from "../../error-modal/error-modal.component"

@Component({
	selector: "chat-add",
	standalone: false,
	templateUrl: "./chat-add.component.html",
	styleUrl: "./chat-add.component.scss",
})
export class ChatAddComponent {
	userInput: string = ""

	showErrorModal = false
	errorMessage = ""

	constructor(
		private chatService: ChatService,
		private userService: UserService
	) {}

	saveMessage(): void {
		const text = this.userInput.trim()
		if (!text) return

		const message: Partial<Question> = {
			sentAt: new Date(),
			from: this.userService.username || "user",
			question: text,
			answers: [],
		}

		this.chatService.save(message as Question).subscribe({
			next: () => {
				this.userInput = ""
			},
			error: (err) => {
				this.errorMessage = "Failed to send message. Please try again."
				this.showErrorModal = true
				console.error("Error sending message:", err)
			},
		})
	}

	onCloseErrorModal() {
		this.showErrorModal = false
	}
}
