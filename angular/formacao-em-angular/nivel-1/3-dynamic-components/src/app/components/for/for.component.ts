import { DecimalPipe } from "@angular/common";
import { Component } from "@angular/core";

interface IProduct {
	id: number;
	name: string;
	price: number;
}

@Component({
	selector: "app-for",
	imports: [DecimalPipe],
	templateUrl: "./for.component.html",
	styleUrl: "./for.component.css",
})
export class ForComponent {
	products: IProduct[] = [
		{ id: 1, name: "Laptop Pro", price: 5500.0 },
		{ id: 2, name: "Mouse Gamer", price: 250.0 },
		{ id: 3, name: "Mechanical Keyboard", price: 400.0 },
	];

	updateList() {
		this.products = [
			{ id: 1, name: "Laptop Pro", price: 5500.0 },
			{ id: 2, name: "Mouse Gamer", price: 250.0 },
			{ id: 3, name: "Mechanical Keyboard", price: 400.0 },
		];
	}

	removeProduct(productId: number) {
		this.products = this.products.filter((product) => product.id !== productId);
	}
}
