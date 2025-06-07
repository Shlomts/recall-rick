import { Component, OnInit, OnDestroy } from "@angular/core"
import { Question } from "../../models/message.model"
import { ChatService } from "../../services/chat.service"
import { Subscription } from "rxjs"

@Component({
	selector: "chat",
	templateUrl: "./chat.component.html",
	styleUrls: ["./chat.component.scss"],
	standalone: false,
})
export class ChatComponent implements OnInit, OnDestroy {
	messages: Question[] = []
	private messagesSubscription: Subscription | undefined
	private querySubscription: Subscription | undefined

	constructor(private chatService: ChatService) {}

	ngOnInit(): void {
		this.querySubscription = this.chatService.query().subscribe({
			error: (err) => console.error("Error fetching initial messages:", err),
		})

		this.messagesSubscription = this.chatService.messages$.subscribe({
			next: (messages) => {
				this.messages = messages
			},
			error: (err) => console.error("Error in messages subscription:", err),
		})
	}

	ngOnDestroy(): void {
		if (this.messagesSubscription) {
			this.messagesSubscription.unsubscribe()
		}
		if (this.querySubscription) {
			this.querySubscription.unsubscribe()
		}
	}
}
