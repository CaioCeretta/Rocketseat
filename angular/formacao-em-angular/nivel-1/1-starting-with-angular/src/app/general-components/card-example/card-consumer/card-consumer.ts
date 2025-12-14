import { Component } from "@angular/core";
import { CardComponent } from "../card-component/card-component";

@Component({
	selector: "app-card-consumer",
	imports: [CardComponent],
	template: `
    <div class="size-1">
      <app-card-component />
    </div>
    <div class="size-2">
      <app-card-component />
    </div>
    <div>
      <app-card-component />
    </div>
  `,
	styles: ` 
    .size-1 {
      max-width: 400px; // Limits the maximum width for each card
      width: 100%; // Ensures it adjust itself for smaller screens
      margin-bottom: 220px; // Margin between cards
    }

    .size-2 {
      max-width: 600px; // Maximum width for this specific card
      width: 100%;
      margin-left: auto; // Horizontally centers in case there is enough space
      margin-right: auto;
      margin-bottom: 30px; 
    }

    .size-3 {

    }
  `,
})
export class CardConsumer {}
