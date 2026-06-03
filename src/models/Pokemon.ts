/* eslint-disable prettier/prettier */
export interface PokemonResumo {
    id: number;
    name: string;
    tipos: string[];
    altura: number;
    peso: number;
}

export interface PokemonApiResponse {
    id: number;
    name: string;
    height: number;
    types: { type: { name: string } }[];
  weight: number;
}