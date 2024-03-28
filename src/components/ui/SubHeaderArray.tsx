import { Rootstate } from '@/state/store'
import { useSelector } from 'react-redux'

type SubHeaderArrayProps = {
  infoArray: string[]
  title: string
  entity: string
}

const SubHeaderArray = ({ infoArray, title, entity }: SubHeaderArrayProps) => {
  const translation = useSelector((state: Rootstate) => state.page.translation)

  return (
    <h3>
      {title} :{' '}
      {infoArray.map((type, index) => {
        return (
          <span key={index}>
            {translation[entity][type] ?? translation[entity][type]}
            {infoArray.length === index + 1 ? '' : ','}
          </span>
        )
      })}
    </h3>
  )
}

export default SubHeaderArray
