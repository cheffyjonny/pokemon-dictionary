import { forwardRef, useCallback, useEffect, useRef } from 'react'

import { PokemonListItem } from '@/entities/PokemonListItem'

import ListItem from './pokemon/ListItem'

import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { fetchPokemons } from '@/api/pokemonList'
import { ListItems } from './pokemon/ListItems'

type PokemonListContainerProps = {
  pokemonListItems?: PokemonListItem[]
  query?: string
  loading?: boolean
  hasMore?: boolean
  pageNumber?: number
  increasePageNumber?: () => void
}
type ObserverType = IntersectionObserver | null
const PokemonListContainer = ({
  pokemonListItems,
  query,
  loading,
  hasMore,
  increasePageNumber,
}: PokemonListContainerProps) => {
  // const observer = useRef<ObserverType>()
  // const lastPokemonElementRef = useCallback(
  //   (node: HTMLDivElement) => {
  //     if (loading) return
  //     if (observer.current) observer.current?.disconnect()
  //     observer.current = new IntersectionObserver((entries) => {
  //       if (entries[0].isIntersecting && hasMore && !query) {
  //         increasePageNumber()
  //       }
  //     })
  //     if (node) observer.current.observe(node)
  //   },
  //   [loading, hasMore]
  // )

  //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  const {
    data: pokemonListAll,
    status,
    error,
    fetchNextPage: pokemonListAllFetchNextPage, //  다음 페이지를 불러오는 함수
    hasNextPage: pokemonListAllHasNextPage, // 다음 페이지가 있는지 여부, Boolean
  } = useInfiniteQuery({
    queryKey: ['pokemons'],

    queryFn: ({ pageParam = 0 }) => fetchPokemons({ pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, page) => {
      const { next }: any = lastPage
      if (!next) return undefined
      // console.log(new URL(next).searchParams.get('offset'))
      return Number(new URL(next).searchParams.get('offset'))
    },
  })
  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView) {
      pokemonListAllFetchNextPage()
    }
  }, [inView])
  console.log('data : ', pokemonListAll)
  console.log('status : ', status)
  console.log('error : ', error)

  // if (axios.isAxiosError(error)) {
  //   setErrorMsg(error?.response?.data)
  // }
  //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

  return (
    <div id='container-body'>
      <div id='pokemon-card-container'>
        {pokemonListAll?.pages.map((group, index) => (
          <ListItems
            key={index}
            listItems={group.results}
          />
        ))}
        <div ref={ref}></div>
      </div>
      {hasMore && pokemonListItems?.length !== 1 ? (
        <h5>더 많은 포켓몬을 보기 위하시면 아래로 스크롤을 하여주세요</h5>
      ) : (
        <></>
      )}
    </div>
  )
}
export default PokemonListContainer
