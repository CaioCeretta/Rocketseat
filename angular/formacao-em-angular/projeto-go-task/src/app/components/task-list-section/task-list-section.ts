import { Component, inject } from "@angular/core";
import type { ITask } from "../../interfaces/task.interface";
import type { ITaskFormControls } from "../../interfaces/task-form-controls.interface";
import { TaskService } from "../../services/task.service";
import { TaskStatusEnum } from "../../types/task-status";
import { generateUniqueIdWithTimeStamp } from "../../utils/generate-unique-id-with-timestamp";
import { TaskCard } from "../task-card/task-card";

@Component({
	selector: "app-task-list-section",
	imports: [TaskCard],
	templateUrl: "./task-list-section.html",
	styleUrl: "./task-list-section.css",
})
export class TaskListSection {
	private readonly _taskService = inject(TaskService);

	private currentList: ITask[] = [];

	ngOnInit() {
		this._taskService.todoTasks.subscribe((todoList) => {
			this.currentList = todoList;

			todoList[0].name = "Nome alterado";

			this._taskService.carregarListaAtualDeToDos();
		});
	}
}
