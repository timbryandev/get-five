import { useEffect, useRef, useState } from 'react'
import Keyboard from './keyboard/keyboard'
import cleanse from '../utils/cleansGuessString'
import doesDeviceSupportTouchInput from '../utils/doesDeviceSupportTouchInput'

export interface FormProps {
  guesses: string[]
  setGuesses: (guesses: string[]) => void
}

const Form: React.FC<FormProps> = ({ guesses, setGuesses }: FormProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [guess, setGuess] = useState<string>('')

  const getInputValue = (): string => inputRef.current?.value ?? ''

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement> | null
  ): void => {
    event?.preventDefault()

    if (guess.length !== 5) {
      return
    }

    setGuesses([...guesses, guess])
    setGuess('')
  }

  const onGuessChange = (letter: string): void => {
    setGuess(cleanse(letter))
  }

  useEffect(() => {
    // disable virtual keyboard on touchscreen devices - only use ours on mobile
    if (doesDeviceSupportTouchInput()) {
      inputRef.current?.setAttribute('readonly', 'true')
    }
  }, [])

  return (
    <form
      className='w-full text-center ml-auto mr-auto '
      onSubmit={handleSubmit}
    >
      <input
        ref={inputRef}
        className='text-center border-2 border-gray-400 p-2 m-2 text-3xl rounded'
        type='text'
        onChange={evt => onGuessChange(evt.target.value)}
        onKeyUp={evt => {
          evt.key === 'Enter' && handleSubmit(null)
        }}
        maxLength={5}
        value={guess}
        placeholder='Enter your guess'
        required
      />

      <Keyboard
        onDeleteKey={() => onGuessChange(getInputValue().slice(0, -1))}
        onEnterKey={() => handleSubmit(null)}
        onKey={letter => onGuessChange(getInputValue() + letter)}
      />
    </form>
  )
}

export default Form
