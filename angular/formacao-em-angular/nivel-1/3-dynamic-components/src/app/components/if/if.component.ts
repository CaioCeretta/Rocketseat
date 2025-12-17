import { Component } from "@angular/core";

type UserRole = "admin" | "editor" | "viewer";

@Component({
	selector: "app-if",
	imports: [],
	templateUrl: "./if.component.html",
	styleUrl: "./if.component.css",
})
export class IfComponent {
	userRole: UserRole = "viewer";

	setUserRole(role: UserRole) {
		this.userRole = role;
	}
}
