const getLetterStatus = (
  guess: string,
  index: number,
  answer: string
): { color: string, status: string } => {
  if (answer[index] === guess[index]) {
    return { status: 'correct', color: 'bg-green-300' }
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
    return { status: 'matched', color: 'bg-yellow-300' }
  }

  return { status: 'incorrect', color: 'bg-gray-300' }
}

export default getLetterStatus
