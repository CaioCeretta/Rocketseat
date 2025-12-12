import { Component } from "@angular/core";
import { BotaoFlat } from "./botao-flat/botao-flat";
import { EventBinding } from "./event-binding/event-binding";
import { MeuBotao } from "./meu-botao/meu-botao";
import { PropertyBinding } from "./property-binding/property-binding";
import { SimpleComponent } from "./simple-component/simple-component";
import { TwoWayDataBinding } from "./two-way-data-binding/two-way-data-binding";

@Component({
	selector: "app-root",
	imports: [
		PropertyBinding,
		MeuBotao,
		EventBinding,
		BotaoFlat,
		TwoWayDataBinding,
		SimpleComponent,
	],
	templateUrl: "./app.html",
	styleUrl: "./app.css",
})
export class App {}
