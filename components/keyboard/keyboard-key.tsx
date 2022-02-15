const KeyboardKey = ({
  action,
  letter,
  styles = ''
}: {
  action: (letter: string) => void
  letter: string
  styles: string
}): JSX.Element => (
  <button
    key={`keyboard__key--${letter}`}
    className={`keyboard__key flex-1 p-1 m-1 rounded ${styles} ${
      !styles.includes('bg-') ? 'bg-white' : ''
    }`}
    name={letter}
    onClick={evt => {
      evt.preventDefault()
      action(letter)
    }}
  >
    {letter}
  </button>
)

export default KeyboardKey
