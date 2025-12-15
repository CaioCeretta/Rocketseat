import { Component } from "@angular/core";

@Component({
	selector: "app-child",
	imports: [],
	template: `
    <p>
      child works!
    </p>
  `,
	styles: `
    p {
      color: var(--shadow-color)
    }
    :host {
      display: block; /* Web components are inline by default, this will be used to occupy a full line, allowing width/height */
      border: 1px solid  #ddd;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      padding: 0;
      width: 300px;
      float: left
    }

    :host(:hover) {
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
      transform: translateY(-2px);
      transition: all 0.2s ease-in-out;
    }

    /* --- Host variations based on the attributes --- */

    /* When the host has the attribute 'theme=primary' */
    :host([theme="primary"]) {
      background-color: #007bff;
      color: #fff;
    }

     /* When the host has the attribute 'theme=secondary  ' */
    :host([theme="secondary"]) {
      background-color: #6c757d;
      color: #fff;
    }

     /* When the host has the attribute 'size=large' */
    :host([size="large"]) {
      padding: 15px 30px;
      font-size: 18px;
    }

    /* When the host has the attribute disabled */
    :host([disabled]) {
      opacity: 0.6;
      cursor: not-allowed;
      background-color: #ccc
      font-size: 18px;
    }

    /* When the class active is present */
    :host(.active) {
      border-color: #007bff;
      box-shadow: 0 0 10px rgba(0, 123, 255, 0.5);
      background-color: #e6f3ff;
    }

    /* Styles the host and the internal content IF a parent has the theme-dark class. */
    :host-context(.theme-dark) {
      border: 1px solid #555;
      color: white;
      background-color: #333;
    }

  `,
})
export class ChildComponent {}
