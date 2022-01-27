import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next'
import { useEffect, useState } from 'react'
import { Letter, useGuessContext } from '../contexts/guessContext'
import getLetterStatus from '../utils/getLetterStatus'
import Description from '../components/description'
import Form from '../components/form'
import GameOver from '../components/gameOver'
import Guesses from '../components/guesses'
// @ts-expect-error no type definitions for third-party library :/
import randomWords from '@genzou/random-words'

export const getServerSideProps: GetServerSideProps = async () => {
  const answer = randomWords({ exactly: 1, maxLength: 5, minLength: 5 })[0]

  return { props: { answer } }
}

const Home: NextPage = ({
  answer,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { state, dispatch } = useGuessContext()
  const [guesses, setGuesses] = useState<string[]>([])

  const isWinner = guesses.length > 0 && guesses[guesses.length - 1] === answer
  const isLoser = guesses.length >= 6 && guesses[guesses.length - 1] !== answer

  // reset game
  useEffect(() => {
    setGuesses([])
    dispatch({ type: 'RESET_LETTERS' })
  }, [answer, dispatch])

  // add a guess
  useEffect(() => {
    const lastGuess = guesses.at(-1) || ''
    const letterStatuses: Letter = {}

    lastGuess.split('').forEach((letter: string, idx: number) => {
      letterStatuses[letter] = getLetterStatus(lastGuess, idx, answer)
    })

    dispatch({ type: 'SET_LETTER', payload: letterStatuses })
  }, [answer, dispatch, guesses])

  return (
    <div className='max-w-screen-sm m-auto grid place-items-center'>
      <Description />
      {isWinner ? (
        <GameOver guesses={guesses} answer={answer}>
          <span className='text-green-500'>You win!</span>
        </GameOver>
      ) : isLoser ? (
        <GameOver guesses={guesses} answer={answer}>
          <span className='text-green-500'>You lose!</span>
        </GameOver>
      ) : (
        <>
          <Guesses guesses={guesses} answer={answer} />
          <Form guesses={guesses} setGuesses={setGuesses} />
        </>
      )}
    </div>
  )
}

export default Home
