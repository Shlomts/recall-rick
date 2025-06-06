import {
	Component,
	Input,
	AfterViewChecked,
	ViewChild,
	ElementRef,
} from "@angular/core"
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
		const index = this.messages.findIndex(m => m._id === event.original._id)
		if (index !== -1) {
			if (!this.messages[index].replies) this.messages[index].replies = []
			this.messages[index].replies!.push(event.reply)
		}
	}

	ngAfterViewChecked(): void {
		try {
			this.messagesContainer.nativeElement.scrollTop =
				this.messagesContainer.nativeElement.scrollHeight
		} catch {}
	}
}
