import { Component, inject } from "@angular/core";
import { Header } from "./components/header/header";
import { MainContent } from "./components/main-content/main-content";
import { ModalControllerService } from "./services/modal-controller.service";

@Component({
	selector: "app-root",
	imports: [Header, MainContent],
	templateUrl: "./app.html",
	styleUrl: "./app.css",
})
export class App {
	private readonly _modalOpenControllerService = inject(ModalControllerService);
}
