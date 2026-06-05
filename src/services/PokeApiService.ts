/* eslint-disable prettier/prettier */

import { PokemonApiResponse, PokemonResumo } from '../models/Pokemon';  

export class PokeApiService {
    
    private readonly baseUrl: string = 'https://pokeapi.co/api/v2/pokemon/';

    async buscarPokemon(nomeOuId: string): Promise<PokemonResumo | null> {

    try {
        const response = await fetch(`${this.baseUrl}${nomeOuId.toLowerCase()}`);
        if (!response.ok) {
            console.error(`[ERRO] Pokémon ${nomeOuId} não encontrado. Status: ${response.status.toString()}`);
            return null;
        }
        const dados: PokemonApiResponse = await response.json() as PokemonApiResponse;
        const pokemon: PokemonResumo = {
            id: dados.id,
            name: dados.name,
            tipos: dados.types.map((item) => item.type.name),
            altura: dados.height,
            peso: dados.weight
        };
            console.log(`[OK] Pokémon ${nomeOuId} encontrado:`, pokemon);
            return pokemon;

        } catch (error) {
            console.error(`[ERRO] Erro ao buscar Pokémon ${nomeOuId}:`, error);
            return null;
        }
    }
}