import { forwardRef } from 'react'
import '@/styles/container.scss'

export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>
export type InputProps = {
  placeholder?: string
  onChange?: (e: InputChangeEvent) => void
  onBlur?: (e: InputChangeEvent) => void
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, onBlur, onChange }, ref) => {
    return (
      <input
        id='search-input'
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        type='number'
        placeholder={placeholder}
      />
    )
  }
)

export default Input
