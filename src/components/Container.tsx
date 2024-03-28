import { useState } from 'react'

import '@/styles/container.scss'

import Input from './ui/Input'
import PokemonListContainer from '@/components/PokemonListContainer'

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>

const Container = () => {
  const [query, setQuery] = useState('')

  const handleSearch = (e: InputChangeEvent) => {
    setQuery(e.target.value)
  }

  return (
    <div id='container'>
      <div id='container-search'>
        <Input
          placeholder='포켓몬 이름 혹은 번호를 검색해보세요.'
          onChange={handleSearch}
        />
      </div>

      <PokemonListContainer query={query} />
    </div>
  )
}

export default Container
