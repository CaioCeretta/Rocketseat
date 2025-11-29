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
}
