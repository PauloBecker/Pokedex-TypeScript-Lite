import * as readline from "readline";

import { CatalogoPokemon } from "../models/CatalogoPokemon";
import { PokeApiService } from "../services/PokeApiService";

export class TerminalController {
  private pokeApiService = new PokeApiService();

  private catalogo = new CatalogoPokemon();

  private rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  iniciar() {
    console.log("=== Pokédex Lite ===");
    this.mostrarMenu();

    // Callback normal, não async → não retorna Promise
    this.rl.on("line", (opcao) => {
      console.log(`>> Você digitou: ${opcao}`);
      void this.tratarOpcao(opcao.trim()); // chama função async separada
    });
  }

  private mostrarMenu() {
    console.log("\nEscolha uma opção:");
    console.log("1 - Buscar Pokémon (somente visualizar)");
    console.log("2 - Adicionar Pokémon ao catálogo");
    console.log("3 - Listar catálogo");
    console.log("4 - Remover Pokémon");
    console.log("0 - Sair");
    this.rl.setPrompt("Opção: ");
    this.rl.prompt();
  }

  // Função assíncrona separada
  private async tratarOpcao(opcao: string): Promise<void> {
    switch (opcao) {
      case "1":
        await this.buscarPokemon();
        break;
      case "2":
        await this.adicionarPokemon();
        break;
      case "3":
        this.catalogo.listarPokemons();
        break;
      case "4":
        await this.removerPokemon();
        break;
      case "0":
        console.log("Encerrando Pokédex...");
        this.rl.close();
        return;
      default:
        console.log("Opção inválida!");
    }

    this.mostrarMenu();
  }

  private async perguntar(pergunta: string): Promise<string> {
    this.rl.setPrompt(pergunta);
    this.rl.prompt();
    return new Promise((resolve) => {
      // Callback normal, não async
      this.rl.once("line", (resposta) => {
        console.log(`>> Você digitou: ${resposta}`);
        resolve(resposta.trim());
      });
    });
  }

  private async buscarPokemon() {
    const entrada = await this.perguntar("Digite o nome ou ID do Pokémon: ");
    console.log("Buscando Pokémon, aguarde...");
    const pokemon = await this.pokeApiService.buscarPokemon(entrada);
    if (pokemon) {
      console.log(
        `#${String(pokemon.id)} - ${pokemon.name} | Tipos: ${pokemon.tipos.join(", ")} | Altura: ${String(pokemon.altura)} | Peso: ${String(pokemon.peso)}`,
      );
    } else {
      console.log("[ERRO] Pokémon não encontrado.");
    }
  }

  private async adicionarPokemon() {
    const entrada = await this.perguntar(
      "Digite o nome ou ID do Pokémon para adicionar: ",
    );
    const pokemon = await this.pokeApiService.buscarPokemon(entrada);
    if (pokemon) {
      this.catalogo.adicionarPokemon(pokemon);
    } else {
      console.log("[ERRO] Não foi possível adicionar o Pokémon.");
    }
  }

  private async removerPokemon() {
    const entrada = await this.perguntar("Digite o ID do Pokémon a remover: ");
    const id = parseInt(entrada);
    this.catalogo.removerPokemon(id);
  }
}
