import getRandomNumber from './getRandomNumber'

export const DIC_FOUR = 'FOUR'
export const DIC_FIVE = 'FIVE'
export const DIC_SIX = 'SIX'

export type TDictionary = typeof DIC_FOUR | typeof DIC_FIVE | typeof DIC_SIX

export function mapIndexToDictionary (index: number): TDictionary {
  if (index < 4 || index > 6) {
    throw new RangeError(`Index ${index} is out of range.`)
  }

  return [DIC_FOUR, DIC_FIVE, DIC_SIX][index - 4] as TDictionary
}

export function getDictionary (dictionary: TDictionary) {
  switch (dictionary) {
    case DIC_FOUR: {
      return require('../config/words-four').default
    }
    case DIC_FIVE: {
      return require('../config/words-five').default
    }
    case DIC_SIX: {
      return require('../config/words-six').default
    }
    default:
      throw new RangeError(
        `Requested words-${dictionary} list, but was not found.`
      )
  }
}

function randomWord (dictionary: TDictionary) {
  const words = getDictionary(dictionary)
  const index = getRandomNumber(0, words.length - 1)
  return words[index]
}

export default randomWord
