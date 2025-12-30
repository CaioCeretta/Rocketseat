import { Component, inject, type OnInit } from "@angular/core";
import { ProductsCounter } from "../products-counter/products-counter";
import { ProductsList } from "../products-list/products-list";
import { ProductsService } from "../services/products.service";

@Component({
	selector: "app-products",
	imports: [ProductsList, ProductsCounter],
	templateUrl: "./products.html",
	styleUrl: "./products.css",
})
export class Products implements OnInit {
	readonly _productsService = inject(ProductsService);

	productsList: any[] = [];

	ngOnInit() {
		return this._productsService.products$.subscribe((productsList) => {
			console.log("Products Component, products list", productsList);

			this.productsList = productsList;
		});
	}

	createProduct() {
		this._productsService.addProduct(4, "Mic", "300");
	}

	removeFirst() {
		this._productsService.removeFirst();
	}

	modifyList() {
		this.productsList = [];
	}
}
