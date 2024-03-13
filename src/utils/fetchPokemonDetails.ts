import axios from 'axios'
import getKoreanName, { Name } from './getKoreanName'

export type Pokemon = {
  id: number
  korean_name: string
  img: string
  weight: number
  prev: string
  next: string | string[]
  moves_korean: string[]
  types_korean: string[]
  abilities_korean: string[]
}
type Move = {
  move: {
    name: string
    url: string
  }
}
type PokemonType = {
  type: {
    name: string
    url: string
  }
}
type Ability = {
  ability: {
    name: string
    url: string
  }
}
export type Pokemons = Pokemon[]

const getIdAndName = async (prevUrl: string) => {
  const { id, name } = await getKoreanName(prevUrl)
  return `No.${id} ${name}`
}

const fetchData = async (id: number) => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)

  const speciesResponse = await axios.get(
    `https://pokeapi.co/api/v2/pokemon-species/${id}`
  )

  const koreanName = speciesResponse.data.names.find(
    (name: Name) => name.language.name === 'ko'
  )

  const engName = response.data.name
  const evolutionChainUrl = speciesResponse.data.evolution_chain.url
  const evolutionChainResponse = await axios.get(`${evolutionChainUrl}`)

  // Set previous pokemon with the Korean name
  let prev
  const prevUrl = speciesResponse.data.evolves_from_species
    ? speciesResponse.data.evolves_from_species.url
    : null

  if (prevUrl) {
    prev = await getIdAndName(prevUrl)
  }

  // Set next pokemon with the Korean name
  let next
  //   The first stage on the evolution chain
  if (evolutionChainResponse.data.chain.species.name === engName) {
    // SPECIAL CASE : Only eevee has multiple evolutions.
    if (evolutionChainResponse.data.chain.evolves_to.length > 1) {
      const eevee_evolutions_promises =
        evolutionChainResponse.data.chain.evolves_to.map(
          async (nextStage: any) => {
            return getIdAndName(nextStage.species.url)
          }
        )
      const eevee_evolutions = await Promise.all(eevee_evolutions_promises)
      next = eevee_evolutions
    } else {
      const url = evolutionChainResponse.data.chain.evolves_to[0]?.species.url
      if (url) {
        next = await getIdAndName(url)
      }
    }
  }
  //   The second stage on the evolution chain && check if there is the third stage.
  else if (
    evolutionChainResponse.data.chain.evolves_to[0].species.name == engName
  ) {
    const url =
      evolutionChainResponse.data.chain.evolves_to[0].evolves_to[0]?.species.url

    if (url) {
      next = await getIdAndName(url)
    }
  }

  const img = response.data.sprites.other.dream_world.front_default
    ? response.data.sprites.other.dream_world.front_default
    : response.data.sprites.other['official-artwork'].front_default

  // 기술
  const moves_korean_promises = response.data.moves.map(async (move: Move) => {
    const { name } = await getKoreanName(move.move.url)
    return name ? name : move.move.name
  })
  const moves_korean = await Promise.all(moves_korean_promises)

  // 속성
  const type_korean_promises = response.data.types.map(
    async (type: PokemonType) => {
      const { name } = await getKoreanName(type.type.url)
      return name ? name : type.type.name
    }
  )
  const types_korean = await Promise.all(type_korean_promises)

  // 특성
  const abilities_korean_promises = response.data.abilities.map(
    async (ability: Ability) => {
      const { name } = await getKoreanName(ability.ability.url)
      return name ? name : ability.ability.name
    }
  )
  const abilities_korean = await Promise.all(abilities_korean_promises)

  const result = {
    ...response.data,
    korean_name: koreanName.name,
    img,
    next,
    prev,
    moves_korean,
    types_korean,
    abilities_korean,
  }

  return result as Pokemon
}

export default fetchData
