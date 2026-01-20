import { Component, inject } from "@angular/core";
import { Header } from "./components/header/header";
import { MainContent } from "./components/main-content/main-content";
import { TaskCommentsModal } from "./components/task-comments-modal/task-comments-modal";
import { TaskFormModal } from "./components/task-form-modal/task-form-modal";
import { ModalControllerService } from "./services/modal-controller.service";

@Component({
	selector: "app-root",
	imports: [Header, MainContent],
	templateUrl: "./app.html",
	styleUrl: "./app.css",
})
export class App {
	private readonly _modalOpenControllerService = inject(ModalControllerService);

	openTaskModal() {
		this._modalOpenControllerService.openNewTaskModal();
	}

	openCommentsModal() {
		this._modalOpenControllerService.openTaskCommentsModal();
	}

	openEditModal() {
		this._modalOpenControllerService.openTaskCommentsModal();
	}
}
