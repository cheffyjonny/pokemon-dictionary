# Introduction

Welcome to Retro Pokemon Dictionary. This is a pokemon infinite scroll list with the search.
It uses open APIs from https://pokeapi.co/. It has a translation script for Korean. It has been implemented with the script to speed up the process.

# Structure

```
HomePage
└── Container
    ├── Input
    └── PokemonListContainer
        └── ListItems
            └── PokemonDetails
                └── Modal
```

- Container.tsx
  - Input : UI component( `placeholder`, `onChange`, `onBlur`)
  - PokemonListContainer : Pokemon List ITEMS Component(`pokemonListItems`, `query`, `loading`, `hasMore`, `pageNumber`, `increasePageNumber`)
    - ListItems : Pokemon List ITEM Component & Lightbox(`pokemon`)
      - PokemonDetails : Details info(`id`, `open`, `handleClose`)

# Logic

## PokemonListContainer.tsx

- `useInfiniteQuery`: To implement infinite scroll

## ListItem.tsx

- `translation`: To speed up the process, it has implemented translation script with Redux.

## Details.tsx

- `fetchProducts`: It fetches details of the pokemon.

  <br>
  <br>
  <br>

# Set up instruction

To install the package and run the project: `npm install && npm run dev` <br>
