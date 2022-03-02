import { createContext, useContext, useReducer } from 'react'

export interface State {
  about: boolean
  credits: boolean
  contact: boolean
  gameplay: boolean
}
export interface Payload {
  about?: boolean
  credits?: boolean
  contact?: boolean
  gameplay?: boolean
}

const defaultState = {
  about: false,
  credits: false,
  contact: false,
  gameplay: false
}

export interface Action {
  type: 'RESET_MODALS' | 'SET_MODALS'
  payload?: Payload
}
export type Dispatch = (action: Action) => void

const ModalContext = createContext<
{ state: State, dispatch: Dispatch } | undefined
>(undefined)

function modalReducer (state: State, action: Action): State {
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

export function useModalContext (): { state: State, dispatch: Dispatch } {
  const context = useContext(ModalContext)

  if (context == null) {
    throw new Error('useModalContext must be used inside a ModalProvider')
  }

  return context
}
