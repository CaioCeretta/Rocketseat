import { Component } from "@angular/core";

@Component({
	selector: "app-botao-flat",
	imports: [],
	template: `
    <p>
      <button class="btn btn-flat" (click)="limpar()">Clean Filters</button>
    </p>
  `,
	styles: `
      .btn {
      --primary-orange: #f55a00;
      --white: #ffffff;

      font-family: Arial, sans-serif;
      padding: 12px 25px;
      font-size: 1em;
      font-weight: bold;
      border-radius: 8px;
      cursor: pointer;
      min-width: 150px;
      text-align: center;
      box-sizing: border-box;
    }

    .btn-flat {
      background-color: var(--white);
      border: var(--primary-orange);
      color: var(--primary-orange);
    }
  `,
})
export class BotaoFlat {
	limpar() {
		console.log("limpar method");
	}
}
