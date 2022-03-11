import randomWord, { DIC_FIVE, TDictionary } from '../utils/randomWord'

const getRandomWord = (dictionary: TDictionary = DIC_FIVE): string =>
  randomWord(dictionary)

export default getRandomWord
