import { useEffect, useRef } from 'react'

import { useModalContext } from '../../contexts/modalContext'
import NavItem from './nav-item'

const Header: React.FC = () => {
  const { dispatch } = useModalContext()
  const btnRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const toggle = (): void => {
    if (menuRef.current === null) return
    menuRef.current.classList.toggle('hidden')
  }

  useEffect(() => {
    const button = btnRef.current
    if (button === null) return
    button.addEventListener('click', toggle, false)
    return () => {
      button.removeEventListener('click', toggle, false)
    }
  }, [])

  return (
    <header className='fixed top-0 left-0 right-0'>
      <nav className='bg-white shadow-lg'>
        <div className='max-w-screen-sm mx-auto px-4 relative'>
          <div>
            <div className='flex justify-between'>
              <div>&nbsp;</div>
              <div className='flex space-x-7'>
                <div>
                  {/* <!-- Website Logo --> */}
                  <a href='#' className='flex items-center py-4 px-2'>
                    <h1 className='text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-green-500 to-teal-500'>
                      Get Five
                    </h1>
                  </a>
                </div>
              </div>
              {/* <!-- Mobile menu button --> */}
              <div className='flex items-center'>
                <button
                  ref={btnRef}
                  className='outline-none mobile-menu-button'
                  aria-label='toggle navigation menu'
                >
                  <svg
                    className=' w-6 h-6 text-gray-500 hover:text-teal-500 '
                    x-show='!showMenu'
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path d='M4 6h16M4 12h16M4 18h16' />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {/* <!-- mobile menu --> */}
          <div ref={menuRef} className='hidden mobile-menu bg-white shadow-lg absolute right-0 p-4 pt-0'>
            <ul className='text-center'>
              <NavItem
                onClick={() => {
                  toggle()
                  dispatch({ type: 'SET_MODALS', payload: { gameplay: true } })
                }}
                type='button'
              >How to play
              </NavItem>
              <NavItem
                onClick={() => {
                  toggle()
                  dispatch({ type: 'SET_MODALS', payload: { about: true } })
                }}
                type='button'
              >About
              </NavItem>
              <NavItem
                onClick={() => {
                  toggle()
                  dispatch({ type: 'SET_MODALS', payload: { credits: true } })
                }}
                type='button'
              >Credits
              </NavItem>
              <NavItem
                href='https://timbryan.dev/#contact'
                type='link'
              >
                Get in touch
              </NavItem>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
