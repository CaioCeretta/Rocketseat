import { Component, type OnInit } from "@angular/core";
import { Subject } from "rxjs";

@Component({
	selector: "app-subject-component",
	imports: [],
	templateUrl: "./subject-component.html",
	styleUrl: "./subject-component.css",
})
export class SubjectComponent implements OnInit {
	mySubject$: Subject<string> = new Subject<string>();

	ngOnInit(): void {
		this.mySubject$.next("No one will know about this");

		this.firstSubscription();

		setTimeout(() => {
			this.mySubject$.next("New emitted value");
		}, 3000);
	}

	firstSubscription() {
		// Initial code
		this.mySubject$.subscribe((value) => {
			console.log("First subscription: ", value);
		});
	}

	secondSubscription() {
		this.mySubject$.subscribe((value) => {
			console.log("Second Subscription", value);
		});
	}
}
