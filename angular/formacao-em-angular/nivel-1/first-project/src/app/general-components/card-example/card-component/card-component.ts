import { Component } from "@angular/core";

@Component({
	selector: "app-card-component",
	imports: [],
	template: `
    <div class="card-container">
      <div class="card-header">
        <h2>Card Title</h2>
      </div>
      <div class="card-body">
        Card Content
      </div>
      <div class="card-footer">
        Card Footer
      </div>
    </div>
  `,
	styles: `
    /* Attention: Width and margins are not here! This allows the component to be reusable. The external layout style will
    be defined by the parent */
    .card-container {
      background-color: #FFFFFF;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      overflow: hidden; /* Ensures that the content does not leak */
      display: flex;
      flex-direction: column;
      min-height: 100px;
    }

    .card-header {
      padding: 15px 20px;
      background-color: #f8f8f8;
      border-bottom: 1px solid #e0e0e0;
    }

    .card-header h2 {
      margin: 0; // Removes the default margin of a h2
      font-size: 1em; //Adjust the font-size inside header
    }

    .card-body {
      padding: 20px;
      flex-grow: 1; /* Occupies the remaining space inside the container */
      color: #555;
      line-height: 1.6;
    }

    .card-footer {
      padding: 10px 20px;
      background-color: #f8f8f8;
      border-top: 1px solid #e0e0e0;
      font-size: 0.9em;
      color: #777;
      text-align: right;
    }


  `,
})
export class CardComponent {}
