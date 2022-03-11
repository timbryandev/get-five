import { useState } from 'react'

export interface IRadioGroupProps {
  defaultValue?: string | number
  name: string
  onChange: ({ label, value }: { label: string; value: any }) => void
  options: [label: string, value: any][]
}

const RadioGroup = ({
  defaultValue,
  name,
  onChange,
  options
}: IRadioGroupProps): JSX.Element => {
  const [state, setState] = useState<any>(defaultValue)

  const handleOnChange = (label: string, value: any) => {
    setState(value)
    onChange({ label, value })
  }

  return (
    <ul>
      {options.map(([label, value]) => (
        <li key={label}>
          <input
            type='radio'
            name={name}
            id={label}
            checked={value === state}
            onChange={evt => handleOnChange(label, value)}
          />{' '}
          <label htmlFor={label}>{label}</label>
        </li>
      ))}
    </ul>
  )
}

export default RadioGroup
