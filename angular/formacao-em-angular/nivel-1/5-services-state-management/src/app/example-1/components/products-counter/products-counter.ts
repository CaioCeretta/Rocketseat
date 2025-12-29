import { Component, inject } from "@angular/core";
import { ProductsService } from "../../services/products.service";

@Component({
	selector: "app-products-counter",
	imports: [],
	templateUrl: "./products-counter.html",
	styleUrl: "./products-counter.css",
})
export class ProductsCounter {
	readonly _productsService = inject(ProductsService);

	get productsQuantity() {
		return this._productsService.products.length;
	}
}
