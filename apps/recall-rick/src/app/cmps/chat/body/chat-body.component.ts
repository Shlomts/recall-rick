import {
	Component,
	Input,
	AfterViewChecked,
	ViewChild,
	ElementRef,
	OnChanges,
	SimpleChanges,
	ChangeDetectionStrategy,
} from "@angular/core"
import { ChatService } from "../../../services/chat.service"
import { Question, Reply } from "../../../models/message.model"

@Component({
	selector: "chat-body",
	standalone: false,
	templateUrl: "./chat-body.component.html",
	styleUrl: "./chat-body.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatBodyComponent implements AfterViewChecked, OnChanges {
	@Input() messages: Question[] = []

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

	ngAfterViewChecked(): void {
		this.scrollToBottom()
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes["messages"] && !changes["messages"].firstChange) {
			this.scrollToBottom()
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
