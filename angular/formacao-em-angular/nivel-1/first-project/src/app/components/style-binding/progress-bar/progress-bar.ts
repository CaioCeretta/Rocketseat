import { Component } from "@angular/core";

@Component({
	selector: "app-progress-bar",
	imports: [],
	templateUrl: "./progress-bar.html",
	styleUrl: "./progress-bar.css",
})
export class ProgressBar {
	progress: number = 0;

	increaseProgress() {
		this.progress = Math.min(this.progress + 30, 300);
	}
}
