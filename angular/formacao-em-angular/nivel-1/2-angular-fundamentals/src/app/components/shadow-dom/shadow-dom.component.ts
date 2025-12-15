import { Component, ViewEncapsulation } from "@angular/core";

@Component({
	selector: "app-shadow-dom",
	imports: [],
	template: `
    <div class="shadow-container">
      <h1>Shadow DOM Component</h1>
      <p>This paragraph uses local stylings</p>
      <button>Click me! </button>
  `,
	styles: `
    /* The styles in here are only going to be isolated by the Shadow DOM */
    .shadow-container {
      border: 2px solid green;
      padding: 10px;
      display: block;
    }  

    button {
      background-color: blue;
      color: white;
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
    }
  `,
	encapsulation: ViewEncapsulation.ShadowDom,
})
export class ShadowDomComponent {}
