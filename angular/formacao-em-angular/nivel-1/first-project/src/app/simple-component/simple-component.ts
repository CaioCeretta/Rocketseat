import { Component } from "@angular/core";

@Component({
	selector: "app-simple-component",
	imports: [],
	templateUrl: "./simple-component.html",
	styleUrl: "./simple-component.css",
})
export class SimpleComponent {
	// value: any = "blue";
	// widthInPx: number = 200;
	// height: number = 150;
	// changeColor() {
	// 	this.value = this.value === "blue" ? "red" : "blue";
	// }
	// increaseDimensions() {
	// 	this.height += 5;
	// 	this.widthInPx += 10;
	// }
	// isActive:boolean = false;
	// this.isActive = !this.isActive;
	// myValue: number = 10;
	// getColorValue(value: number): string {
	// 	if (value > 80) {
	// 		return "darkgreen";
	// 	} else if (value > 50) {
	// 		return "orange";
	// 	} else {
	// 		return "darkred";
	// 	}
	// }
	// // increases the value
	// increaseValue() {
	// 	if (this.myValue < 100) {
	// 		this.myValue += 10;
	// 	}
	// }
	// widthInPx: number = 200;
	// increaseWidth() {
	// 	this.widthInPx += 50;
	// }

	padding = 50;

	styles = {
		textAlign: "center",
		"background-color": "lightblue",
		padding: `${this.padding}px`,
	};

	increasePadding() {
		this.padding += 50;

		this.styles = {...this.styles, padding: this.}
	}
}
