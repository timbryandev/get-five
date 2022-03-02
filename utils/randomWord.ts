import getRandomNumber from './getRandomNumber'

export const DIC_FOUR = 'FOUR'
export const DIC_FIVE = 'FIVE'
export const DIC_SIX = 'SIX'

export type TDictionary = typeof DIC_FOUR | typeof DIC_FIVE | typeof DIC_SIX

function randomWord (dictionary: TDictionary) {
  let words

  switch (dictionary) {
    case DIC_FOUR: {
      words = require('../config/words-four').default
      break
    }
    case DIC_FIVE: {
      words = require('../config/words-five').default
      break
    }
    case DIC_SIX: {
      words = require('../config/words-six').default
      break
    }
    default:
      throw new RangeError(
        `Requested words-${dictionary} list, but was not found.`
      )
  }

  const index = getRandomNumber(0, words.length - 1)

  return words[index]
}
export default randomWord
