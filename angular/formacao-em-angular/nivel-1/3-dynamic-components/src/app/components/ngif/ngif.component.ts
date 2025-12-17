import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

type UserRole = "admin" | "editor" | "viewer";

@Component({
	selector: "app-if",
	imports: [CommonModule],
	templateUrl: "./ngif.component.html",
	styleUrl: "./ngif.component.css",
})
export class IfComponent {
	userRole: UserRole = "viewer";

	setUserRole(role: UserRole) {
		this.userRole = role;
	}
}
