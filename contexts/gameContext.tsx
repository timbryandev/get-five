import { createContext, useContext, useReducer } from 'react'

export interface Letter {
  [key: string]: {
    color: string
    status: string
    weighting: number
  }
}

export interface State {
  letters: Letter
  mode: 4 | 5 | 6
}

export interface Action {
  type: 'RESET_LETTERS' | 'SET_LETTERS' | 'SET_MODE'
  payload?: State['letters'] | State['mode']
}

export type Dispatch = (action: Action) => void

const defaultState = {
  letters: {},
  mode: 5
}

const GameContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined)

function gameReducer (state: State, action: Action): State {
  switch (action.type) {
    case 'RESET_LETTERS':
      return {
        ...state,
        letters: { ...defaultState.letters }
      }
    case 'SET_LETTERS':
      if (typeof action.payload !== 'object') return state
      return {
        ...state,
        letters: { ...state.letters, ...action.payload }
      }
    case 'SET_MODE':
      if (typeof action.payload !== 'number') return state
      return {
        ...state,
        mode: action.payload
      }
  }
}

export function GameProvider ({
  children
}: {
  children: React.ReactNode
}): JSX.Element {
  // @ts-ignore
  const [state, dispatch] = useReducer(gameReducer, { ...defaultState })

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGameContext (): { state: State; dispatch: Dispatch } {
  const context = useContext(GameContext)

  if (context == null) {
    throw new Error('useGameContext must be used inside a GameProvider')
  }

  return context
}
