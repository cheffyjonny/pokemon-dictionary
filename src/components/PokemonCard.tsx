import { forwardRef, useState } from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'

import { Pokemon } from '@/utils/fetchPokemonDetails'
import { PokemonListItem } from '@/hooks/usePokemonSearch'
import fetchPokemonDetails from '@/utils/fetchPokemonDetails'
import SubHeaderArray from './ui/SubHeaderArray'
import ParagraphArray from './ui/ParagraphArray'
import CustomTable from './ui/CustomTable'

type CardProps = {
  pokemonListItem: PokemonListItem
}

const PokemonCard = forwardRef<HTMLDivElement, CardProps>(
  ({ pokemonListItem }, ref) => {
    const [pokemonDetails, setPokemonDetails] = useState<Pokemon>({
      id: 0,
      korean_name: '',
      img: '',
      weight: 0,
      prev: '',
      next: '',
      moves_korean: [],
      types_korean: [],
      abilities_korean: [],
    })
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleClick = async () => {
      setOpen(true)
      setLoading(true)
      const response = await fetchPokemonDetails(pokemonListItem.id)
      setPokemonDetails(response)
      setLoading(false)
    }
    const handleClose = () => setOpen(false)

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
    return (
      <>
        <div
          ref={ref}
          id='pokemon-card'
          onClick={handleClick}
        >
          <p>
            No.{pokemonListItem.id} {pokemonListItem.korean_name}
          </p>
        </div>
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
                <h2>이름 : {pokemonDetails.korean_name}</h2>
                <SubHeaderArray
                  infoArray={pokemonDetails.types_korean}
                  title={'속성'}
                />
                <SubHeaderArray
                  infoArray={pokemonDetails.abilities_korean}
                  title={'특성'}
                />
                <ParagraphArray
                  infoArray={pokemonDetails.moves_korean}
                  title={'기술'}
                />
                <img
                  width={400}
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
)

export default PokemonCard
