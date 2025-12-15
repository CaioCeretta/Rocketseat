import { Component } from "@angular/core";
import { ShadowHostComponent } from "./components/shadow-host/shadow-host.component";
// import { UserDetailsComponent } from "./components/user-details/user-details.component";
// import { ProductCardComponent } from "./components/product-card/product-card.component";
// import { ShadowDomComponent } from "./components/shadow-dom/shadow-dom.component";

@Component({
	selector: "app-root",
	imports: [ShadowHostComponent],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.css",
})
export class AppComponent {
	title = "view-encapsulation-test";
}
