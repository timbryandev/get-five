import { useMemo } from 'react'
import getLetterStatus from '../utils/getLetterStatus'
import { GUESS_LIMIT } from '../config/consts'

export interface GuessesProps {
  guesses: string[]
  answer: string
}
const Guesses: React.FC<GuessesProps> = ({ guesses, answer }) => {
  const guessesWithFiller = useMemo(() => {
    const items = [...guesses, ...Array(GUESS_LIMIT).fill('     ')]
    items.length = GUESS_LIMIT
    return items
  }, [guesses])

  return (
    <ol className='m-4'>
      {guessesWithFiller.map((guess, guessIndex) => (
        <li key={guessIndex} className='grid grid-cols-5'>
          {guess.split('').map((letter: string, idx: number) => (
            <span
              key={idx}
              className={`${
                getLetterStatus(guess, idx, answer).color
              } h-12 w-12 text-2xl flex border-2 border-gray-300 p-1 m-1 box-border justify-center items-center`}
            >
              {letter}
            </span>
          ))}
        </li>
      ))}
    </ol>
  )
}

export default Guesses
