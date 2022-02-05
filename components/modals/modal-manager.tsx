import AboutModal from './about'
import CreditModal from './credits'
import { useModalContext } from '../../contexts/modalContext'

const ModalManager: React.FC = () => {
  const { state } = useModalContext()

  return (
    <>
      {state.about === true && <AboutModal />}
      {state.credits === true && <CreditModal />}
    </>
  )
}
export default ModalManager
