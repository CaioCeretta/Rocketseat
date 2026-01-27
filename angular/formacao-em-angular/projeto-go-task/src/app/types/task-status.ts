export enum TaskStatusEnum {
	TODO = "to-do",
	DOING = "doing",
	DONE = "done",
}

export type TaskStatus =
	| TaskStatusEnum.TODO
	| TaskStatusEnum.DOING
	| TaskStatusEnum.DONE;
