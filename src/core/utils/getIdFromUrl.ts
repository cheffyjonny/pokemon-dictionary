const getIdFromUrl = (url: string) => {
  return parseInt(url.split('/').slice(-2)[0])
}
export default getIdFromUrl
