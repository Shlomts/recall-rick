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

	ngAfterViewChecked(): void {
		try {
			this.messagesContainer.nativeElement.scrollTop =
				this.messagesContainer.nativeElement.scrollHeight
		} catch {}
	}
}
