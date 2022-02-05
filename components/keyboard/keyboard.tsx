import KeyboardKey from './keyboard-key'
import { useGuessContext } from '../../contexts/guessContext'

interface IKeyboardProps {
  onDeleteKey: () => void
  onEnterKey: () => void
  onKey: (letter: string) => void
}

const DELETE_LEFT_SYMBOL = '⌫'
const CARRIAGE_RETURN_SYMBOL = '⏎'

const rows = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  [
    DELETE_LEFT_SYMBOL,
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    CARRIAGE_RETURN_SYMBOL
  ]
]

const Keyboard = ({
  onDeleteKey,
  onEnterKey,
  onKey
}: IKeyboardProps): JSX.Element => {
  const { state } = useGuessContext()

  const getAction = (letter: string): (letter: string) => void => {
    switch (letter) {
      case DELETE_LEFT_SYMBOL:
        return onDeleteKey
      case CARRIAGE_RETURN_SYMBOL:
        return onEnterKey
      default:
        return onKey
    }
  }

  const getColour = (letter: string): string => {
    switch (letter) {
      case DELETE_LEFT_SYMBOL:
        return 'text-yellow-500'
      case CARRIAGE_RETURN_SYMBOL:
        return 'text-green-500 font-bold'
      default:
        return ''
    }
  }

  return (
    <div className='keyboard text-center mt-2 text-2xl'>
      {rows.map((row, idx) => (
        <div key={`keyboard__row-${idx}`} className='keyboard__row flex'>
          {row.map((letter: string) => {
            const isDisabled =
              state.letters[letter.toLowerCase()]?.status === 'incorrect'
            return (
              <KeyboardKey
                key={letter}
                letter={letter}
                action={getAction(letter)}
                colour={getColour(letter)}
                disabled={isDisabled}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default Keyboard
