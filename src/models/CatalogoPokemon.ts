/* eslint-disable prettier/prettier */
import { PokemonResumo } from './Pokemon';

export class CatalogoPokemon {
  private pokemons: PokemonResumo[] = [];

    adicionarPokemon(pokemon: PokemonResumo): void {
        if(this.pokemons.some(p => p.id === pokemon.id)) {
            console.log(`[AVISO] Pokémón  ${pokemon.name} já existe no catálogo.`);
            return;
        }
        this.pokemons.push(pokemon);
        console.log(`[OK] Pokémón  ${pokemon.name} adicionado ao catálogo.`);
    }

    listarPokemons(): void {
        if(this.pokemons.length === 0) {
            console.log('[AVISO] O catálogo de pokémons está vazio.');
            return;
        }
        this.pokemons.forEach(p => {
            console.log(`ID: ${p.id.toString()} | Nome: ${p.name} | Tipos: ${p.tipos.join(', ')} | Altura: ${p.altura.toString()}m | Peso: ${p.peso.toString()}kg`);
        });
    }

    removerPokemon(id: number): void {
        if(!this.pokemons.some(p => p.id === id)) {
            console.log(`[AVISO] Pokémón com ID ${id.toString()} não encontrado no catálogo.`);
            return;
        }
        this.pokemons = this.pokemons.filter(p => p.id !== id);
        console.log(`[OK] Pokémón com ID ${id.toString()} removido do catálogo.`);
    }
}