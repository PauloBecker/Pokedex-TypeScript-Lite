/* eslint-disable prettier/prettier */
import * as fs from 'fs';

import { PokemonResumo } from './Pokemon';

export class CatalogoPokemon {
  private pokemons: PokemonResumo[] = [];

  private arquivo = "catalogo.json";

  private limite = 100;

  carregar() {
    try {
      if (fs.existsSync(this.arquivo)) {
        const dados: string = fs.readFileSync(this.arquivo, "utf-8");
        const lista: unknown = JSON.parse(dados);

        // valida integridade dos dados
        if (Array.isArray(lista)) {
          this.pokemons = lista.filter((p: unknown): p is PokemonResumo => {
            if (p === null || typeof p !== "object") {
              return false;
            }
            const item = p as Record<string, unknown>;
            return (
              "id" in item &&
              typeof item.id === "number" &&
              "nome" in item &&
              typeof item.nome === "string" &&
              "tipos" in item &&
              Array.isArray(item.tipos) &&
              "altura" in item &&
              typeof item.altura === "number" &&
              "peso" in item &&
              typeof item.peso === "number"
            );
          });
        } else {
          console.log("[ERRO] Arquivo de catálogo corrompido. Iniciando vazio.");
          this.pokemons = [];
        }
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      console.log("[ERRO] Falha ao carregar catálogo:", msg);
      this.pokemons = [];
    }
  }

  salvar() {
    try {
      fs.writeFileSync(this.arquivo, JSON.stringify(this.pokemons, null, 2));
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.log("[ERRO] Falha ao salvar catálogo:", msg);
    }
  }
  
    adicionarPokemon(pokemon: PokemonResumo) {
    if (isNaN(pokemon.id) || !pokemon.name || !Array.isArray(pokemon.tipos) || isNaN(pokemon.altura) || isNaN(pokemon.peso)) {
      console.log("[ERRO] Pokémon inválido.");
      return;
    }

    if (this.pokemons.some(p => p.id === pokemon.id)) {
      console.log(`[AVISO] ${pokemon.name} já está no catálogo.`);
      return;
    }

    if (this.pokemons.length >= this.limite) {
      console.log("[ERRO] Limite máximo de pokémons atingido.");
      return;
    }

    if (pokemon.altura <= 0 || pokemon.peso <= 0) {
      console.log("[ERRO] Dados inconsistentes: altura/peso inválidos.");
      return;
    }

    this.pokemons.push(pokemon);
    console.log(`[SUCESSO] ${pokemon.name} adicionado ao catálogo.`);
    this.salvar();
  }

    listarPokemons(){
    if (this.pokemons.length === 0) {
      console.log("[AVISO] Catálogo vazio.");
      return;
    }

    console.log("=== Catálogo de Pokémons ===");
    this.pokemons.forEach(p =>
      { console.log(`#${String(p.id)} - ${p.name} | Tipos: ${p.tipos.join(", ")} | Altura: ${String(p.altura)} | Peso: ${String(p.peso)}`); }
    );
  }

    removerPokemon(id: number) {
    if (isNaN(id)) {
      console.log("[ERRO] ID inválido. Digite apenas números.");
      return;
    }

    const index = this.pokemons.findIndex(p => p.id === id);
    if (index === -1) {
      console.log("[ERRO] Pokémon não encontrado no catálogo.");
      return;
    }

    const removido = this.pokemons.splice(index, 1)[0];
    console.log(`[SUCESSO] ${removido.name} removido do catálogo.`);
    this.salvar();
  }
}