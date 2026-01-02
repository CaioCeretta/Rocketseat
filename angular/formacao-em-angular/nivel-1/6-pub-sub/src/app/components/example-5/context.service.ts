import { Injectable } from "@angular/core";
import { BehaviorSubject, map } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class ContextService {
	private itemsSubject = new BehaviorSubject<any[]>([]);

	items$ = this.itemsSubject.asObservable().pipe(
		map((itemsList: any[]) => {
			return structuredClone(itemsList);
		}),
	);

	getValue() {
		return structuredClone(this.itemsSubject.value);
	}

	addItem(item: { name: string; price: number }) {
		const currentList = this.itemsSubject.value;

		this.itemsSubject.next([...currentList, item]);
	}
}
