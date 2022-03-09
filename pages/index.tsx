import type { NextPage } from 'next'
import Head from 'next/head'
import { useCallback, useEffect, useState } from 'react'

import Form from '../components/form'
import GameOver from '../components/gameOver'
import Guesses from '../components/guesses'
import Header from '../components/header/header'
import ModalManager from '../components/modals/modal-manager'
import {
  GAME_STATE_INPROGRESS,
  GAME_STATE_LOSE,
  GAME_STATE_WIN,
  MAX_GUESSES
} from '../config/consts'
import { Letters, useGameContext } from '../contexts/gameContext'
import getLetterStatus from '../utils/getLetterStatus'
import getRandomWord from '../utils/getRandomWord'
import { mapIndexToDictionary } from '../utils/randomWord'

export type GameStatus =
  | typeof GAME_STATE_INPROGRESS
  | typeof GAME_STATE_LOSE
  | typeof GAME_STATE_WIN

const Home: NextPage = () => {
  const { state: gameState, dispatch: gameDispatch } = useGameContext()
  const [guesses, setGuesses] = useState<string[]>([])
  const [answer, setAnswer] = useState<string>(getRandomWord())
  const [gameStatus, setGameStatus] = useState<GameStatus>(GAME_STATE_INPROGRESS)

  const resetGame = useCallback((): void => {
    setAnswer(getRandomWord(mapIndexToDictionary(gameState.mode)))
    setGuesses([])
    gameDispatch({ type: 'RESET_LETTERS' })
  }, [gameDispatch, gameState.mode])

  // Add a guess
  useEffect(() => {
    const lastGuess = [...guesses].pop() ?? ''
    const letterStatuses: Letters = {}

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

    gameDispatch({ type: 'SET_LETTERS', payload: letterStatuses })
  }, [answer, gameDispatch, guesses])

  // Calculate game state
  useEffect(() => {
    if (guesses[guesses.length - 1] === answer) {
      setGameStatus(GAME_STATE_WIN)
      return
    }

    if (
      guesses.length >= MAX_GUESSES &&
      guesses[guesses.length - 1] !== answer
    ) {
      setGameStatus(GAME_STATE_LOSE)
      return
    }

    setGameStatus(GAME_STATE_INPROGRESS)
  }, [answer, guesses])

  useEffect(() => {
    resetGame()
  }, [resetGame, gameState.mode])

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
        {gameStatus === GAME_STATE_WIN && (
          <GameOver
            guesses={guesses}
            answer={answer}
            gameStatus={gameStatus}
            onContinue={resetGame}
          >
            <span>You win!</span>
          </GameOver>
        )}
        {gameStatus === GAME_STATE_LOSE && (
          <GameOver
            guesses={guesses}
            answer={answer}
            gameStatus={gameStatus}
            onContinue={resetGame}
          >
            <span>You lose!</span>
          </GameOver>
        )}
        {gameStatus === GAME_STATE_INPROGRESS && (
          <>
            <Guesses guesses={guesses} answer={answer} gameStatus={gameStatus} />
            <Form guesses={guesses} setGuesses={setGuesses} />
          </>
        )}
        <ModalManager />
      </div>
    </div>
  )
}

export default Home
