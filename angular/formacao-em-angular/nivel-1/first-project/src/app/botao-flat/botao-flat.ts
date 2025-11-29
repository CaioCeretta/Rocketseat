import { Component } from "@angular/core";

@Component({
	selector: "app-botao-flat",
	imports: [],
	template: `
    <p>
      <button class="btn btn-flat" (click)="filter()">Filter</button>
    </p>
  `,
	styles: `
  .btn {
  --primary-orange: #ff5a00;
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
  border: 2px solid var(--primary-orange);
  color: var(--primary-orange);
}`,
})
export class BotaoFlat {
	counter = 0;

	filter() {
		console.log("Filter button clicked!");
	}
}
