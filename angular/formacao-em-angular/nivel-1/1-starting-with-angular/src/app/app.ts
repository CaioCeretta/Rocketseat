import { Component } from "@angular/core";
// import { BotaoFlat } from "./botao-flat/botao-flat";
// import { InvalidInput } from "./class-binding/invalid-input/invalid-input";
// import { SimpleVisibility } from "./class-binding/simple-visibility/simple-visibility";
// import { CardComponent } from "./general-components/card-example/card-component/card-component";
import { CardConsumer } from "./general-components/card-example/card-consumer/card-consumer";
// import { DynamicText } from "./components/style-binding/dynamic-text/dynamic-text";
// import { ProgressBar } from "./components/style-binding/progress-bar/progress-bar";
// import { SimpleComponent } from "./components/style-binding/simple/simple-component";
// import { SquarePopup } from "./components/style-binding/square-popup/square-popup";
// import { EventBinding } from "./event-binding/event-binding";
// import { MeuBotao } from "./meu-botao/meu-botao";
// import { PropertyBinding } from "./property-binding/property-binding";
// import { TwoWayDataBinding } from "./two-way-data-binding/two-way-data-binding";

@Component({
	selector: "app-root",
	imports: [CardConsumer],
	templateUrl: "./app.html",
	styleUrl: "./app.css",
})
export class App {}
