import { Component } from "@angular/core";

@Component({
	selector: "app-square-popup",
	imports: [],
	template: `
    <div class="square" [style.left.%]="horizontalPosition"></div>
    <div class="popup" [style.top]="popUpHeight + 'vh'" [style.right]="'10px'">
      Dynamic Popup
    </div>

    <button (click)="moveSquare()">Move Square</button>
    <button (click)="togglePopup()">Toggle Popup</button>
  `,
	styles: `
    .square {
      width: 50px;
      height: 50px;
      background-color: purple;
      position: relative;
      transition: left 0.5s ease;
      margin-top: 20px;
    }

    .popup {
      position: fixed;
      background-color: lightcoral;
      padding: 15px;
      border-radius: 8px;
      transform: translateY(-100%);
      transition: transform 0.3s ease-out, top 0.3s ease-out;
    }
  `,
})
export class SquarePopup {
	horizontalPosition: number = 0; //Position in %
	popUpHeight: number = -10; // Position in vh (out of the screen)

	moveSquare() {
		// The % 100 ensures that the value is never greater than 100
		this.horizontalPosition = (this.horizontalPosition + 10) % 100;
	}

	togglePopup() {
		this.popUpHeight = this.popUpHeight === -10 ? 10 : -10;
	}
}
