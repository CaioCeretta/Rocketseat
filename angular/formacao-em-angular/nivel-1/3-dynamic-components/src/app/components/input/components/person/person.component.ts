import {
	Component,
	EventEmitter,
	Input,
	type OnChanges,
	type OnInit,
	Output,
	type SimpleChanges,
} from "@angular/core";
import type { IPerson } from "../../input.component";

@Component({
	selector: "app-person",
	imports: [],
	templateUrl: "./person.component.html",
	styleUrl: "./person.component.css",
})
export class PersonComponent implements OnChanges, OnInit {
	@Input() person!: IPerson;

	@Output() removePersonEmit = new EventEmitter<number>();

	constructor() {
		console.log("person: ", this.person);
		console.log("constructor");
	}

	ngOnInit(): void {
		console.log("person: ", this.person);
		console.log("ngOnInit");
	}

	ngOnChanges(changes: SimpleChanges): void {
		console.log("ngOnChanges");
	}

	removePerson(personId: number) {
		this.removePersonEmit.emit(personId);
	}
}
