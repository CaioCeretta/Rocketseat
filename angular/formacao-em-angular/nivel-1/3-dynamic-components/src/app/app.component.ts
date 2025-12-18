import { Component } from "@angular/core";
import { ForComponent } from "./components/for/for.component";
import { LetComponent } from "./components/let/let.component";
import { NgforComponent } from "./components/ngfor/ngfor.component";
// import { IfComponent } from "./components/if/if.component";
// import { SwitchComponent } from "./switch/switch.component";

@Component({
	selector: "app-root",
	imports: [ForComponent, NgforComponent, LetComponent],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.css",
})
export class AppComponent {
	title = "dynamic-components";
}
