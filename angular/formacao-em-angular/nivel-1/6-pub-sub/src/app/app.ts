import { Component, signal } from "@angular/core";
import { Products } from "./example-1/components/products/products";
import { ProductsCounter } from "./example-1/components/products-counter/products-counter";
import { ProductsList } from "./example-1/components/products-list/products-list";

@Component({
	selector: "app-root",
	imports: [Products, ProductsList, ProductsCounter],
	templateUrl: "./app.html",
	styleUrl: "./app.css",
})
export class App {
	protected readonly title = signal("6-pub-sub");
}
