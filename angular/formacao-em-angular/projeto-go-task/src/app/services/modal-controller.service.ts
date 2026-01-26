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

	//myApproach, the closing process happen on the service
	// openNewTaskModal() {
	// 	const dialogRef = this._dialog.open<ITaskFormControls>(TaskFormModal, {
	// 		...this.modalSizeOptions,
	// 		disableClose: true,
	// 		data: {
	// 			mode: "create",
	// 			formValues: {
	// 				name: "",
	// 				description: "",
	// 			},
	// 		},
	// 	});

	// 	dialogRef.closed.subscribe((result) => {
	// 		console.log("The dialog was closed", result);
	// 	});
	// }

	// instructor approach, return the modal to the component, the service, only returns
	openNewTaskModal() {
		return this._dialog.open<ITaskFormControls>(TaskFormModal, {
			...this.modalSizeOptions,
			disableClose: true,
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
		return this._dialog.open<ITaskFormControls>(TaskFormModal, {
			...this.modalSizeOptions,
			disableClose: true,
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
