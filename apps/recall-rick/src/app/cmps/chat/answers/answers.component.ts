import { Component, Input } from "@angular/core"
import { Message } from "../../../models/message.model";

@Component({
	selector: "answers",
	standalone: false,
	templateUrl: "./answers.component.html",
	styleUrl: "./answers.component.scss",
})
export class AnswersComponent {
  @Input() answers: Message[] = [];
}
