import { Rootstate } from '@/state/store'
import { useSelector } from 'react-redux'

type ParagraphArrayProps = {
  infoArray: { id: string; name: string }[]
  title: string
}

const ParagraphArray = ({ infoArray, title }: ParagraphArrayProps) => {
  const translation = useSelector(
    (state: Rootstate) => state.page.translation.moves
  )

  return (
    <div>
      <h3>{title} : </h3>
      <p>
        {infoArray.map((move, index) => {
          return (
            <span key={index}>
              {translation[move.id] ? translation[move.id] : move.name}
              {infoArray.length === index + 1 ? '' : ','}
            </span>
          )
        })}
      </p>
    </div>
  )
}

export default ParagraphArray
