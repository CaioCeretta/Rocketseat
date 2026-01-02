import { Component, inject, type OnInit } from "@angular/core";
import { ContextService } from "../context.service";

@Component({
	selector: "app-behavior-context",
	imports: [],
	templateUrl: "./behavior-context.html",
	styleUrl: "./behavior-context.css",
})
export class BehaviorContext implements OnInit {
	private readonly _contextService = inject(ContextService);

	ngOnInit(): void {
		this._contextService.items$.subscribe();

		this._contextService.addItem({ name: "test", price: 10 });
	}
}
