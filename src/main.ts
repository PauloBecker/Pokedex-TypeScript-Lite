import { CatalogoPokemon } from "./models/CatalogoPokemon";
import { PokeApiService } from "./services/PokeApiService";

async function main() {
  const pokeApiService = new PokeApiService();
  const catalogo = new CatalogoPokemon();

  const pikachu = await pokeApiService.buscarPokemon("pikachu");
  if (pikachu) {
    catalogo.adicionarPokemon(pikachu);
  }

  const charizard = await pokeApiService.buscarPokemon("charizard");
  if (charizard) {
    catalogo.adicionarPokemon(charizard);
  }

  console.log("\n--- Catálogo de Pokémons ---");
  catalogo.listarPokemons();
}

main().catch(console.error);
