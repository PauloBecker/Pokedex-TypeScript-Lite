import { TerminalController } from "./controllers/TerminalController";

function main() {
  const terminalController = new TerminalController();
  terminalController.iniciar();
}

main();

// const pokeApiService = new PokeApiService();
// const catalogo = new CatalogoPokemon();

// const pikachu = await pokeApiService.buscarPokemon("pikachu");
// if (pikachu) {
//   catalogo.adicionarPokemon(pikachu);
// }

// const charmander = await pokeApiService.buscarPokemon("charmander");
// if (charmander) {
//   catalogo.adicionarPokemon(charmander);
// }

// const charizard = await pokeApiService.buscarPokemon("charizard");
// if (charizard) {
//   catalogo.adicionarPokemon(charizard);
// }

// console.log("\n--- Catálogo de Pokémons ---");
// catalogo.listarPokemons();

// const duplicado = await pokeApiService.buscarPokemon("pikachu");
// if (duplicado) {
//   catalogo.adicionarPokemon(duplicado);
// }

// await pokeApiService.buscarPokemon("invalidPokemon");

// console.log("\n--- Removendo Pikachu ---");
// if (pikachu) {
//   catalogo.removerPokemon(pikachu.id);
// }

// console.log("\n--- Catálogo de Pokémons após remoção ---");
// catalogo.listarPokemons();

// catalogo.removerPokemon(6);
// console.log("\n--- Catálogo de Pokémons após remoção ---");
// catalogo.listarPokemons();
