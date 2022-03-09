import { useEffect } from 'react'

import { useModalContext } from '../../contexts/modalContext'
import AboutModal from './about'
import Contact from './contact'
import CreditModal from './credits'
import GameplayModal from './gameplay'

const ModalManager: React.FC = () => {
  const { state, dispatch } = useModalContext()

  useEffect(() => {
    const closeModalsOnBackgroundClick = (evt: Event): void => {
      const element = evt.target as HTMLElement
      // Using getAttribute to accommodate SVGs
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
      {state.contact === true && <Contact />}
      {state.gameplay === true && <GameplayModal />}
    </>
  )
}
export default ModalManager
