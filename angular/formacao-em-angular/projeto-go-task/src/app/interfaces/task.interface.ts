import type { TaskStatus } from "../types/task-status";
import type { ITaskComments } from "./task-comments.interface";

export interface ITask {
	id: string;
	name: string;
	description: string;
	status: TaskStatus;
	comments: ITaskComments[];
}
