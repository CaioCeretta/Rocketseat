import { DIALOG_DATA, DialogRef } from "@angular/cdk/dialog";
import { Component, inject } from "@angular/core";
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import type { ITaskFormControls } from "../../interfaces/task-form-controls.interface";
import type { ITaskModalData } from "../../interfaces/task-form-modal-data.interface";

@Component({
	selector: "app-task-form-modal",
	imports: [ReactiveFormsModule],
	templateUrl: "./task-form-modal.html",
	styleUrl: "./task-form-modal.css",
})
export class TaskFormModal {
	// Injects the data passed to the dialog when it was opened
	readonly _data: ITaskModalData = inject(DIALOG_DATA);

	// injects the given DialogRef of the current modal.
	readonly _dialogRef = inject(DialogRef);

	taskForm: FormGroup = new FormGroup({
		name: new FormControl(this._data.formValues.name ?? "", [
			Validators.required,
			Validators.minLength(10),
		]),
		description: new FormControl(this._data.formValues.description ?? "", [
			Validators.required,
			Validators.minLength(10),
		]),
	});

	onFormSubmit() {
		if (this.taskForm.invalid) return;

		this._dialogRef.close(this.taskForm.value);
	}

	closeModal(formValues: ITaskFormControls | undefined = undefined) {
		this._dialogRef.close(undefined);
	}
}
