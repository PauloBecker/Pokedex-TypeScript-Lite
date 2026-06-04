/* eslint-disable prettier/prettier */

import { PokemonApiResponse, PokemonResumo } from '../models/Pokemon';  

export async function buscarPokemon(nomeOuId: string): Promise<PokemonResumo | null> {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nomeOuId.toLowerCase()}`);
        if (!response.ok) {
            console.error(`[ERRO] Pokémon ${nomeOuId} não encontrado. Status: ${response.status.toString()}`);
            return null;
        }
        const data = await response.json() as PokemonApiResponse;
        const pokemon: PokemonResumo = {
            id: data.id,
            name: data.name,
            tipos: data.types.map((t: { type: { name: string } }) => t.type.name),
            altura: data.height / 10,
            peso: data.weight / 10
        };
        console.log(`[OK] Pokémon ${nomeOuId} encontrado:`, pokemon);
        return pokemon;
    } catch (error) {
        console.error(`[ERRO] Erro ao buscar Pokémon ${nomeOuId}:`, error);
        return null;
    }
}
