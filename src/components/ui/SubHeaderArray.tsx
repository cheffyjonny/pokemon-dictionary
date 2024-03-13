type SubHeaderArrayProps = {
  infoArray: string[]
  title: string
}

const SubHeaderArray = ({ infoArray, title }: SubHeaderArrayProps) => {
  return (
    <h3>
      {title} :{' '}
      {infoArray.map((type, index) => {
        return (
          <span key={index}>
            {type}
            {infoArray.length === index + 1 ? '' : ','}
          </span>
        )
      })}
    </h3>
  )
}

export default SubHeaderArray
