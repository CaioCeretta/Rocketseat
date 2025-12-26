import { Component, signal } from "@angular/core";
import { Products } from "./components/example-1/products/products";

@Component({
	selector: "app-root",
	imports: [Products],
	templateUrl: "./app.html",
	styleUrl: "./app.css",
})
export class App {}
