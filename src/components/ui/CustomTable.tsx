import { Rootstate } from '@/state/store'
import { Fragment } from 'react'
import { useSelector } from 'react-redux'

type CustomTableProps = {
  prev: string | undefined | null
  next: string | string[] | undefined
}

const CustomTable = ({ prev, next }: CustomTableProps) => {
  const translation = useSelector(
    (state: Rootstate) => state.page.translation.names
  )

  return (
    <div>
      <h3>진화정보</h3>
      <table>
        <thead>
          <tr>
            <th>이전 단계</th>
            <th>이후 단계</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <h4>{prev ? translation[prev] : <p>정보 없음</p>}</h4>
            </td>
            <td>
              <h4>
                {next ? (
                  Array.isArray(next) ? (
                    next.map((stage: string, index: number) => (
                      <Fragment key={index}>
                        {translation[stage]}
                        {next.length == index + 1 ? '' : ', '}
                      </Fragment>
                    ))
                  ) : (
                    <>{translation[next]}</>
                  )
                ) : (
                  <p>정보 없음</p>
                )}
              </h4>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default CustomTable
