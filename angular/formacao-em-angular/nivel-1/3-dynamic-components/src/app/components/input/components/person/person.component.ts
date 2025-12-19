import { Component, EventEmitter, Input, Output } from "@angular/core";
import type { IPerson } from "../../input.component";

@Component({
	selector: "app-person",
	imports: [],
	templateUrl: "./person.component.html",
	styleUrl: "./person.component.css",
})
export class PersonComponent {
	@Input() person!: IPerson;

	@Output() removePersonEmit = new EventEmitter<number>();

	removePerson(personId: number) {
		this.removePersonEmit.emit(personId);
	}
}
