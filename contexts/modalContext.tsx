import { createContext, useContext, useReducer } from 'react'

export interface DefaultState {
  about?: boolean
  credits?: boolean
}

const defaultState = {
  about: false,
  credits: false
}

export interface Action {
  type: 'RESET_MODALS' | 'SET_MODALS'
  payload?: DefaultState
}
export type Dispatch = (action: Action) => void
export type State = DefaultState

const ModalContext = createContext<
{ state: State, dispatch: Dispatch } | undefined
>(undefined)

function modalReducer (state: State, action: Action): DefaultState {
  switch (action.type) {
    case 'SET_MODALS':
      return {
        ...state,
        ...action.payload
      }
    case 'RESET_MODALS':
      return {
        ...defaultState
      }
  }
}

export function ModalProvider ({
  children
}: {
  children: React.ReactNode
}): JSX.Element {
  const [state, dispatch] = useReducer(modalReducer, { ...defaultState })

  return (
    <ModalContext.Provider value={{ state, dispatch }}>
      {children}
    </ModalContext.Provider>
  )
}

export function useModalContext (): { state: DefaultState, dispatch: Dispatch } {
  const context = useContext(ModalContext)

  if (context == null) {
    throw new Error('useModalContext must be used inside a ModalProvider')
  }

  return context
}
