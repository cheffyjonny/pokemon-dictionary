import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, Rootstate } from '@/state/store'
import { increment } from '@/state/page/pageSlice'

import '@/styles/container.scss'

import Input from './ui/Input'
import PokemonListContainer from '@/components/PokemonListContainer'
import usePokemonSearch from '@/hooks/usePokemonSearch'

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>

const Container = () => {
  const pageNumber = useSelector((state: Rootstate) => state.page.value)
  const dispatch = useDispatch<AppDispatch>()
  const [query, setQuery] = useState('')

  const handleSearch = (e: InputChangeEvent) => {
    setQuery(e.target.value)
  }

  const { pokemonListItems, hasMore, loading, error } = usePokemonSearch(
    query,
    pageNumber
  )

  return (
    <div id='container'>
      <div id='container-search'>
        <Input
          placeholder='포켓몬 이름 혹은 번호를 검색해보세요.'
          onChange={handleSearch}
        />
      </div>

      <div id='notification'>
        {loading && <p>Loading...</p>}
        {error && <div>{error}</div>}
      </div>

      {pokemonListItems.length > 0 && (
        <PokemonListContainer
          pokemonListItems={pokemonListItems}
          query={query}
          loading={loading}
          hasMore={hasMore}
          pageNumber={pageNumber}
          increasePageNumber={() => {
            dispatch(increment())
          }}
        />
      )}
    </div>
  )
}

export default Container
