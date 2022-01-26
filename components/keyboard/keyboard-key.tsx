const KeyboardKey = ({
  letter,
  action,
}: {
  letter: string
  action: (letter: string) => void
}) => (
  <button
    key={`keyboard__key--${letter}`}
    className={'keyboard__key'}
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
