import { Component } from "@angular/core";
import { BotaoFlat } from "./botao-flat/botao-flat";
import { MeuBotao } from "./meu-botao/meu-botao";

@Component({
	selector: "app-root",
	imports: [MeuBotao, BotaoFlat],
	templateUrl: "./app.html",
	styleUrl: "./app.css",
})
export class App {}
