export type Pokemon = {
  id: number
  name: string
  korean_name: string
  img: string
  weight: number
  prev: string
  next: string | string[]
  moves_korean: string[]
  types_korean: string[]
  abilities_korean: string[]
}
