import { createContext, useContext, useEffect, useReducer } from 'react'

const KEY_STATE_STORAGE = 'game-context'

export interface ILetters {
  [key: string]: {
    color: string
    status: string
    weighting: number
  }
}

export type TGameMode = 4 | 5 | 6

export interface ITimer {
  active: boolean
  show: boolean
  time: number
}

export interface IGameState {
  letters: ILetters
  mode: TGameMode
  timer: ITimer
}

export interface IGameAction {
  type:
    | 'INIT_STORED'
    | 'RESET_LETTERS'
    | 'ADD_LETTERS'
    | 'SET_MODE'
    | 'SET_TIMER'
  payload?: any
}

export type TGameDispatch = (action: IGameAction) => void

const defaultState = {
  letters: {} as ILetters,
  mode: 5 as TGameMode,
  timer: {
    active: false,
    show: true,
    time: 0
  } as ITimer
}

export type TGameModeOption = [label: string, value: TGameMode]

export const GAME_MODE_OPTIONS: TGameModeOption[] = [
  ['Four letter mode', 4],
  ['Standard', 5],
  ['Six letter mode', 6]
]

const GameContext = createContext<{
  state: IGameState
  dispatch: React.Dispatch<IGameAction>
}>({ state: defaultState, dispatch: () => {} })

function gameReducer (state: IGameState, action: IGameAction): IGameState {
  switch (action.type) {
    case 'INIT_STORED':
      return {
        ...state,
        ...action.payload as IGameState
      }
    case 'ADD_LETTERS':
      return {
        ...state,
        letters: { ...state.letters, ...(action.payload as ILetters) }
      }
    case 'RESET_LETTERS':
      return {
        ...state,
        letters: { ...defaultState.letters as ILetters }
      }
    case 'SET_MODE':
      return {
        ...state,
        mode: action.payload as TGameMode
      }
    case 'SET_TIMER':
      return {
        ...state,
        timer: { ...state.timer, ...action.payload as ITimer }
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

export function useGameContext (): {
  state: IGameState
  dispatch: TGameDispatch
  } {
  const context = useContext(GameContext)

  if (context == null) {
    throw new Error('useGameContext must be used inside a GameProvider')
  }

  return context
}
