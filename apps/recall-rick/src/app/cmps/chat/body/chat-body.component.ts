import {
	Component,
	Input,
	AfterViewChecked,
	ViewChild,
	ElementRef,
} from "@angular/core"
import { ChatService } from "../../../services/chat.service"
import { Message } from "../../../models/message.model"

@Component({
	selector: "chat-body",
	standalone: false,
	templateUrl: "./chat-body.component.html",


	styleUrl: "./chat-body.component.scss",
})
export class ChatBodyComponent implements AfterViewChecked {
	@Input() messages: Message[] = []
	@ViewChild("messagesContainer") private messagesContainer!: ElementRef

	handleReply(event: { original: Message; reply: Message }) {
		const updatedMessage = {
			...event.original,
			answers: [...(event.original.answers || []), event.reply],
		}

		this.chatService.save(updatedMessage).subscribe({
			error: (err) => console.error("Failed to save reply:", err),
		})
	}

	constructor(private chatService: ChatService) {}

	ngAfterViewChecked(): void {
		try {
			this.messagesContainer.nativeElement.scrollTop =
				this.messagesContainer.nativeElement.scrollHeight
		} catch {}
	}
}
