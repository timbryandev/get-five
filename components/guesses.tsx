import { useMemo, useState } from 'react'
import getLetterStatus from '../utils/getLetterStatus'
import { GameState } from '../pages/index'
import { GUESS_LIMIT, GAME_STATE_INPROGRESS } from '../config/consts'

export interface GuessesProps {
  answer: string
  guesses: string[]
  gameState: GameState
}

const Guesses: React.FC<GuessesProps> = ({ answer, guesses, gameState }) => {
  const [revealFirstLetter, setRevealFirstLetter] = useState(false)

  const guessesWithFiller = useMemo(() => {
    // don't show extra lines if last guess was correct
    if (answer === guesses[guesses.length - 1]) return guesses

    const items = [
      ...guesses,
      ...Array(GUESS_LIMIT).fill(`${revealFirstLetter ? answer[0] : ' '}    `)
    ]
    items.length = GUESS_LIMIT

    return items
  }, [answer, guesses, revealFirstLetter])

  const renderHintButton = (): JSX.Element => {
    if (gameState !== GAME_STATE_INPROGRESS) {
      return <span className='block h-12'>&nbsp;</span>
    }

    return (
      <button
        className='bg-yellow-300 h-12 w-12 m-1 rounded-md text-md font-semibold disabled:opacity-50'
        disabled={revealFirstLetter}
        onClick={() => setRevealFirstLetter(true)}
      >
        Hint
      </button>
    )
  }

  return (
    <ol className='m-4'>
      <li>{renderHintButton()}</li>
      {guessesWithFiller.map((guess, guessIndex) => (
        <li key={guessIndex} className='grid grid-cols-5'>
          {guess.split('').map((letter: string, idx: number) => (
            <span
              key={idx}
              className={`${
                getLetterStatus(guess, idx, answer).color
              } h-12 w-12 text-2xl flex p-1 m-1 box-border justify-center items-center rounded`}
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
