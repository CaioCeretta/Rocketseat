import { Component } from "@angular/core";

@Component({
	selector: "app-meu-botao",
	imports: [],
	templateUrl: "./meu-botao.html",
	styleUrl: "./meu-botao.css",
})
export class MeuBotao {
	clear() {
		console.log("Clear method!");
	}

	filtrar() {
		console.log("Filter method!");
	}
}
