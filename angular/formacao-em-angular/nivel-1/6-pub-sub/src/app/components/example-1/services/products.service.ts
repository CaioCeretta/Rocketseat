import { Injectable } from "@angular/core";
import { BehaviorSubject, map } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class ProductsService {
	private products = new BehaviorSubject<any[]>([
		{ id: 1, name: "Bicycle", price: "1000" },
		{ id: 2, name: "Monitor", price: "800" },
		{ id: 3, name: "Bicycle", price: "100" },
	]);

	readonly products$ = this.products
		.asObservable()
		.pipe(map((products) => structuredClone(products)));

	addProduct(id: number, name: string, price: string) {
		const newProductsList = [...this.products.getValue(), { id, name, price }];

		this.products.next(newProductsList);
	}

	removeProduct(id: number) {
		const newProductsList = this.products
			.getValue()
			.filter((product) => product.id !== id);

		this.products.next(newProductsList);
	}

	removeFirst() {
		const newProducts = this.products
			.getValue()
			.filter((product) => product.id !== 1);

		this.products.next(newProducts);
	}
}
