import { Component } from "@angular/core";

@Component({
	selector: "app-dynamic-text",
	imports: [],
	template: `
    <p [style.font-size.rem]="textSizeRem">
      This text has a dynamic size
    </p>

    <button (click)="increaseText()">Size +</button>
    <button (click)="decreaseText()">Size -</button>

  `,
	styles: ``,
})
export class DynamicText {
	textSizeRem: number = 1.2;

	increaseText() {
		this.textSizeRem = Math.min(this.textSizeRem + 0.2, 2.0);
	}

	decreaseText() {
		this.textSizeRem = Math.min(this.textSizeRem - 0.2, 2.0);
	}
}
