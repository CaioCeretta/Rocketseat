import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class ProductsService {
	products = [
		{ id: 1, name: "Bicycle", price: "1000" },
		{ id: 2, name: "Monitor", price: "800" },
		{ id: 3, name: "Bicycle", price: "100" },
	];

	addProduct(id: number, name: string, price: string) {
		this.products = [...this.products, { id, name, price }];
	}

	removeProduct(id: number) {
		const newProducts = this.products.filter((product) => product.id !== id);

		this.products = newProducts;
	}
}
