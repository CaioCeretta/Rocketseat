import { Dialog } from "@angular/cdk/dialog";
import { Injectable, inject } from "@angular/core";
import { TaskCommentsModal } from "../components/task-comments-modal/task-comments-modal";
import { TaskFormModal } from "../components/task-form-modal/task-form-modal";
import type { ITaskFormControls } from "../interfaces/task-form-controls.interface";

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
			data: {
				mode: "create",
				formValues: {
					name: "",
					description: "",
				},
			},
		});
	}

	openEditTaskModal(formValues: ITaskFormControls) {
		return this._dialog.open(TaskFormModal, {
			...this.modalSizeOptions,
			data: {
				mode: "edit",
				formValues,
			},
		});
	}

	openTaskCommentsModal() {
		return this._dialog.open(TaskCommentsModal, {
			...this.modalSizeOptions,
		});
	}
}
