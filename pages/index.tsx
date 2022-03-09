import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'

import Form from '../components/form'
import GameOver from '../components/gameOver'
import Guesses from '../components/guesses'
import Header from '../components/header/header'
import ModalManager from '../components/modals/modal-manager'
import {
  GAME_STATE_INPROGRESS,
  GAME_STATE_LOSE,
  GAME_STATE_WIN,
  GUESS_LIMIT
} from '../config/consts'
import { Letter, useGameContext } from '../contexts/gameContext'
import getLetterStatus from '../utils/getLetterStatus'
import getRandomWord from '../utils/getRandomWord'

export type GameState =
  | typeof GAME_STATE_INPROGRESS
  | typeof GAME_STATE_LOSE
  | typeof GAME_STATE_WIN

const Home: NextPage = () => {
  const { dispatch } = useGameContext()
  const [guesses, setGuesses] = useState<string[]>([])
  const [answer, setAnswer] = useState<string>(getRandomWord())
  const [gameState, setGameState] = useState<GameState>(GAME_STATE_INPROGRESS)

  const resetGame = (): void => {
    setAnswer(getRandomWord())
    setGuesses([])
    dispatch({ type: 'RESET_LETTERS' })
  }

  // Add a guess
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

  // Calculate game state
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
        <title>Get Five</title>
        <meta
          name='viewport'
          content='initial-scale=1.0, width=device-width, user-scalable=no'
        />
      </Head>
      <Header />
      <div className='max-w-screen-sm m-auto grid place-items-center my-16'>
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
