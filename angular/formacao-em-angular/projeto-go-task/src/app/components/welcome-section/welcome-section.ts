import { Component, inject } from "@angular/core";
import { ModalControllerService } from "../../services/modal-controller.service";

@Component({
	selector: "app-welcome-section",
	imports: [],
	templateUrl: "./welcome-section.html",
	styleUrl: "./welcome-section.css",
})
export class WelcomeSection {
	private readonly _modalControllerService = inject(ModalControllerService);

	openNewTaskModal() {
		this._modalControllerService.openNewTaskModal();
	}
}
