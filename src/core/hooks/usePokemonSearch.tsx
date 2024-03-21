import axios from 'axios'
import { useEffect, useState } from 'react'

import { Name } from '@/utils/getKoreanName'
import type { Pokemon } from '@/utils/fetchPokemonDetails'

export type PokemonListItem = Pick<Pokemon, 'id' | 'korean_name'>
export type PokemonListItems = PokemonListItem[]

export default function usePokemonSearch(
  query: number | string,
  pageNumber: number
) {
  const generateAmount = 20
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pokemonListItems, setPokemonListItems] = useState<PokemonListItem[]>(
    []
  )
  const [hasMore, setHasMore] = useState(true)

  const fetchListItem = async (query: number | string) => {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${query}`
    )

    const speciesResponse = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${query}`
    )

    const koreanName = speciesResponse.data.names.find(
      (name: Name) => name.language.name === 'ko'
    )

    const result = {
      ...response.data,
      korean_name: koreanName.name,
    }

    return result as PokemonListItem
  }

  useEffect(() => {
    setPokemonListItems([])
  }, [query])

  useEffect(() => {
    setLoading(true)
    setError(null)

    const fetchData = async () => {
      const pokemonData: PokemonListItem[] = []
      // If the length is smaller than default, which means it was searching previously.
      const backToList = pokemonListItems.length < 20

      try {
        if (!!query) {
          // fetch single result
          setPokemonListItems([await fetchListItem(query)])
        } else {
          // fetch all (Infinite scroll)
          const previousPage = pageNumber - 1
          const startPoint = backToList ? 1 : previousPage * generateAmount + 1 // The dictionary numbering begins at 1, so subsequent items should be incremented by 1.
          const endPoint = pageNumber * generateAmount

          const responseAll = await axios.get(
            `https://pokeapi.co/api/v2/pokemon`
          )
          setHasMore(startPoint < responseAll.data.count)

          if (hasMore) {
            const response = await axios.get(
              `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`
            )

            for (let i = startPoint; i <= endPoint; i++) {
              pokemonData.push(await fetchListItem(i))
            }
            backToList
              ? setPokemonListItems([...pokemonData])
              : setPokemonListItems([...pokemonListItems, ...pokemonData])
          }
        }
      } catch (e) {
        if (axios.isAxiosError(e)) {
          console.error(e.response)
          setError(e.response?.data)
        }
        // John's note : It could be implemented with 'axios cancel token' for spam calling api while the user's typing query.
        //               I wouldn't think it's necessary for this project.
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [query, pageNumber])

  return { loading, pokemonListItems, error, hasMore }
}
