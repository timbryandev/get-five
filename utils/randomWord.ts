import MersenneTwister from './MersenneTwister.js'

export type TDictionaries = 'four' | 'five' | 'six'

const mt = new MersenneTwister()

const generateRandomIntegerInRange = (min: number, max: number) =>
  Math.floor(mt.random() * (max - min + 1)) + min

function randomWord (dictionary: TDictionaries) {
  let words
  switch (dictionary) {
    case 'four': {
      words = require('../config/words-four').default
      break
    }
    case 'five': {
      words = require('../config/words-five').default
      break
    }
    case 'six': {
      words = require('../config/words-six').default
      break
    }
    default:
      throw new RangeError(
        `Requested words-${dictionary} list, but was not found.`
      )
  }

  const randomInt = generateRandomIntegerInRange(0, words.length - 1)

  return words[randomInt]
}
export default randomWord
