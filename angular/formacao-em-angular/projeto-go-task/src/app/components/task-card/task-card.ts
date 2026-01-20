import { Component, inject } from "@angular/core";
import { ModalControllerService } from "../../services/modal-controller.service";

@Component({
	selector: "app-task-card",
	imports: [],
	templateUrl: "./task-card.html",
	styleUrl: "./task-card.css",
})
export class TaskCard {
	private readonly _modalControllerService = inject(ModalControllerService);

	openEditModal() {
		this._modalControllerService.openEditTaskModal();
	}
}
