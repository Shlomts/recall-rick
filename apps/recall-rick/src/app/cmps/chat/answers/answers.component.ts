import { Component, Input } from "@angular/core"
import { Reply } from "@recall-rick/common/shared-utils"

@Component({
	selector: "answers",
	standalone: false,
	templateUrl: "./answers.component.html",
	styleUrl: "./answers.component.scss",
})
export class AnswersComponent {
	@Input() answers: Reply[] = []
}
