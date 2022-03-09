import { useMemo, useState } from 'react'

import { GAME_STATE_INPROGRESS, MAX_GUESSES } from '../config/consts'
import { useGameContext } from '../contexts/gameContext'
import { GameStatus } from '../pages/index'
import getLetterStatus from '../utils/getLetterStatus'

export interface GuessesProps {
  answer: string
  guesses: string[]
  gameStatus: GameStatus
}

function getGridClass (gridCount: number) {
  switch (gridCount) {
    case 4:
      return 'grid grid-cols-4'
    case 5:
      return 'grid grid-cols-5'
    case 6:
      return 'grid grid-cols-6'
    default:
      throw new RangeError(`Grid count of ${gridCount} is not valid`)
  }
}

const Guesses: React.FC<GuessesProps> = ({
  answer,
  guesses,
  gameStatus
}: GuessesProps) => {
  const [revealFirstLetter, setRevealFirstLetter] = useState(false)
  const { state: gameState } = useGameContext()

  const guessesWithFiller = useMemo(() => {
    // Don't show extra lines if last guess was correct
    if (answer === guesses[guesses.length - 1]) return guesses

    const items = [
      ...guesses,
      ...Array(MAX_GUESSES).fill(`${revealFirstLetter ? answer[0] : ' '}${' '.repeat(gameState.mode - 1)}`)
    ]
    items.length = MAX_GUESSES

    return items
  }, [answer, gameState.mode, guesses, revealFirstLetter])

  const renderHintButton = (): JSX.Element => {
    if (gameStatus !== GAME_STATE_INPROGRESS) {
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
        <li key={guessIndex} className={getGridClass(gameState.mode)}>
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
