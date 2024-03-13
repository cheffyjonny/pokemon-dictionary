type ParagraphArrayProps = {
  infoArray: string[]
  title: string
}

const ParagraphArray = ({ infoArray, title }: ParagraphArrayProps) => {
  return (
    <div>
      <h3>{title} : </h3>
      <p>
        {infoArray.map((type, index) => {
          return (
            <span key={index}>
              {type}
              {infoArray.length === index + 1 ? '' : ','}
            </span>
          )
        })}
      </p>
    </div>
  )
}

export default ParagraphArray
