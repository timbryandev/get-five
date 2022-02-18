// @ts-expect-error no type definitions for randomWords library :/
import randomWords from '@genzou/random-words'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'

import Description from '../components/description'
import Form from '../components/form'
import GameOver from '../components/gameOver'
import Guesses from '../components/guesses'
import Header from '../components/header/header'
import ModalManager from '../components/modals/modal-manager'
import Timer from '../components/timer'
import {
  GAME_STATE_INPROGRESS,
  GAME_STATE_LOSE,
  GAME_STATE_WIN,
  GUESS_LIMIT
} from '../config/consts'
import { Letter, useGuessContext } from '../contexts/guessContext'
import getLetterStatus from '../utils/getLetterStatus'

export type GameState =
  | typeof GAME_STATE_INPROGRESS
  | typeof GAME_STATE_LOSE
  | typeof GAME_STATE_WIN

export const getAnswer = (): string => {
  const words = randomWords({ exactly: 1, maxLength: 5, minLength: 5 })
  return words[0]
}

const Home: NextPage = () => {
  const { dispatch } = useGuessContext()
  const [guesses, setGuesses] = useState<string[]>([])
  const [answer, setAnswer] = useState<string>(getAnswer())
  const [gameState, setGameState] = useState<GameState>(GAME_STATE_INPROGRESS)

  const resetGame = (): void => {
    setAnswer(getAnswer())
    setGuesses([])
    dispatch({ type: 'RESET_LETTERS' })
  }

  // add a guess
  useEffect(() => {
    const lastGuess = [...guesses].pop() ?? ''
    const letterStatuses: Letter = {}

    lastGuess.split('').forEach((letter: string, idx: number) => {
      const previousStatus = letterStatuses[letter]
      const currentStatus = getLetterStatus(lastGuess, idx, answer)
      if (
        typeof previousStatus !== 'undefined' &&
        previousStatus.weighting >= currentStatus.weighting
      ) {
        return
      }
      letterStatuses[letter] = currentStatus
    })

    dispatch({ type: 'SET_LETTERS', payload: letterStatuses })
  }, [answer, dispatch, guesses])

  // calculate game state
  useEffect(() => {
    if (guesses[guesses.length - 1] === answer) {
      setGameState(GAME_STATE_WIN)
      return
    }

    if (
      guesses.length >= GUESS_LIMIT &&
      guesses[guesses.length - 1] !== answer
    ) {
      setGameState(GAME_STATE_LOSE)
      return
    }

    setGameState(GAME_STATE_INPROGRESS)
  }, [answer, guesses])

  return (
    <div className='wrapper w-screen h-screen overflow-auto bg-gradient-to-r from-green-500 to-teal-500'>
      <Head>
        <title>Get Five | TimBryan.dev</title>
        <meta
          name='viewport'
          content='initial-scale=1.0, width=device-width, user-scalable=no'
        />
      </Head>
      <Header />
      <div className='max-w-screen-sm m-auto grid place-items-center my-16'>
        <Description />
        {gameState === GAME_STATE_WIN && (
          <GameOver
            guesses={guesses}
            answer={answer}
            gameState={gameState}
            onContinue={resetGame}
          >
            <span>You win!</span>
          </GameOver>
        )}
        {gameState === GAME_STATE_LOSE && (
          <GameOver
            guesses={guesses}
            answer={answer}
            gameState={gameState}
            onContinue={resetGame}
          >
            <span>You lose!</span>
          </GameOver>
        )}
        {gameState === GAME_STATE_INPROGRESS && (
          <>
            <Timer />
            <Guesses guesses={guesses} answer={answer} gameState={gameState} />
            <Form guesses={guesses} setGuesses={setGuesses} />
          </>
        )}
        <ModalManager />
      </div>
    </div>
  )
}

export default Home
