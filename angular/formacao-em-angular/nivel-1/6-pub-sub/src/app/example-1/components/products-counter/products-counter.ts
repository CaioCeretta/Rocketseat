import { AsyncPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { map } from "rxjs";
import { ProductsService } from "../../services/products.service";

@Component({
	selector: "app-products-counter",
	imports: [AsyncPipe],
	templateUrl: "./products-counter.html",
	styleUrl: "./products-counter.css",
})
export class ProductsCounter {
	readonly _productsService = inject(ProductsService);

	productsQuantity$ = this._productsService.products$.pipe(
		map((products) => products.length),
	);
}
