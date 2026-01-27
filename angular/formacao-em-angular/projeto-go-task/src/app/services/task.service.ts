import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import type { ITask } from "../interfaces/task.interface";

@Injectable({
	providedIn: "root",
})
export class TaskService {
	//To-do tasks
	private todoTasks$ = new BehaviorSubject<ITask[]>([]);
	readonly todoTasks = this.todoTasks$.asObservable();

	//Doing task
	private doingTasks$ = new BehaviorSubject<ITask[]>([]);
	readonly doingTasks = this.doingTasks$.asObservable();

	// Completed tasks
	private completedTasks$ = new BehaviorSubject<ITask[]>([]);
	readonly completedTasks = this.completedTasks$.asObservable();
}
