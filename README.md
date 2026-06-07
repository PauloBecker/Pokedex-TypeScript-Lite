# Pokédex TypeScript Lite

## Sobre o projeto
O **Pokédex TypeScript Lite** é uma aplicação simples em Node.js com TypeScript que consulta dados de Pokémon na [PokeAPI](https://pokeapi.co/) e organiza alguns resultados em um catálogo local durante a execução do programa.

## Objetivo
Praticar os principais conceitos do Módulo 01:
- Node.js
- JavaScript no back-end
- TypeScript
- Interfaces
- Funções tipadas
- Arrays
- Objetos
- JSON
- Métodos de array
- Classes
- Async/Await
- Fetch
- Tratamento de erros
- GitHub
- GitFlow
- Kanban

## Tecnologias utilizadas

* [Node.js](https://nodejs.org) – Runtime JavaScript
* [Express](https://expressjs.com) – Framework Web
* [TypeScript](https://www.typescriptlang.org) – Linguagem tipada
* [Nodemon](https://nodemon.io) – Ambiente de desenvolvimento com hot reload
* [TSX](https://github.com/esbuild-kit/tsx) – Executor de TypeScript sem build manual
* [PokeAPI](https://pokeapi.co) – API pública de dados de Pokémon
* [Git](https://git-scm.com) – Controle de versão
* [GitHub](https://github.com) – Hospedagem de repositórios
* **JSON** – Utilizado como banco de dados local 

## Pré-requisitos
Antes de executar o projeto, é necessário ter instalado:
- Node.js  
- npm  
- Git  

## Como instalar
Clone o repositório:
```
git clone https://github.com/PauloBecker/Pokedex-TypeScript-Lite

Acesse a pasta do projeto:

cd pokedex-typescript-lite

Instale as dependências:

npm install

Como executar
Execute o projeto em ambiente de desenvolvimento:

npm run dev

Ou compile e rode:

npm run build
npm run start
```
## Estrutura do projeto
```
pokedex-typescript-lite/
│
├── src/
│   ├── controllers/
│   │   └── TerminalController.ts
│   ├── models/
│   │   └── CatalogoPokemon.ts
│   ├── services/
│   │   └── PokeApiService.ts
│   └── main.ts
│
├── package.json
├── tsconfig.json
└── README.md
```
## Funcionalidades

* Buscar Pokémon por nome ou ID

* Tratar erro de Pokémon inexistente

* Transformar resposta da API em objeto simplificado

* Adicionar Pokémon ao catálogo local

* Impedir Pokémon duplicado

* Listar catálogo

* Remover Pokémon por ID

* Exibir mensagens no terminal

## Exemplos de execução
Busca válida
Entrada testada:
```
pikachu
```
Saída obtida:
```
[OK] Pokémon encontrado: pikachu
#25 - pikachu | Tipos: electric | Altura: 4 | Peso: 60
```
### Busca inválida
Entrada testada:
```
pokemon-inexistente
```
Saída obtida:
```
[ERRO] Pokémon não encontrado.
```
### Duplicidade
Entrada testada:
```
adicionar pikachu duas vezes
```
Saída obtida:
```
[AVISO] pikachu já está no catálogo.
```
### Remoção
Entrada testada:
```
remover ID 25
```
Saída obtida:
```
[OK] Pokémon removido do catálogo.
```
## Conceitos aplicados
### TypeScript
Foram utilizados tipos, interfaces, parâmetros e retornos tipados para garantir segurança e clareza no código.
O projeto utiliza tipagem explícita em funções, parâmetros e retornos para garantir segurança e clareza.
Exemplo:
```
ts
private async tratarOpcao(opcao: string): Promise<void> {
  // ...
}
```
Aqui, opcao é tipado como string e o retorno da função é Promise<void>.

### Interface - PokemonResumo
Criada para representar os dados simplificados do Pokémon (id, nome, tipos, altura e peso).
Exemplo:
```
ts
export interface PokemonResumo {
  id: number;
  name: string;
  tipos: string[];
  altura: number;
  peso: number;
}
```
Isso garante consistência ao manipular os dados no catálogo.

### Fetch e async/await
A consulta à PokeAPI é feita de forma assíncrona usando fetch e async/await.
Criada para representar os dados simplificados do Pokémon, evitando trabalhar com a resposta completa da API.
Exemplo:
```
ts
const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${entrada}`);
const dados = await resposta.json();

```
Assim, o código fica mais legível e fácil de manter.

### Tratamento de erros
O projeto lida com Pokémon inexistente ou falha de busca usando try/catch e verificações de retorno.

### Métodos de array
Utilizados métodos como map, find, filter e some para manipular o catálogo de Pokémon.
O projeto lida com Pokémon inexistente ou falha de busca usando try/catch e verificações.
Exemplo:
```
ts
try {
  const pokemon = await this.pokeApiService.buscarPokemon(entrada);
  if (!pokemon) {
    console.log("[ERRO] Pokémon não encontrado.");
  }
} catch (err: unknown) {
  if (err instanceof Error) {
    console.error("Erro ao buscar Pokémon:", err.message);
  }
}
```
### Métodos de array
Foram usados métodos como find, filter e some para manipular o catálogo.
Exemplo:
```
ts
const duplicado = this.catalogo.find(p => p.id === pokemon.id);
if (duplicado) {
  console.log(`[AVISO] ${pokemon.name} já está no catálogo.`);
}
```

### Classe - CatalogoPokemon
Contém atributos e métodos para adicionar, listar e remover Pokémon, além de impedir duplicidade.
Centraliza a lógica de adicionar, listar e remover Pokémon.
Exemplo:
```
ts
export class CatalogoPokemon {
  private pokemons: PokemonResumo[] = [];

  adicionarPokemon(pokemon: PokemonResumo) { /* ... */ }
  listarPokemons() { /* ... */ }
  removerPokemon(id: number) { /* ... */ }
}
```
Isso organiza o código e facilita futuras expansões.

### Classe de Menu (TerminalController)
A classe TerminalController organiza toda a interação com o usuário via terminal, exibindo o menu, capturando entradas e chamando os métodos corretos.
Exemplo:
```
ts
private mostrarMenu() {
  console.log("\nEscolha uma opção:");
  console.log("1 - Buscar Pokémon");
  console.log("2 - Adicionar Pokémon");
  console.log("3 - Listar catálogo");
  console.log("4 - Remover Pokémon");
  console.log("0 - Sair");
  this.rl.setPrompt("Opção: ");
  this.rl.prompt();
}
```
Isso demonstra o uso de classes para separar responsabilidades: a lógica de negócio fica no catálogo e a lógica de interface no controlador.

### Persistência em JSON
Foi implementada a funcionalidade de salvar o catálogo em arquivo JSON, garantindo que os dados não se percam ao encerrar o programa.
Exemplo:
```
ts
import * as fs from "fs";

salvarCatalogo() {
  fs.writeFileSync("catalogo.json", JSON.stringify(this.pokemons, null, 2));
  console.log("[OK] Catálogo salvo em catalogo.json");
}
```
Esse método grava o estado atual do catálogo em disco, permitindo reutilização futura.

### Organização do Kanban
Link do Kanban:
https://trello.com/b/jl5Kh9z9/pojedc3a9x-typescript-lite

### Branches utilizadas
* main

* develop

* feat/pokedex

* docs/readme

## Melhorias futuras
```
Exibir HP, ataque e defesa

Criar filtros por tipo de Pokémon

Criar uma API própria com Express
```