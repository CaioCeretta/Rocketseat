import { Component, inject } from "@angular/core";
import { ModalControllerService } from "../../services/modal-controller.service";
import { generateUniqueIdWithTimeStamp } from "../../utils/generate-unique-id-with-timestamp";

@Component({
	selector: "app-welcome-section",
	imports: [],
	templateUrl: "./welcome-section.html",
	styleUrl: "./welcome-section.css",
})
export class WelcomeSection {
	private readonly _modalControllerService = inject(ModalControllerService);

	// myApproach - The modal execution is handled everything in the service
	//openNewTaskModal() {
	// 	this._modalControllerService.openNewTaskModal();
	// }

	//instrucotr's approach - The modal is returned by reference, and the close and the closed is dealt inside of here
	openNewTaskModal() {
		const dialogRef = this._modalControllerService.openNewTaskModal();

		dialogRef.closed.subscribe((taskForm) => {
			console.log("Tarefa criada: ", taskForm);
		});
	}
}
