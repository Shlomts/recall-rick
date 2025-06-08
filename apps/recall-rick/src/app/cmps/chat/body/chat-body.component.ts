import {
	Component,
	Input,
	ElementRef,
	OnChanges,
	SimpleChanges,
	ChangeDetectionStrategy,
} from "@angular/core"
import { ChatService } from "../../../services/chat.service"
import { Question, Reply } from "@recall-rick/common/shared-utils"

@Component({
	selector: "chat-body",
	standalone: false,
	templateUrl: "./chat-body.component.html",
	styleUrl: "./chat-body.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatBodyComponent implements OnChanges {
	@Input() messages: Question[] = []

	private previousMessagesLength = 0

	handleReply(event: { original: Question; reply: Reply }) {
		const updatedMessage: Question = {
			...event.original,
			answers: [...(event.original.answers || []), event.reply],
		}

		this.chatService.save(updatedMessage).subscribe({
			error: (err) => console.error("Failed to save reply:", err),
		})
	}

	constructor(private chatService: ChatService, private hostElement: ElementRef) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes["messages"] && !changes["messages"].firstChange) {
			const prev = changes["messages"].previousValue?.length || 0
			const curr = changes["messages"].currentValue?.length || 0
			if (curr > prev) {
				this.scrollToBottom()
			}
			this.previousMessagesLength = curr
		}
	}

	private scrollToBottom(): void {
		if (!this.hostElement) return
		setTimeout(() => {
			try {
				this.hostElement.nativeElement.scrollTop =
					this.hostElement.nativeElement.scrollHeight
			} catch {}
		}, 0)
	}
}
