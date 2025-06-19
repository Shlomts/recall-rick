import { Pipe, PipeTransform } from "@angular/core"

@Pipe({
	name: "personalizedDate",
	standalone: false,
})
export class PersonalizedDatePipe implements PipeTransform {
	transform(value: Date | string | number): string {
		if (!value) return ""
		const date = new Date(value)
		const now = new Date()
		const isToday =
			date.getFullYear() === now.getFullYear() &&
			date.getMonth() === now.getMonth() &&
			date.getDate() === now.getDate()
		if (isToday) {
			return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
		} else {
			return date.toLocaleString([], {
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
				hour: "2-digit",
				minute: "2-digit",
			})
		}
	}
}
