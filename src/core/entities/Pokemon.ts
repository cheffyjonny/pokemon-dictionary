export type Pokemon = {
  name: string
  img: string
  prev: string | null
  next: string | string[] | undefined
  moves: { id: string; name: string }[]
  types: string[]
  abilities: string[]
}
