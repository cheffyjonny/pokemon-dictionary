import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Rootstate } from '@/state/store'

import { PokemonListItem } from '@/entities/PokemonListItem'
import PokemonDetails from './Detalis'

type ListItemProps = {
  pokemon: PokemonListItem
}

const ListItem = ({ pokemon }: ListItemProps) => {
  const translation = useSelector(
    (state: Rootstate) => state.page.translation.names
  )
  const pokemonId = pokemon.url
    ? parseInt(pokemon.url.split('/').slice(-2)[0])
    : pokemon.id
  const koreanName = translation[pokemonId]
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(true)
  }
  const handleClose = () => setOpen(false)

  return (
    <>
      <div
        id='pokemon-card'
        onClick={handleClick}
      >
        <p>
          No.{pokemonId} {koreanName}
        </p>
      </div>
      {open ? (
        <PokemonDetails
          id={pokemonId}
          open={open}
          handleClose={handleClose}
        />
      ) : (
        <></>
      )}
    </>
  )
}

export default ListItem
