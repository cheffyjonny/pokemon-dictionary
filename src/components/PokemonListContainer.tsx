import { useEffect } from 'react'

import { PokemonListItem } from '@/entities/PokemonListItem'

import ListItem from './pokemon/ListItem'

import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { fetchPokemons } from '@/api/getPokemonList'
import { ListItems } from './pokemon/ListItems'

type PokemonListContainerProps = {
  pokemonListItems?: PokemonListItem[]
  query?: string
}

const PokemonListContainer = ({
  pokemonListItems,
  query,
}: PokemonListContainerProps) => {
  const {
    data: pokemonListAll,
    error,
    fetchNextPage: pokemonListAllFetchNextPage,
    hasNextPage: pokemonListAllHasNextPage,
    status: pokemonListAllStatus,
  } = useInfiniteQuery({
    queryKey: ['pokemons', query],
    queryFn: ({ pageParam = 0 }) => fetchPokemons({ pageParam, query }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { next }: any = lastPage
      if (!next) return undefined
      return Number(new URL(next).searchParams.get('offset'))
    },
  })
  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView && pokemonListAllHasNextPage) pokemonListAllFetchNextPage()
  }, [inView])

  return (
    <div id='container-body'>
      <div id='pokemon-card-container'>
        {pokemonListAllStatus === 'pending' && (
          <div id='notification'>Loading...</div>
        )}
        {pokemonListAllStatus === 'error' && (
          <div id='notification'>{error.message}</div>
        )}
        {pokemonListAllStatus === 'success' && query ? (
          <ListItem
            pokemon={pokemonListAll?.pages[0]}
            key={pokemonListAll?.pages[0].id}
          />
        ) : (
          pokemonListAll?.pages.map((group, index) => (
            <ListItems
              key={index}
              listItems={group.results}
            />
          ))
        )}

        <div ref={ref}></div>
      </div>
      {pokemonListAllHasNextPage && pokemonListItems?.length !== 1 ? (
        <h5>더 많은 포켓몬을 보기 위하시면 아래로 스크롤을 하여주세요</h5>
      ) : (
        <></>
      )}
    </div>
  )
}
export default PokemonListContainer
