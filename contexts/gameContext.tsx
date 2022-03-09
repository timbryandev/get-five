import { createContext, useContext, useEffect, useReducer } from 'react'

const KEY_STATE_STORAGE = 'game-context'

export interface Letters {
  [key: string]: {
    color: string
    status: string
    weighting: number
  }
}

export type Mode = 4 | 5 | 6

export interface State {
  letters: Letters
  mode: Mode
}

export interface Action {
  type: 'INIT_STORED' | 'RESET_LETTERS' | 'SET_LETTERS' | 'SET_MODE'
  payload?: State['letters'] | State['mode'] | any
}

export type Dispatch = (action: Action) => void

const defaultState = {
  letters: {},
  mode: 5 as Mode
}

export type GameModeOption = [label: string, value: Mode]

export const GAME_MODE_OPTIONS: GameModeOption[] = [
  ['Four letter mode', 4],
  ['Standard', 5],
  ['Six letter mode', 6]
]

const GameContext = createContext<
  {state: State, dispatch: React.Dispatch<Action>}
>({ state: defaultState, dispatch: () => {} })

function gameReducer (state: State, action: Action): State {
  switch (action.type) {
    case 'INIT_STORED':
      return {
        ...state,
        ...action.payload
      }
    case 'RESET_LETTERS':
      return {
        ...state,
        letters: { ...defaultState.letters }
      }
    case 'SET_LETTERS':
      return {
        ...state,
        letters: { ...state.letters, ...action.payload as Letters }
      }
    case 'SET_MODE':
      return {
        ...state,
        mode: action.payload as Mode
      }
  }
}

export function GameProvider ({
  children
}: {
  children: React.ReactNode
}): JSX.Element {
  const [state, dispatch] = useReducer(gameReducer, { ...defaultState })

  useEffect(() => {
    const existingState = localStorage.getItem(KEY_STATE_STORAGE)
    if (typeof existingState === 'string') {
      dispatch({
        type: 'INIT_STORED',
        payload: JSON.parse(existingState)
      })
    }
  }, [])

  useEffect(() => {
    if (state !== defaultState) {
      localStorage.setItem(KEY_STATE_STORAGE, JSON.stringify(state))
    }
  }, [state])

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
