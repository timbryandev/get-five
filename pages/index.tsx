import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { Letter, useGuessContext } from '../contexts/guessContext'
import getLetterStatus from '../utils/getLetterStatus'
import Description from '../components/description'
import AboutModal from '../components/about-modal'
import Form from '../components/form'
import GameOver from '../components/gameOver'
import Guesses from '../components/guesses'
// @ts-expect-error no type definitions for third-party library :/
import randomWords from '@genzou/random-words'

export const getAnswer = (): string => {
  const words = randomWords({ exactly: 1, maxLength: 5, minLength: 5 })
  return words[0]
}

const Home: NextPage = () => {
  const { dispatch } = useGuessContext()
  const [showAbout, setShowAbout] = useState<Boolean>(false)
  const [guesses, setGuesses] = useState<string[]>([])
  const [answer, setAnswer] = useState<string>(getAnswer())

  const isWinner = guesses.length > 0 && guesses[guesses.length - 1] === answer
  const isLoser = guesses.length >= 5 && guesses[guesses.length - 1] !== answer

  const resetGame = (): void => {
    setAnswer(getAnswer())
    setGuesses([])
    dispatch({ type: 'RESET_LETTERS' })
  }

  // add a guess
  useEffect(() => {
    const lastGuess = guesses.at(-1) ?? ''
    const letterStatuses: Letter = {}

    lastGuess.split('').forEach((letter: string, idx: number) => {
      letterStatuses[letter] = getLetterStatus(lastGuess, idx, answer)
    })

    dispatch({ type: 'SET_LETTER', payload: letterStatuses })
  }, [answer, dispatch, guesses])

  return (
    <div className="wrapper w-screen h-screen bg-teal-100">
      <div className='max-w-screen-sm m-auto grid place-items-center'>
        <button
          className='absolute top-1 right-1 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded'
          onClick={() => setShowAbout(true)}
        >
          About
        </button>
        <Description />
        {isWinner
          ? (
            <GameOver guesses={guesses} answer={answer} onContinue={resetGame}>
              <span className='text-green-500'>You win!</span>
            </GameOver>
            )
          : isLoser
            ? (
              <GameOver guesses={guesses} answer={answer} onContinue={resetGame}>
                <span className='text-green-500'>You lose!</span>
              </GameOver>
              )
            : (
              <>
                <Guesses guesses={guesses} answer={answer} />
                <Form guesses={guesses} setGuesses={setGuesses} />
              </>
              )}
        {showAbout === true && <AboutModal onClose={() => setShowAbout(false)} />}
      </div>
    </div>
  )
}

export default Home
