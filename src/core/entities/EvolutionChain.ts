export type EvolutionChain = {
  species: {
    name: string
    url: string
  }
  evolves_to: EvolutionChain[]
}
