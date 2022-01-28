const KeyboardKey = ({
  action,
  colour,
  disabled,
  letter
}: {
  action: (letter: string) => void
  colour: string
  disabled: boolean
  letter: string
}): JSX.Element => (
  <button
    key={`keyboard__key--${letter}`}
    className={`keyboard__key flex-1 p-1 m-1 border border-gray-400 rounded ${colour} ${
      disabled ? 'bg-gray-400 opacity-30' : ''
    }`}
    name={letter}
    onClick={evt => {
      if (disabled) return
      evt.preventDefault()
      action(letter)
    }}
  >
    {letter}
  </button>
)

export default KeyboardKey
