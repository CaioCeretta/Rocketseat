import { Component, inject } from "@angular/core";
import { ProductsService } from "../services/products.service";

@Component({
	selector: "app-products",
	imports: [],
	templateUrl: "./products.html",
	styleUrl: "./products.css",
})
export class Products {
	readonly _productsService = inject(ProductsService);

	get products() {
		return this._productsService.products;
	}

	createProduct() {
		this._productsService.addProduct(3, "Mic", "300");
	}

	removeProduct(id: number) {
		this._productsService.removeProduct(id);
	}
}
