export const STATUS_CORRECT = 'correct'
export const STATUS_HINT = 'hint'
export const STATUS_INCORRECT = 'incorrect'
export const STATUS_MATCHED = 'matched'

export const GAME_MODES: Array<[label: string, value: number]> = [
  ['Four letter mode', 4],
  ['Standard', 5],
  ['Six letter mode', 6]
]

export const GUESS_LIMIT = 6

export const LETTER_STATUSES = [
  STATUS_INCORRECT,
  STATUS_MATCHED,
  STATUS_CORRECT,
  STATUS_HINT
]
