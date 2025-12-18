import { Component } from "@angular/core";
import { PersonComponent } from "./components/person/person.component";

export interface IPerson {
	id: number;
	name: string;
	age: number;
	address?: { street: string; number: string };
}

@Component({
	selector: "app-input",
	imports: [PersonComponent],
	templateUrl: "./input.component.html",
	styleUrl: "./input.component.css",
})
export class InputComponent {
	people: IPerson[] = [
		{
			id: 0,
			name: "Caio",
			age: 29,
			address: { street: "Doe Street", number: "123" },
		},
		{ id: 1, name: "Alex", age: 37 },
	];

	removePerson() {
		this.people.pop();
	}

	getPeopleQuantity() {
		return this.people;
	}
}
