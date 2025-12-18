import { Component } from "@angular/core";

type UserRole = "admin" | "editor" | "viewer";

@Component({
	selector: "app-switch",
	imports: [],
	templateUrl: "./switch.component.html",
	styleUrl: "./switch.component.css",
})
export class SwitchComponent {
	userRole: UserRole = "viewer";

	setUserRole(role: UserRole) {
		this.userRole = role;
	}
}
