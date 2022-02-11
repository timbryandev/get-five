import React, { useEffect } from 'react'
import AboutModal from './about'
import CreditModal from './credits'
import { useModalContext } from '../../contexts/modalContext'

const ModalManager: React.FC = () => {
  const { state, dispatch } = useModalContext()

  useEffect(() => {
    const closeModalsOnBackgroundClick = (evt: Event): void => {
      const element = evt.target as HTMLElement
      // using getAttribute to accommodate SVGs
      const className = element.getAttribute('class') ?? ''

      if (className.includes('modal-background')) {
        dispatch({ type: 'RESET_MODALS' })
      }
    }

    window.addEventListener('click', closeModalsOnBackgroundClick, false)
    return () => {
      window.removeEventListener('click', closeModalsOnBackgroundClick)
    }
  }, [dispatch])

  return (
    <>
      {state.about === true && <AboutModal />}
      {state.credits === true && <CreditModal />}
    </>
  )
}
export default ModalManager
