import axios from 'axios'

const LIMIT = 20

export const fetchPokemons = async ({
  pageParam = 0,
  query,
}: {
  pageParam: number
  query: string | undefined
}) => {
  let apiUrl = `https://pokeapi.co/api/v2/pokemon/`
  if (!!query) apiUrl = `https://pokeapi.co/api/v2/pokemon/${query}`

  const responseAll = await axios.get(apiUrl, {
    params: { limit: LIMIT, offset: pageParam },
  })

  return responseAll.data
}
