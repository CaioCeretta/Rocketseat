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

	// myApproach
	// openEditModal() {
	// 	this._modalControllerService.openEditTaskModal({
	// 		name: "Nome Tarefa",
	// 		description: "Descrição tarefa",
	// 	});
	// }

	// instructor's
	openEditModal() {
		const dialogRef = this._modalControllerService.openEditTaskModal({
			name: "Nome da tarefa",
			description: "Descrição da tarefa",
		});
	}
}
