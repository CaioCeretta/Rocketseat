import { Component } from "@angular/core";
import { IfComponent } from "./components/if/if.component";

@Component({
	selector: "app-root",
	imports: [IfComponent],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.css",
})
export class AppComponent {
	title = "dynamic-components";
}
