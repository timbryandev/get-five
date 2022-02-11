import {
  LETTER_STATUSES,
  STATUS_CORRECT,
  STATUS_INCORRECT,
  STATUS_MATCHED
} from '../config/consts'

const getLetterStatus = (
  guess: string,
  index: number,
  answer: string
): { color: string, status: string, weighting: number } => {
  if (answer[index] === guess[index]) {
    return {
      status: 'correct',
      color: 'bg-green-300',
      weighting: LETTER_STATUSES.indexOf(STATUS_CORRECT)
    }
  }

  const countOfLetterOccurringInAnswer = answer
    .split('')
    .filter((letter: string) => letter === guess[index]).length

  const countOfLetterOccurringInGuessBeforeCurrentIndex = guess
    .slice(0, index)
    .split('')
    .filter((letter: string) => letter === guess[index]).length

  if (
    answer.includes(guess[index]) &&
    countOfLetterOccurringInAnswer >
      countOfLetterOccurringInGuessBeforeCurrentIndex
  ) {
    return {
      status: 'matched',
      color: 'bg-yellow-300',
      weighting: LETTER_STATUSES.indexOf(STATUS_MATCHED)
    }
  }

  return {
    status: 'incorrect',
    color: 'bg-gray-300',
    weighting: LETTER_STATUSES.indexOf(STATUS_INCORRECT)
  }
}

export default getLetterStatus
