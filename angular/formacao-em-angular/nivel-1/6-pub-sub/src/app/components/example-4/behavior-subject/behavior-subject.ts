import { Component, type OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Component({
	selector: "app-behavior-subject",
	imports: [],
	templateUrl: "./behavior-subject.html",
	styleUrl: "./behavior-subject.css",
})
export class BehaviorSubjectComponent implements OnInit {
	myBehaviorSubject$ = new BehaviorSubject<string>("First Value");

	ngOnInit() {
		this.firstSubscription();
	}

	firstSubscription() {
		this.myBehaviorSubject$.subscribe((value) => {
			console.log("First subscription: ", value);
		});
	}

	emitValue() {
		this.myBehaviorSubject$.next("Value Sent.");
	}

	newSubscription() {
		this.myBehaviorSubject$.subscribe((value) => {
			console.log("New subscription: ", value);
		});
	}
}
