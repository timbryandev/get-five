import Link from 'next/link'

import Anchor from '../anchor'

export interface NavItemProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  type: 'button' | 'link' | undefined
}

function NavItem ({
  children,
  href = '/',
  onClick,
  type
}: NavItemProps): JSX.Element {
  const baseClass =
    'inline-block w-full px-1 py-2 hover:bg-teal-300 transition duration-300 rounded-md'

  function renderCTA (): JSX.Element {
    if (type === 'button') {
      return (
        <button className={baseClass} onClick={onClick}>
          {children}
        </button>
      )
    }

    // If internal link, use Link
    if (href.startsWith('/')) {
      return <span className={baseClass}><Link href={href}>{children}</Link></span>
    }

    // Default to anchor
    return <Anchor href={href}>{children}</Anchor>
  }

  return <li className='text-center'>{renderCTA()}</li>
}

export default NavItem
