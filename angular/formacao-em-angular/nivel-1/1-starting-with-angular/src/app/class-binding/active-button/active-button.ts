import { Component } from "@angular/core";

@Component({
	selector: "app-active-button",
	imports: [],
	template: `
    <button [class.active]="isActive" (click)="toggleActive()">
      Status Button ({{ isActive ? 'Active' : 'Inactive' }})
    </button>
  `,
	styles: `
    button {
      padding: 10px 15px;
      margin: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      cursor: pointer;
      background-color: #f0f0f0;
      color: #333;
      transition: background-color 0.2s ease;
    }

  .active {
    background-color: #007bff;  
  }
  `,
})
export class ActiveButton {
	isActive: boolean = false;

	toggleActive(): void {
		this.isActive = !this.isActive;
	}
}
