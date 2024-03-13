# Structure

```
HomePage
└── Container
    ├── Input
    └── PokemonListContainer
        └── PokemonCard
```

- Container.tsx
  - Input : UI component( `placeholder`,`onChange`,`onBlur`)
  - PokemonListContainer : Pokemon List ITEMS Component(`pokemonListItems`, `query`,`loading`,`hasMore`,`pageNumber`,`increasePageNumber`)
    - PokemonCard : Pokemon List ITEM Component & Lightbox(`pokemonListItem`)

# Logic

## Container.tsx

- `usePokemonSearch` : Custom hook to fetch pokemon list items
- `pageNumber` : It has been set up with Redux. While it could function without Redux, integrating it with Redux ensures efficiency as the application expands. For instance, it allows for the retention of page information across different pages.

### PokemonListContainer.tsx

- `lastPokemonElementRef`: This is where the infinite scrolling occurs.

### PokemonCard.tsx

- `fetchPokemonDetails`: It fetches details of the Pokémon. By calling the API to fetch a single item's data upon clicking the card, this approach proves more efficient than fetching all the data for the entire list.

  <br>
  <br>
  <br>

# Set up instruction

To install the package and run the project: `npm install && npm run dev` <br>

# Extra Information

- Initially, I aimed to implement this code to minimize excessive API calls. However, as the project progressed, I realized that this additional code wouldn't be necessary for such a small project.

```js
useEffect(() => {
  let cancel: CancelTokenSource

  const fetchData = async () => {
    try {
      cancel = axios.CancelToken.source()
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${query}`,
        {
          cancelToken: cancel.token,
        }
      )
      setPokemons([response.data])
    } catch (e) {
      if (axios.isCancel(e)) {
        console.log('Request canceled:', e.message)
      } else {
        setError(true)
        console.error(e)
      }
    }
  }

  fetchData()

  return () => {
    if (cancel) {
      cancel.cancel('Request canceled by cleanup')
    }
  }
}, [query, pageNumber])
```
