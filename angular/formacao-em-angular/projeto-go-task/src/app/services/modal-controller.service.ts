import { Dialog } from "@angular/cdk/dialog";
import { Injectable, inject } from "@angular/core";
import { TaskCommentsModal } from "../components/task-comments-modal/task-comments-modal";
import { TaskFormModal } from "../components/task-form-modal/task-form-modal";

@Injectable({
	providedIn: "root",
})
export class ModalControllerService {
	private readonly modalSizeOptions = {
		maxWidth: "620px",
		width: "95%",
	};

	private readonly _dialog = inject(Dialog);

	openNewTaskModal() {
		return this._dialog.open(TaskFormModal, {
			...this.modalSizeOptions,
		});
	}

	openEditTaskModal() {
		return this._dialog.open(TaskFormModal, {
			...this.modalSizeOptions,
		});
	}

	openTaskCommentsModal() {
		return this._dialog.open(TaskFormModal, {
			...this.modalSizeOptions,
		});
	}
}
