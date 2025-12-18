import { DecimalPipe, NgFor, NgIf } from "@angular/common";
import { Component } from "@angular/core";

interface IProduct {
	id: number;
	name: string;
	price: number;
}

@Component({
	selector: "app-ngfor",
	imports: [DecimalPipe, NgFor, NgIf],
	templateUrl: "./ngfor.component.html",
	styleUrl: "./ngfor.component.css",
})
export class NgforComponent {
	products: IProduct[] = [
		{ id: 1, name: "Laptop Pro", price: 5500.0 },
		{ id: 2, name: "Mouse Gamer", price: 250.0 },
		{ id: 3, name: "Mechanical Keyboard", price: 400.0 },
	];

	trackById(index: number, product: IProduct): number {
		return product.id;
	}

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
