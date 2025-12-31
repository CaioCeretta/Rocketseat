import { AsyncPipe } from "@angular/common";
import { Component, type OnDestroy, type OnInit } from "@angular/core";
import { filter, map, Observable, type Subscription, tap } from "rxjs";

@Component({
	selector: "app-observables",
	imports: [AsyncPipe],
	templateUrl: "./observables.html",
	styleUrl: "./observables.css",
})
export class Observables implements OnInit, OnDestroy {
	myObservable$!: Observable<number>;
	mySubs!: Subscription;
	observableList$!: Observable<string[]>;

	ngOnInit(): void {
		this.createObservable();
		// this.subscription1( );
		this.createObservableList();
		// this.subscriptionUppercaseList();
		this.oddSubscriptions();
	}

	ngOnDestroy(): void {
		this.mySubs.unsubscribe();
	}

	createObservable() {
		this.myObservable$ = new Observable<number>((subscriber) => {
			console.log("Executing observable");
			subscriber.next(1);
			subscriber.next(2);
			subscriber.next(3);

			setTimeout(() => {
				subscriber.next(4);
			}, 4000);
		});
	}

	subscription1() {
		this.mySubs = this.myObservable$.subscribe((value) => {
			console.log(value);
		});
	}

	createObservableList() {
		this.observableList$ = new Observable((subscriber) => {
			setTimeout(() => {
				subscriber.next(["Caio", "Alex", "André"]);
			}, 1000);
			setTimeout(() => {
				subscriber.next(["Regina", "José"]);
			}, 2000);
		});
	}

	subscriptionUppercaseList() {
		this.observableList$
			.pipe(
				map((list) => {
					return list.map((name) => name.toUpperCase());
				}),
			)
			.subscribe((list) => {
				console.log("List: ", list);
			});
	}

	oddSubscriptions() {
		this.myObservable$
			.pipe(
				tap((number) => console.log("Tap: ", number)),
				filter((number) => number % 2 !== 0),
			)
			.subscribe((number) => console.log("Odd number: ", number));
	}
}
