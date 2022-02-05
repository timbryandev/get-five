import Anchor from '../anchor'

export interface NavItemProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  type: 'button' | 'link' | undefined
}

function NavItem ({ children, href = '/', onClick, type }: NavItemProps): JSX.Element {
  const baseClass = 'inline-block w-full text-sm px-2 py-4 hover:bg-green-500 transition duration-300'

  function renderCTA (): JSX.Element {
    if (type === 'button') {
      return (
        <button
          className={baseClass}
          onClick={onClick}
        >
          {children}
        </button>
      )
    }

    // Default to link
    return (
      <Anchor
        href={href}
        className={baseClass}
      >
        {children}
      </Anchor>
    )
  }

  return (
    <li className='text-center'>
      {renderCTA()}
    </li>
  )
}

export default NavItem
