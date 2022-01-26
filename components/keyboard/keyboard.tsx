import React from 'react'
import KeyboardKey from './keyboard-key'

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
    CARRIAGE_RETURN_SYMBOL,
  ],
]

const Keyboard = ({
  onDeleteKey,
  onEnterKey,
  onKey,
}: IKeyboardProps): JSX.Element => {
  const getAction = (letter: string) => {
    switch (letter) {
      case DELETE_LEFT_SYMBOL:
        return onDeleteKey
      case CARRIAGE_RETURN_SYMBOL:
        return onEnterKey
      default:
        return onKey
    }
  }

  return (
    <div className='keyboard'>
      {rows.map((row, idx) => (
        <div key={`keyboard__row-${idx}`} className='keyboard__row'>
          {row.map(letter => (
            <KeyboardKey
              key={letter}
              letter={letter}
              action={getAction(letter)}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Keyboard
