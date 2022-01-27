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

function guessReducer (state: State, action: Action) {
  switch (action.type) {
    case 'SET_LETTER':
      return {
        ...state,
        letters: { ...state.letters, ...action.payload }
      }
    case 'RESET_LETTERS':
      return {
        ...state,
        letters: {}
      }
  }
}

export function GuessProvider ({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(guessReducer, defaultState)

  return (
    <GuessContext.Provider value={{ state, dispatch }}>
      {children}
    </GuessContext.Provider>
  )
}

export function useGuessContext () {
  const context = useContext(GuessContext)

  if (context == null) { throw new Error('useGuessContext must be used inside a GuessProvider') }

  return context
}
