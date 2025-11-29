import { Component } from "@angular/core";
import { PropertyBinding } from "./property-binding/property-binding";
import { MeuBotao } from "./meu-botao/meu-botao";
import { EventBinding } from "./event-binding/event-binding";
import { BotaoFlat } from "./botao-flat/botao-flat";
import { TwoWayDataBinding } from "./two-way-data-binding/two-way-data-binding";

@Component({
	selector: "app-root",
	imports: [PropertyBinding, MeuBotao, EventBinding, BotaoFlat, TwoWayDataBinding],
	templateUrl: "./app.html",
	styleUrl: "./app.css",
})
export class App {}
