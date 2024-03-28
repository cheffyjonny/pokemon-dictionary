import axios from 'axios'

import { Pokemon } from '@/entities/Pokemon'
import { Move } from '@/entities/Move'
import { Ability } from '@/entities/Ability'
import { EvolutionChain } from '@/entities/EvolutionChain'
import { Type } from '@/entities/Type'
import getIdFromUrl from '@/utils/getIdFromUrl'

const getPokemonInfo = async (id: number) => {
  return await axios
    .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((res) => res.data)
}
const getPokemonSpecies = async (id: number) => {
  return await axios
    .get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
    .then((res) => res.data)
}
const getPokemonEvolutionChain = async (url: string) => {
  return await axios.get(url).then((res) => res.data.chain)
}
const getNextChain = async (
  pokemonName: string,
  evolutionChain: EvolutionChain
) => {
  switch (pokemonName) {
    //   The first stage on the evolution chain
    case evolutionChain.species.name:
      // SPECIAL CASE : Only eevee has multiple evolutions.
      if (evolutionChain.evolves_to.length > 1) {
        return evolutionChain.evolves_to.map((nextStage: any) => {
          return getIdFromUrl(nextStage.species.url)
        })
      } else if (evolutionChain.evolves_to.length === 0) {
        return
      } else {
        return getIdFromUrl(evolutionChain.evolves_to[0].species.url)
      }

    //   The second stage on the evolution chain
    case evolutionChain.evolves_to[0].species.name:
      return evolutionChain.evolves_to[0].evolves_to[0]
        ? getIdFromUrl(evolutionChain.evolves_to[0].evolves_to[0].species.url)
        : ''

    default:
      return
  }
}
const fetchData = async (id: number) => {
  const pokemonInfo = await getPokemonInfo(id)
  const species = await getPokemonSpecies(id)
  const evolutionChain = await getPokemonEvolutionChain(
    species.evolution_chain.url
  )
  console.log(evolutionChain)
  const pokemonName = pokemonInfo.name

  // // Set previous pokemon
  const prev = species.evolves_from_species?.url
    ? await getIdFromUrl(species.evolves_from_species.url)
    : null

  // // Set next pokemon
  const next = await getNextChain(pokemonName, evolutionChain)

  // Set image
  const img = pokemonInfo.sprites.other.dream_world.front_default
    ? pokemonInfo.sprites.other.dream_world.front_default
    : pokemonInfo.sprites.other['official-artwork'].front_default

  // Set move
  const moves = pokemonInfo.moves.map((move: Move) => {
    return { id: getIdFromUrl(move.move.url), name: move.move.name }
  })

  // Set types
  const types = pokemonInfo.types.map((type: Type) => {
    return getIdFromUrl(type.type.url)
  })

  // Set abilities
  const abilities = pokemonInfo.abilities.map((ability: Ability) => {
    return getIdFromUrl(ability.ability.url)
  })

  const result = {
    name: pokemonName,
    img,
    next,
    prev,
    moves,
    types,
    abilities,
  }

  return result as Pokemon
}

export default fetchData
