import { Component, signal } from "@angular/core";
import { GoogleFonts } from "./components/google-fonts/google-fonts";
// import { FontAwesomeCdn } from "./components/font-awesome-cdn/font-awesome-cdn";
// import { FontAwesomeNg } from "./components/font-awesome-ng/font-awesome-ng";
// import { OwnFonts } from "./components/own-fonts/own-fonts";
// import { HandlingImages } from "./components/handling-images/handling-images";
// import { HandlingSvgs } from "./components/handling-svgs/handling-svgs";

@Component({
	selector: "app-root",
	imports: [GoogleFonts],
	templateUrl: "./app.html",
	styleUrl: "./app.css",
})
export class App {
	protected readonly title = signal("4-assets");
}
