import { AsyncPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { ProductsService } from "../services/products.service";

@Component({
	selector: "app-products-list",
	imports: [AsyncPipe],
	templateUrl: "./products-list.html",
	styleUrl: "./products-list.css",
})
export class ProductsList {
	readonly _productsService = inject(ProductsService);

	// exposing the observable directly to the template
	products$ = this._productsService.products$;

	removeProduct(id: number) {
		this._productsService.removeProduct(id);
	}
}
