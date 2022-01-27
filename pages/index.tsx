import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType
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
  answer
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { state, dispatch } = useGuessContext()
  const [guesses, setGuesses] = useState<string[]>([])

  useEffect(() => {
    setGuesses([])
    dispatch({ type: 'RESET_LETTERS' })
  }, [answer, dispatch])

  useEffect(() => {
    const lastGuess = guesses.at(-1) || ''
    const letterStatuses: Letter = {}

    lastGuess.split('').forEach((letter: string, idx: number) => {
      letterStatuses[letter] = getLetterStatus(lastGuess, idx, answer)
    })

    dispatch({ type: 'SET_LETTER', payload: letterStatuses })
  }, [answer, dispatch, guesses])

  const isWinner = guesses.length > 0 && guesses[guesses.length - 1] === answer
  if (isWinner) {
    return (
      <GameOver guesses={guesses} answer={answer}>
        You win!
      </GameOver>
    )
  }

  const isLoser = guesses.length >= 6 && guesses[guesses.length - 1] !== answer
  if (isLoser) {
    return (
      <GameOver guesses={guesses} answer={answer}>
        You Lose!
      </GameOver>
    )
  }

  return (
    <div className='max-w-screen-sm m-auto grid place-items-center'>
      <Description />
      <Guesses guesses={guesses} answer={answer} />
      <Form guesses={guesses} setGuesses={setGuesses} />
    </div>
  )
}

export default Home
