import { Component } from "@angular/core";

@Component({
	selector: "app-event-binding",
	imports: [],
	templateUrl: "./event-binding.html",
	styleUrl: "./event-binding.css",
})
export class EventBinding {
	onButtonClick() {
		console.log("onButton click");
	}

	onInput(event: Event) {
		const value = (event.target as HTMLInputElement).value;

		console.log("value: ", value);
	}

	onBlur() {
		console.log("blur");
	}

	onFocus() {
		console.log("focus");
	}
}
