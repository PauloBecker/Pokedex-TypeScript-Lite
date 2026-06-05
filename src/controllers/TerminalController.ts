import * as readline from "readline";

import { CatalogoPokemon } from "../models/CatalogoPokemon";
import { PokeApiService } from "../services/PokeApiService";

export class TerminalController {
  private pokeApiService: PokeApiService;

  private catalogo: CatalogoPokemon;

  private rl: readline.Interface;

  constructor() {
    this.pokeApiService = new PokeApiService();
    this.catalogo = new CatalogoPokemon();
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  iniciar() {
    console.log("=== Pokédex Lite ===");
    void this.menu();
  }

  // Função auxiliar para usar await com readline
  private perguntar(pergunta: string): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(pergunta, (resposta) => {
        resolve(resposta);
      });
    });
  }

  private async menu() {
    console.log("\nEscolha uma opção:");
    console.log("1 - Buscar Pokémon (somente visualizar)");
    console.log("2 - Adicionar Pokémon ao catálogo");
    console.log("3 - Listar catálogo");
    console.log("4 - Remover Pokémon");
    console.log("0 - Sair");

    const opcao = await this.perguntar("Opção: ");

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

    void this.menu(); // volta ao menu
  }

  private async buscarPokemon() {
    const entrada = await this.perguntar("Digite o nome ou ID do Pokémon: ");
    const pokemon = await this.pokeApiService.buscarPokemon(entrada);
    if (pokemon) {
      console.log(
        `#${pokemon.id.toString()} - ${pokemon.name} | Tipos: ${pokemon.tipos.join(", ")} | Altura: ${pokemon.altura.toString()} | Peso: ${pokemon.peso.toString()}`,
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
