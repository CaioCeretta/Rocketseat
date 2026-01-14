import { Component, signal } from "@angular/core";
import { Header } from "./components/header/header";
import { MainContent } from "./components/main-content/main-content";
import { TaskCommentsModal } from "./components/task-comments-modal/task-comments-modal";
import { TaskFormModal } from "./components/task-form-modal/task-form-modal";

@Component({
	selector: "app-root",
	imports: [Header, MainContent, TaskFormModal, TaskCommentsModal],
	templateUrl: "./app.html",
	styleUrl: "./app.css",
})
export class App {
	protected readonly title = signal("projeto-go-task");
}
