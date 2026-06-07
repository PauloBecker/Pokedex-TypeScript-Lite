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
    void this.loopMenu();
  }

  private async loopMenu(): Promise<void> {
    this.mostrarMenu();
    const opcao = await this.perguntar("Opção: ");

    await this.tratarOpcao(opcao.trim());

    if (opcao !== "0") {
      await this.loopMenu(); // volta ao menu até sair
    }
  }

  private mostrarMenu() {
    console.log("\nEscolha uma opção:");
    console.log("1 - Buscar Pokémon (somente visualizar)");
    console.log("2 - Adicionar Pokémon ao catálogo");
    console.log("3 - Listar catálogo");
    console.log("4 - Remover Pokémon");
    console.log("0 - Sair");
  }

  private async tratarOpcao(opcao: string): Promise<void> {
    switch (opcao) {
      case "1":
        await this.buscarPokemon();
        break;
      case "2":
        await this.adicionarPokemon();
        break;
      case "3":
        this.listarPokemons();
        break;
      case "4":
        await this.removerPokemon();
        break;
      case "0":
        console.log("Encerrando Pokédex...");
        this.rl.close();
        return;
      default:
        console.log("[ERRO] Opção inválida!");
    }
  }

  private async perguntar(pergunta: string): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(pergunta, (resposta) => {
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

  private listarPokemons() {
    const pokemons = this.catalogo.listarPokemons();
    if (pokemons.length === 0) {
      console.log("[AVISO] O catálogo está vazio.");
      return;
    }
    console.log("\n=== Catálogo de Pokémon ===");
    pokemons.forEach((p) => {
      console.log(
        `#${String(p.id)} - ${p.name} | Tipos: ${p.tipos.join(", ")} | Altura: ${String(p.altura)} | Peso: ${String(p.peso)}`,
      );
    });
  }
}
