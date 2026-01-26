import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class TaskService {
	//To-do tasks
	private todoTasks$ = new BehaviorSubject<any[]>([]);
	readonly todoTasks = this.todoTasks$.asObservable();

	//Doing task
	private doingTasks$ = new BehaviorSubject<any[]>([]);
	readonly doingTasks = this.doingTasks$.asObservable();

	// Completed tasks
	private completedTasks$ = new BehaviorSubject<any[]>([]);
	readonly completedTasks = this.completedTasks$.asObservable();
}
