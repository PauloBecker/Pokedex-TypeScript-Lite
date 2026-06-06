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
- Node.js  
- TypeScript  
- TSX  
- PokeAPI  
- Git  
- GitHub  

## Pré-requisitos
Antes de executar o projeto, é necessário ter instalado:
- Node.js  
- npm  
- Git  

## Como instalar
Clone o repositório:
```bash
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

Estrutura do projeto
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
Funcionalidades
Buscar Pokémon por nome ou ID

Tratar erro de Pokémon inexistente

Transformar resposta da API em objeto simplificado

Adicionar Pokémon ao catálogo local

Impedir Pokémon duplicado

Listar catálogo

Remover Pokémon por ID

Exibir mensagens no terminal

Exemplos de execução
Busca válida
Entrada testada:

pikachu

Saída obtida:

[OK] Pokémon encontrado: pikachu
#25 - pikachu | Tipos: electric | Altura: 4 | Peso: 60

Busca inválida
Entrada testada:

pokemon-inexistente

Saída obtida:

[ERRO] Pokémon não encontrado.

Duplicidade
Entrada testada:

adicionar pikachu duas vezes

Saída obtida:

[AVISO] pikachu já está no catálogo.

Remoção
Entrada testada:

remover ID 25

Saída obtida:

[OK] Pokémon removido do catálogo.

Conceitos aplicados
TypeScript
Foram utilizados tipos, interfaces, parâmetros e retornos tipados para garantir segurança e clareza no código.

Interface PokemonResumo
Criada para representar os dados simplificados do Pokémon (id, nome, tipos, altura e peso).

Fetch e async/await
A aplicação consulta a PokeAPI usando fetch com async/await para lidar com chamadas assíncronas.

Tratamento de erros
O projeto lida com Pokémon inexistente ou falha de busca usando try/catch e verificações de retorno.

Métodos de array
Utilizados métodos como map, find, filter e some para manipular o catálogo de Pokémon.

Classe CatalogoPokemon
Contém atributos e métodos para adicionar, listar e remover Pokémon, além de impedir duplicidade.

Organização do Kanban
Link do Kanban:
https://trello.com/b/jl5Kh9z9/pojedc3a9x-typescript-lite

Branches utilizadas
main

develop

feat/pokedex

docs/readme

Melhorias futuras
```
Exibir HP, ataque e defesa

Criar filtros por tipo de Pokémon

Criar uma API própria com Express
```