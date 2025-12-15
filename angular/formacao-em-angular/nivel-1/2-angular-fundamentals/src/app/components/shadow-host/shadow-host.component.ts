import { Component, ViewEncapsulation } from "@angular/core";
import { ChildComponent } from "../child/child.component";

@Component({
	selector: "app-shadow-host",
	imports: [ChildComponent],
	template: `
    <p>shadow-host works!</p>
    <app-child theme="primary" size="large"/>
    <app-child theme="secondary"/>
    <app-child disabled/>
    <app-child class="active"  />

    <div class="theme-dark">
      <app-child/>
      <app-child/>
      <app-child/>
    </div>

  `,
	styles: `
    :host {
      --shadow-color: blue; 
    }
    p {
      color: var(--secondary-color);
    }
  `,

	encapsulation: ViewEncapsulation.ShadowDom,
})
export class ShadowHostComponent {}
