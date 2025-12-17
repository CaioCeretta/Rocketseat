import { Component } from "@angular/core";
import { NgIf } from "../../../../node_modules/@angular/common/common_module.d-NEF7UaHr";

type UserRole = "admin" | "editor" | "viewer";

@Component({
	selector: "app-if",
	imports: [NgIf],
	templateUrl: "./ngif.component.html",
	styleUrl: "./ngif.component.css",
})
export class IfComponent {
	userRole: UserRole = "viewer";

	setUserRole(role: UserRole) {
		this.userRole = role;
	}
}
