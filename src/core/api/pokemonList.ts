import { PokemonListItem } from 'core/entities/PokemonListItem'
import axios from 'axios'

const LIMIT = 20

export const fetchPokemons = async ({
  pageParam = 0,
}: {
  pageParam: number
}) => {
  const pokemonData: PokemonListItem[] = []

  const responseAll = await axios.get(`https://pokeapi.co/api/v2/pokemon/`, {
    params: { limit: LIMIT, offset: pageParam },
  })

  return responseAll.data

  //   try {
  //     const responseAll = await axios.get(
  //       `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`
  //     )

  //     return responseAll.data
  //   } catch (e) {
  //     if (axios.isAxiosError(e)) {
  //       console.error(e.response)
  //     }
  //   } finally {
  //   }
}
