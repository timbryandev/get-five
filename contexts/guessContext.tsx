import type { ReactNode } from 'react'
import { createContext, useContext, useReducer } from 'react'

export interface Letter {
  [key: string]: {
    color: string
    status: string
  }
}

interface DefaultState {
  letters: Letter
}

const defaultState = {
  letters: {}
}

export interface Action {
  type: 'SET_LETTER' | 'RESET_LETTERS'
  payload?: any
}
export type Dispatch = (action: Action) => void
export type State = DefaultState

const GuessContext = createContext<
{ state: State, dispatch: Dispatch } | undefined
>(undefined)

function combineLetters (oldLetters: Letter, newLetters: Letter): Letter {
  const combined = Object.entries(newLetters).reduce(
    (acc, [key, val]) => {
      const existingEntry = acc[key]
      if (existingEntry !== undefined) {
        if (existingEntry.status === 'correct' || val.status === 'incorrect') {
          return acc
        }
      }
      return { ...acc, [key]: val }
    },
    { ...oldLetters }
  )

  return combined
}

function guessReducer (state: State, action: Action): DefaultState {
  switch (action.type) {
    case 'SET_LETTER':
      return {
        ...state,
        letters: { ...combineLetters(state.letters, action.payload) }
      }
    case 'RESET_LETTERS':
      return {
        ...defaultState
      }
  }
}

export function GuessProvider ({
  children
}: {
  children: ReactNode
}): JSX.Element {
  const [state, dispatch] = useReducer(guessReducer, { ...defaultState })

  return (
    <GuessContext.Provider value={{ state, dispatch }}>
      {children}
    </GuessContext.Provider>
  )
}

export function useGuessContext (): { state: DefaultState, dispatch: Dispatch } {
  const context = useContext(GuessContext)

  if (context == null) {
    throw new Error('useGuessContext must be used inside a GuessProvider')
  }

  return context
}
