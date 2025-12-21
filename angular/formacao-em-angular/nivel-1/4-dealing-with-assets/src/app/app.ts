import { Component, signal } from "@angular/core";
import { HandlingImages } from "./components/handling-images/handling-images";
import { HandlingSvgs } from "./components/handling-svgs/handling-svgs";

@Component({
	selector: "app-root",
	imports: [HandlingImages, HandlingSvgs],
	templateUrl: "./app.html",
	styleUrl: "./app.css",
})
export class App {
	protected readonly title = signal("4-assets");
}
