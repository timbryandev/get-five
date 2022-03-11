import { getDictionary, mapIndexToDictionary } from './randomWord'

function isValidGuess (guess: string, mode: number) {
  const words = getDictionary(mapIndexToDictionary(mode))

  if (guess.length !== mode) {
    return { error: true, message: 'Your guess is too short' }
  }
  if (!words.includes(guess)) {
    return { error: true, message: 'Your word is not in our dictionary' }
  }

  return { error: false, message: '' }
}

export default isValidGuess
