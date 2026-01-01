import { Component, signal } from "@angular/core";
// import { SubjectComponent } from "./components/example-3/subject/subject-component";
import { BehaviorSubjectComponent } from "./components/example-4/behavior-subject/behavior-subject";
// import { Products } from "./components/example-1/products/products";
// import { ProductsCounter } from "./components/example-1/products-counter/products-counter";
// import { ProductsList } from "./components/example-1/products-list/products-list";
// import { Observables } from "./components/example-2/observables/observables";

@Component({
	selector: "app-root",
	imports: [BehaviorSubjectComponent],
	templateUrl: "./app.html",
	styleUrl: "./app.css",
})
export class App {
	protected readonly title = signal("6-pub-sub");
}
