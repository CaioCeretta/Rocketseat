import { DIALOG_DATA } from "@angular/cdk/dialog";
import { Component, inject } from "@angular/core";
import type { ITaskModalData } from "../../interfaces/task-form-modal-data.interface";

@Component({
	selector: "app-task-form-modal",
	imports: [],
	templateUrl: "./task-form-modal.html",
	styleUrl: "./task-form-modal.css",
})
export class TaskFormModal {
	// Injects the data passed to the dialog when it was opened
	readonly _data: ITaskModalData = inject(DIALOG_DATA);
}
