import { createContext, useContext, useReducer } from 'react'

export interface IModalState {
  about: boolean
  credits: boolean
  contact: boolean
  gameplay: boolean
}
export interface IModalPayload {
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

export interface IModalAction {
  type: 'RESET_MODALS' | 'SET_MODALS'
  payload?: IModalPayload
}
export type TModalDispatch = (action: IModalAction) => void

const ModalContext = createContext<
{ state: IModalState, dispatch: TModalDispatch } | undefined
>(undefined)

function modalReducer (state: IModalState, action: IModalAction): IModalState {
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

export function useModalContext (): { state: IModalState, dispatch: TModalDispatch } {
  const context = useContext(ModalContext)

  if (context == null) {
    throw new Error('useModalContext must be used inside a ModalProvider')
  }

  return context
}
