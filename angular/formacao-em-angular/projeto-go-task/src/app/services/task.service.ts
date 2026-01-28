import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import type { ITask } from "../interfaces/task.interface";
import type { ITaskFormControls } from "../interfaces/task-form-controls.interface";
import { TaskStatusEnum } from "../types/task-status";
import { generateUniqueIdWithTimeStamp } from "../utils/generate-unique-id-with-timestamp";

@Injectable({
	providedIn: "root",
})
export class TaskService {
	//To-do tasks
	private todoTasks$ = new BehaviorSubject<ITask[]>([
		{
			id: "1234",
			comments: [],
			name: "jdasjdiosajdia",
			description: "jdioasjdiakosjdioas",
			status: TaskStatusEnum.TODO,
		},
	]);
	readonly todoTasks = this.todoTasks$.asObservable();

	//Doing task
	private doingTasks$ = new BehaviorSubject<ITask[]>([]);
	readonly doingTasks = this.doingTasks$.asObservable();

	// Completed tasks
	private completedTasks$ = new BehaviorSubject<ITask[]>([]);
	readonly completedTasks = this.completedTasks$.asObservable();

	//addTask method
	addTasks(taskInfos: ITaskFormControls) {
		const newTask: ITask = {
			id: generateUniqueIdWithTimeStamp(),
			...taskInfos,
			status: TaskStatusEnum.TODO,
			comments: [],
		};

		const currentList = this.todoTasks$.value;

		this.todoTasks$.next([...currentList, newTask]);
	}

	carregarListaAtualDeToDos() {
		console.log(this.todoTasks$.value);
	}
}
