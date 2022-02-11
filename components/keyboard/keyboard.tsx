import KeyboardKey from './keyboard-key'
import { useGuessContext } from '../../contexts/guessContext'

interface IKeyboardProps {
  onDeleteKey: () => void
  onEnterKey: () => void
  onKey: (letter: string) => void
}

const CARRIAGE_RETURN_SYMBOL = '⏎'
const DELETE_LEFT_SYMBOL = '⌫'

const KEY_ROWS = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  [
    CARRIAGE_RETURN_SYMBOL,
    'z',
    'x',
    'c',
    'v',
    'b',
    'n',
    'm',
    DELETE_LEFT_SYMBOL
  ]
]

const Keyboard = ({
  onDeleteKey,
  onEnterKey,
  onKey
}: IKeyboardProps): JSX.Element => {
  const { state } = useGuessContext()

  const getAction = (letter: string): ((letter: string) => void) => {
    switch (letter) {
      case DELETE_LEFT_SYMBOL:
        return onDeleteKey
      case CARRIAGE_RETURN_SYMBOL:
        return onEnterKey
      default:
        return onKey
    }
  }

  const getStyles = (letter: string): string => {
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
      {KEY_ROWS.map((row, idx) => (
        <div key={`keyboard__row-${idx}`} className='keyboard__row flex'>
          {row.map((letter: string) => {
            const styles =
              typeof state.letters[letter]?.color === 'string'
                ? state.letters[letter].color
                : getStyles(letter)

            return (
              <KeyboardKey
                key={letter}
                letter={letter}
                action={getAction(letter)}
                styles={styles}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default Keyboard
