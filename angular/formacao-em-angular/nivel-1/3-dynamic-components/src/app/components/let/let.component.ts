import { Component } from "@angular/core";

@Component({
	selector: "app-let",
	imports: [],
	templateUrl: "./let.component.html",
	styleUrl: "./let.component.css",
})
export class LetComponent {
	people = [
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
