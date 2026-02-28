import { Component, inject } from "@angular/core";
import type { ITask } from "../../interfaces/task.interface";
import { TaskService } from "../../services/task.service";
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

			todoList[0].name = "Modified Name";

			this._taskService.loadCurrentTodosList();
		});
	}
}
