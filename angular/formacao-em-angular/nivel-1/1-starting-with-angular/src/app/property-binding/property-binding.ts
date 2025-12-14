import { Component } from "@angular/core";

@Component({
	selector: "app-property-binding",
	imports: [],
	templateUrl: "./property-binding.html",
	styleUrl: "./property-binding.css",
})
export class PropertyBinding {
	texto = "Texto do Input";
	inputType = "password";
	inputDisabled = true;

	enableInput() {
		this.inputDisabled = true;
	}

	disableInput() {
		this.inputDisabled = false;
	}

	logText() {
		console.log(this.texto);
	}

	updateText(event: Event) {
		const value = (event.target as HTMLInputElement).value;

		this.texto = value;
	}
}
