import { Component, inject } from "@angular/core";
import { ProductsService } from "../../services/products.service";
import { ProductsCounter } from "../products-counter/products-counter";
import { ProductsList } from "../products-list/products-list";

@Component({
	selector: "app-products",
	imports: [ProductsList, ProductsCounter],
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

	removeFirst() {
		this._productsService.removeFirst(1);
	}

	modifyList() {
		this._productsService.products = []; // WRONG
	}
}
