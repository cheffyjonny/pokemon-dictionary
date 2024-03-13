import { useCallback, useRef } from 'react'
import type { PokemonListItems } from '@/hooks/usePokemonSearch'

import PokemonCard from './PokemonCard'

type PokemonListContainerProps = {
  pokemonListItems: PokemonListItems
  query: string
  loading: boolean
  hasMore: boolean
  pageNumber: number
  increasePageNumber: () => void
}
type ObserverType = IntersectionObserver | null
const PokemonListContainer = ({
  pokemonListItems,
  query,
  loading,
  hasMore,
  increasePageNumber,
}: PokemonListContainerProps) => {
  const observer = useRef<ObserverType>()
  const lastPokemonElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return
      if (observer.current) observer.current?.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !query) {
          increasePageNumber()
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading, hasMore]
  )

  return (
    <div id='container-body'>
      <div id='pokemon-card-container'>
        {pokemonListItems.map((pokemonListItem, index) => {
          if (pokemonListItems.length === index + 1) {
            return (
              <PokemonCard
                ref={lastPokemonElementRef}
                key={index}
                pokemonListItem={pokemonListItem}
              />
            )
          } else {
            return (
              <PokemonCard
                key={index}
                pokemonListItem={pokemonListItem}
              />
            )
          }
        })}
      </div>
      {hasMore && pokemonListItems.length !== 1 ? (
        <h5>더 많은 포켓몬을 보기 위하시면 아래로 스크롤을 하여주세요</h5>
      ) : (
        <></>
      )}
    </div>
  )
}

export default PokemonListContainer
