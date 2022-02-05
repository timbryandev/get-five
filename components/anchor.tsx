export interface AnchorProps {
  additionalClassNames?: string
  children: React.ReactNode
  href: string
  customClasses?: string
  title?: string
}

const Anchor = ({
  additionalClassNames = '',
  children,
  href,
  customClasses = '',
  title = ''
}: AnchorProps): JSX.Element => (
  <a
    href={href}
    target='_blank'
    rel='noreferrer'
    title={title}
    className={
      customClasses !== ''
        ? customClasses
        : `underline text-blue-600 hover:text-blue-800 visited:text-purple-600 break-all ${additionalClassNames}`
    }
  >
    {children}
  </a>
)

export default Anchor
