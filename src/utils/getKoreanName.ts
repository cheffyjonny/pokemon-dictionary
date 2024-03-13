import axios from 'axios'

export type Name = {
  name: string
  language: {
    name: string
    url: string
  }
}

const getKoreanName = async (url: string) => {
  const response = await axios.get(`${url}`)

  const name = response.data.names.find(
    (name: Name) => name.language.name === 'ko'
  )?.name
  // Occasionally, the search result may not include a Korean name for the item.
  // e.g. https://pokeapi.co/api/v2/move/885/, https://pokeapi.co/api/v2/move/851/
  return { name: name, id: response.data.id }
}
export default getKoreanName
