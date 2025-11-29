import { Component } from "@angular/core";
import { PropertyBinding } from "./property-binding/property-binding";

@Component({
	selector: "app-root",
	imports: [PropertyBinding],
	templateUrl: "./app.html",
	styleUrl: "./app.css",
})
export class App {}
