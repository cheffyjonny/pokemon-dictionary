import { PokemonListItem } from '@/entities/PokemonListItem'
import ListItem from './ListItem'
interface ListItems {
  listItems: PokemonListItem[]
}

export const ListItems = ({ listItems }: ListItems) => {
  return (
    <>
      {listItems.map((pokemon: PokemonListItem, index) => (
        <ListItem
          pokemon={pokemon}
          key={pokemon.url}
        />
      ))}
    </>
  )
}
