import { useModalContext } from '../../contexts/modalContext'

export interface AboutProps {
  children: React.ReactNode
  label: string
  onClose?: () => void
  title: string
}

const Modal: React.FC<AboutProps> = ({ children, label, onClose = () => {}, title }) => {
  const { dispatch } = useModalContext()

  const handleOnClose = (): void => {
    dispatch({ type: 'SET_MODALS', payload: { [label]: false } })
    onClose()
  }

  return (
    <div className='bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0'>
      <div className='bg-white max-w-screen-sm m-auto m-3 p-5 rounded-md text-center '>
        <h2 className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-green-500 to-yellow-500'>
          {title}
        </h2>
        <div className='my-7'>
          {children}
        </div>
        <button
          className='bg-green-500 px-7 py-2 rounded-md text-md text-white font-semibold'
          onClick={handleOnClose}
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default Modal
