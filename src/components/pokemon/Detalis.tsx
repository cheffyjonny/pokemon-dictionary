import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Rootstate } from '@/state/store'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'

import { Pokemon } from '@/entities/Pokemon'
import type { PokemonDetails } from '@/entities/PokemonDetails'
import fetchPokemonDetails from '@/api/getPokemonDetails'
import SubHeaderArray from '../ui/SubHeaderArray'
import ParagraphArray from '../ui/ParagraphArray'
import CustomTable from '../ui/CustomTable'

const PokemonDetails = ({ id, open, handleClose }: PokemonDetails) => {
  const translation = useSelector(
    (state: Rootstate) => state.page.translation.names
  )
  const koreanName = translation[id]
  const [pokemonDetails, setPokemonDetails] = useState<Pokemon>({
    name: '',
    img: '',
    prev: '',
    next: '',
    moves: [],
    types: [],
    abilities: [],
  })
  const [loading, setLoading] = useState(false)
  const style = {
    textAlign: 'center',
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 800,
    overflow: 'scroll',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }

  const fetchPokemon = async () => {
    setLoading(true)
    const response = await fetchPokemonDetails(id)
    if (response) setPokemonDetails(response)
    setLoading(false)
  }
  useEffect(() => {
    fetchPokemon()
  }, [])

  return (
    <>
      <Modal
        id='pokemon-details-modal'
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            <>
              <h2>이름 : {koreanName}</h2>
              <SubHeaderArray
                infoArray={pokemonDetails.types}
                title={'속성'}
                entity='types'
              />
              <SubHeaderArray
                infoArray={pokemonDetails.abilities}
                title={'특성'}
                entity='abilities'
              />
              <ParagraphArray
                infoArray={pokemonDetails.moves}
                title={'기술'}
              />
              <img
                width={200}
                src={pokemonDetails.img}
                alt=''
              />
              <CustomTable
                prev={pokemonDetails.prev}
                next={pokemonDetails.next}
              />
            </>
          )}
        </Box>
      </Modal>
    </>
  )
}

export default PokemonDetails
