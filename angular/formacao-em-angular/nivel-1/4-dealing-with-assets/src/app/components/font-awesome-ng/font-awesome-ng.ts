import { Component } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faCar } from "@fortawesome/free-solid-svg-icons";

@Component({
	selector: "app-font-awesome-ng",
	imports: [FontAwesomeModule],
	templateUrl: "./font-awesome-ng.html",
	styleUrl: "./font-awesome-ng.css",
})
export class FontAwesomeNg {
	faCar = faCar;
}
