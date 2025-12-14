import { Component, ViewEncapsulation } from "@angular/core";

@Component({
	selector: "app-user-details",
	imports: [],
	template: `
    <p>
      user-details works!
    </p>
  `,
	styles: `
    p {
      font-weight: bold; 
    }
  `,
	encapsulation: ViewEncapsulation.Emulated,
})
export class UserDetailsComponent {}
