import { useRef, useState } from 'react'
import Keyboard from './keyboard/keyboard'
import cleanse from '../utils/cleansGuessString'

export interface FormProps {
  guesses: string[]
  setGuesses: (guesses: string[]) => void
}

const Form: React.FC<FormProps> = ({ guesses, setGuesses }: FormProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [guess, setGuess] = useState<string>('')

  const getInputValue = () => inputRef.current?.value ?? ''

  const handleSubmit = (event: React.FormEvent<HTMLFormElement> | null) => {
    console.log('submit')
    event?.preventDefault()

    if (guess.length !== 5) {
      return
    }

    setGuesses([...guesses, guess])
    setGuess('')
  }

  const onGuessChange = (letter: string) => {
    setGuess(cleanse(letter))
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        className='text-center border-2 border-gray-400 p-2 m-2 text-3xl'
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
