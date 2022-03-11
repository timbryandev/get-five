export interface IAnchorProps {
  additionalClassNames?: string
  children: React.ReactNode
  href: string
  customClasses?: string
  title?: string
}

export const ANCHOR_CLASSES =
  'underline text-blue-600 hover:text-blue-800 visited:text-purple-600 break-all'

const Anchor = ({
  additionalClassNames = '',
  children,
  href,
  customClasses = '',
  title = ''
}: IAnchorProps): JSX.Element => (
  <a
    href={href}
    target='_blank'
    rel='noreferrer'
    title={title}
    className={
      customClasses !== ''
        ? customClasses
        : `${ANCHOR_CLASSES} ${additionalClassNames}`
    }
  >
    {children}
  </a>
)

export default Anchor
